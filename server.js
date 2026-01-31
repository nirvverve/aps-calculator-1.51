process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  }); 
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
   
const express = require('express');
const path = require('path');
const { calculateLSIAndAdvice, translations } = require('./calculator');
const app = express();
const PORT = 3000; // or whatever port you use

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets'), { fallthrough: false }));

const VALID_STATES = new Set(['arizona', 'texas', 'florida', 'jacksonville']);
const VALID_LANGS = new Set(['en', 'es', 'it']);

const hasValue = (value) => value !== undefined && value !== null && String(value).trim() !== '';
const isNumberish = (value) => {
    if (!hasValue(value)) return false;
    const numberValue = Number(value);
    return Number.isFinite(numberValue);
};

const normalizeLang = (value) => {
    const lower = typeof value === 'string' ? value.toLowerCase() : '';
    return VALID_LANGS.has(lower) ? lower : 'en';
};

const getErrorRequired = (lang) => {
    const dictionary = translations[lang] || translations.en;
    return dictionary.errorRequired || translations.en.errorRequired;
};

const buildErrorHtml = (message) => `<p class="error">${message}</p>`;

const validateCalculateRequest = (req, res, next) => {
    const payload = req.body;
    const lang = normalizeLang(payload?.lang);
    const state = typeof payload?.state === 'string' ? payload.state.toLowerCase() : '';
    const requiredFields = ['capacity', 'ph', 'alkalinity', 'calcium', 'cyanuric', 'freechlorine'];
    const optionalFields = ['temperature', 'tds', 'salt-current', 'salt-desired'];

    if (!payload || typeof payload !== 'object' || !VALID_STATES.has(state)) {
        return res.status(400).json({ html: buildErrorHtml(getErrorRequired(lang)) });
    }

    if (requiredFields.some((field) => !isNumberish(payload[field]))) {
        return res.status(400).json({ html: buildErrorHtml(getErrorRequired(lang)) });
    }

    for (const field of optionalFields) {
        if (hasValue(payload[field]) && !isNumberish(payload[field])) {
            return res.status(400).json({ html: buildErrorHtml(getErrorRequired(lang)) });
        }
    }

    payload.lang = lang;
    payload.state = state;
    return next();
};

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

app.post('/api/calculate', validateCalculateRequest, (req, res) => {
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
