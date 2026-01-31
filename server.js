process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  }); 
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
   
const express = require('express');
const path = require('path');
const { calculateLSIAndAdvice } = require('./calculator');
const app = express();
const PORT = 3000; // or whatever port you use

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets'), { fallthrough: false }));

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
    );
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; " +
        "script-src 'self' https://cdn.tailwindcss.com https://cloud.google.com; " +
        "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "img-src 'self' data:; " +
        "connect-src 'self' https://cloud.google.com"
    );
    next();
});

const PUBLIC_FILES = {
    '/': 'index.html',
    '/index.html': 'index.html',
    '/ai_search.html': 'ai_search.html',
    '/volume_calculator.html': 'volume_calculator.html',
    '/styles.css': 'styles.css',
    '/script.js': 'script.js',
    '/volume_script.js': 'volume_script.js'
};

app.get(Object.keys(PUBLIC_FILES), (req, res) => {
    const file = PUBLIC_FILES[req.path] || 'index.html';
    res.sendFile(path.join(__dirname, file));
});

app.post('/api/calculate', (req, res) => {
    try {
        const result = calculateLSIAndAdvice(req.body);
        res.json(result);
    } catch (err) {
        console.error("Calculation error:", err);
        const lang = req.body.lang || 'en';
        res.status(500).json({
            error: 'Calculation error.',
            lang: lang

         });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
