process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  }); 
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
   
const express = require('express');
const path = require('path');
const { z } = require('zod');
const { calculateLSIAndAdvice, translations } = require('./calculator');
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets'), { fallthrough: false }));

const VALID_STATES = new Set(['arizona', 'texas', 'florida', 'jacksonville']);
const VALID_LANGS = new Set(['en', 'es', 'it']);
const calculateSchema = z
    .object({
        capacity: z.coerce.number().finite(),
        ph: z.coerce.number().finite(),
        alkalinity: z.coerce.number().finite(),
        calcium: z.coerce.number().finite(),
        cyanuric: z.coerce.number().finite(),
        freechlorine: z.coerce.number().finite(),
        temperature: z.coerce.number().finite().optional(),
        tds: z.coerce.number().finite().optional(),
        'salt-current': z.coerce.number().finite().optional(),
        'salt-desired': z.coerce.number().finite().optional(),
        state: z.string(),
        lang: z.string().optional()
    })
    .passthrough();

const normalizeLang = (value) => {
    const lower = typeof value === 'string' ? value.toLowerCase() : '';
    return VALID_LANGS.has(lower) ? lower : 'en';
};

const getErrorRequired = (lang) => {
    const dictionary = translations[lang] || translations.en;
    return dictionary.errorRequired || translations.en.errorRequired;
};

const buildErrorHtml = (message) => `<p class="error">${message}</p>`;
const sanitizeHtml = (input) => {
    if (typeof input !== 'string') return '';
    return input
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        .replace(/\son\w+=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
        .replace(/\sjavascript:/gi, '');
};

const buildValidatedPayload = (payload, lang, state) => {
    const sanitized = {
        lang,
        state,
        capacity: payload.capacity,
        ph: payload.ph,
        alkalinity: payload.alkalinity,
        calcium: payload.calcium,
        cyanuric: payload.cyanuric,
        freechlorine: payload.freechlorine
    };

    if (payload.temperature !== undefined) sanitized.temperature = payload.temperature;
    if (payload.tds !== undefined) sanitized.tds = payload.tds;
    if (payload['salt-current'] !== undefined) sanitized['salt-current'] = payload['salt-current'];
    if (payload['salt-desired'] !== undefined) sanitized['salt-desired'] = payload['salt-desired'];

    return sanitized;
};

const validateCalculateRequest = (req, res, next) => {
    const parseResult = calculateSchema.safeParse(req.body);
    if (!parseResult.success) {
        const lang = normalizeLang(req.body?.lang);
        return res.status(400).json({ html: buildErrorHtml(getErrorRequired(lang)) });
    }

    const payload = parseResult.data;
    const lang = normalizeLang(payload.lang);
    const state = typeof payload.state === 'string' ? payload.state.toLowerCase() : '';

    if (!VALID_STATES.has(state)) {
        return res.status(400).json({ html: buildErrorHtml(getErrorRequired(lang)) });
    }

    req.validatedPayload = buildValidatedPayload(payload, lang, state);
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
        const result = calculateLSIAndAdvice(req.validatedPayload);
        res.json({
            ...result,
            html: sanitizeHtml(result?.html)
        });
    } catch (err) {
        console.error("Calculation error:", err);
        const lang = req.validatedPayload?.lang || 'en';
        res.status(500).json({
            error: 'Calculation error.',
            lang: lang

         });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
