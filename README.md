# Casa Criativa 🏠✨

A modern web application for sharing creative ideas during quarantine periods. Built with Node.js, Express, and modern web technologies.

## 🚀 Features

- **Idea Sharing**: Share and discover creative ideas for activities during quarantine
- **Modern Architecture**: Built with ES modules and modern JavaScript
- **Security First**: Helmet security headers, rate limiting, input validation
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Validation**: Client-side form validation with instant feedback
- **Error Handling**: Comprehensive error handling and logging
- **Database Integration**: SQLite database with proper schema management

## 🛠️ Technology Stack

### Backend
- **Node.js** - Modern JavaScript runtime
- **Express.js** - Web application framework
- **SQLite3** - Lightweight database
- **Nunjucks** - Template engine
- **ES Modules** - Modern JavaScript modules

### Security & Performance
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting
- **Express Validator** - Input validation and sanitization
- **Compression** - Response compression
- **Winston** - Logging framework

### Frontend
- **Modern JavaScript** - ES6+ features
- **Responsive CSS** - Mobile-first design
- **Progressive Enhancement** - Works without JavaScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/regesguitar/CasaCriativa.git
   cd CasaCriativa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload
- `npm run setup` - Initialize the database and setup

## 📁 Project Structure

```
CasaCriativa/
├── config/                 # Configuration files
│   ├── database.js        # Database configuration
│   └── logger.js          # Logging configuration
├── public/                # Static assets
│   ├── scripts.js         # Frontend JavaScript
│   ├── style.css          # Stylesheets
│   └── logo.png           # Logo image
├── views/                 # Template files
│   ├── layout.html        # Main layout template
│   ├── index.html         # Home page
│   ├── ideias.html        # Ideas listing page
│   ├── modal.html         # Modal form template
│   ├── error.html         # Error page template
│   └── head.html          # HTML head template
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── server.js             # Main application file
└── README.md             # This file
```

## 🔒 Security Features

- **Helmet Security Headers** - Protects against common vulnerabilities
- **Rate Limiting** - Prevents abuse and spam
- **Input Validation** - Server-side validation with express-validator
- **Input Sanitization** - Prevents XSS attacks
- **Error Handling** - Proper error handling without information leakage

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `DATABASE_PATH` | Database file path | `./WORKSHOPDEV.db` |
| `SESSION_SECRET` | Session encryption secret | Random string |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 minutes) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `LOG_LEVEL` | Logging level | `info` |

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Home page with latest ideas |
| `GET` | `/ideias` | All ideas listing |
| `POST` | `/` | Create new idea |
| `GET` | `/api/ideas` | JSON API for ideas |

## 🗄️ Database Schema

### Ideas Table
```sql
CREATE TABLE ideas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    link TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🚨 Error Handling

The application includes comprehensive error handling:
- **404 Not Found** - Custom 404 error page
- **500 Internal Server Error** - Error page with proper logging
- **Validation Errors** - User-friendly form validation messages
- **Database Errors** - Proper database error handling

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Rocketseat** - Original workshop and inspiration
- **Express.js Team** - Web framework
- **Nunjucks Team** - Template engine
- **Open Source Community** - All the amazing packages used

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ for the Casa Criativa community**
