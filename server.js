/**
 * Casa Criativa - Modern Web Application
 * Updated for security and maintainability with ES Modules
 */

// Load environment variables
import 'dotenv/config';

// Import required modules
import express from 'express';
import nunjucks from 'nunjucks';
import sqlite3 from 'sqlite3';
// import session from 'express-session';
// import SQLiteStore from 'connect-sqlite3';
import { initializeTables } from './config/database.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import winston from 'winston';
import { body, validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import path from 'path';

// Import custom modules
import logger from './config/logger.js';
import { setupDatabase } from './config/database.js';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration - Temporarily disabled for ES modules compatibility
// TODO: Implement a modern session management solution
// app.use(session({
//     store: new SQLiteStore({ db: 'sessions.db', dir: __dirname }),
//     secret: process.env.SESSION_SECRET || 'fallback-secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: process.env.NODE_ENV === 'production',
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     }
// }));

// Configure Nunjucks
nunjucks.configure('views', {
    express: app,
    noCache: process.env.NODE_ENV !== 'production',
    watch: process.env.NODE_ENV === 'development',
});

// Serve static files
app.use(express.static('public'));

// Database setup
const db = setupDatabase();

// Routes

// Home route
app.get('/', async (req, res) => {
    try {
        const ideas = await getLastIdeas(2);
        res.render('index.html', { ideas });
    } catch (error) {
        logger.error('Error loading home page:', error);
        res.status(500).render('error.html', {
            error: 'Unable to load ideas at this time.',
            statusCode: 500
        });
    }
});

// Ideas listing route
app.get('/ideias', async (req, res) => {
    try {
        const ideas = await getAllIdeas();
        res.render('ideias.html', { ideas });
    } catch (error) {
        logger.error('Error loading ideas page:', error);
        res.status(500).render('error.html', {
            error: 'Unable to load ideas at this time.',
            statusCode: 500
        });
    }
});

// Create idea route with validation
app.post('/', [
    body('title')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Title is required and must be less than 100 characters')
        .escape(),
    body('category')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Category is required and must be less than 50 characters')
        .escape(),
    body('description')
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('Description is required and must be less than 500 characters')
        .escape(),
    body('image')
        .optional()
        .isURL()
        .withMessage('Image must be a valid URL'),
    body('link')
        .optional()
        .isURL()
        .withMessage('Link must be a valid URL')
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Ensure database table exists
        await createIdeasTable();

        // Insert new idea
        const { title, category, description, image, link } = req.body;
        await insertIdea({ title, category, description, image, link });

        logger.info('New idea created successfully');
        res.redirect('/ideias');
    } catch (error) {
        logger.error('Error creating idea:', error);
        res.status(500).render('error.html', {
            error: 'Unable to save your idea. Please try again.',
            statusCode: 500
        });
    }
});

// API endpoint for ideas (optional)
app.get('/api/ideas', async (req, res) => {
    try {
        const ideas = await getAllIdeas();
        res.json({ success: true, ideas });
    } catch (error) {
        logger.error('Error fetching ideas via API:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to fetch ideas'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).render('error.html', {
        error: 'Something went wrong!',
        statusCode: 500
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error.html', {
        error: 'Page not found',
        statusCode: 404
    });
});

// Database helper functions
function getLastIdeas(limit = 2) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ideas ORDER BY id DESC LIMIT ?`;
        db.all(query, [limit], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.reverse());
            }
        });
    });
}

function getAllIdeas() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ideas ORDER BY id DESC`;
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function createIdeasTable() {
    return new Promise((resolve, reject) => {
        const query = `
            CREATE TABLE IF NOT EXISTS ideas(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT NOT NULL,
                link TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `;
        db.run(query, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function insertIdea(idea) {
    return new Promise((resolve, reject) => {
        const { title, category, description, image, link } = idea;
        const query = `
            INSERT INTO ideas(image, title, category, description, link)
            VALUES (?, ?, ?, ?, ?);
        `;
        const values = [image, title, category, description, link];

        db.run(query, values, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, ...idea });
            }
        });
    });
}

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    db.close((err) => {
        if (err) {
            logger.error('Error closing database:', err);
        } else {
            logger.info('Database connection closed');
        }
        process.exit(0);
    });
});

// Start server
app.listen(PORT, () => {
    logger.info(`Casa Criativa server running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
