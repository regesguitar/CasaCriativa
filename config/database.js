/**
 * Database configuration with ES Modules
 */

import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database configuration
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '..', 'WORKSHOPDEV.db');

/**
 * Setup database connection and initialize tables
 */
export function setupDatabase() {
    // Ensure database directory exists
    const dbDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }

    // Create database connection
    const db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            process.exit(1);
        }
    });

    // Enable foreign keys and WAL mode for better performance
    db.run('PRAGMA foreign_keys = ON');
    db.run('PRAGMA journal_mode = WAL');

    return db;
}

/**
 * Initialize database tables
 */
export async function initializeTables(db) {
    return new Promise((resolve, reject) => {
        const query = `
            CREATE TABLE IF NOT EXISTS ideas(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT NOT NULL,
                link TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

/**
 * Database health check
 */
export async function healthCheck(db) {
    return new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) as count FROM ideas', (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    status: 'healthy',
                    ideas_count: row.count,
                    timestamp: new Date().toISOString()
                });
            }
        });
    });
}

export default { setupDatabase, initializeTables, healthCheck };
