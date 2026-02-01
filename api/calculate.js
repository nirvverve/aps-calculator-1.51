const { calculateLSIAndAdvice, translations } = require('../calculator');

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

const parsePayload = (req) => {
    if (req?.body && typeof req.body === 'object') {
        return req.body;
    }
    if (typeof req?.body === 'string') {
        try {
            return JSON.parse(req.body);
        } catch (err) {
            return null;
        }
    }
    return null;
};

const sendJson = (res, status, payload) => {
    res.status(status).json(payload);
};

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return sendJson(res, 405, { error: 'Method Not Allowed' });
    }

    const payload = parsePayload(req);
    const lang = normalizeLang(payload?.lang);
    const state = typeof payload?.state === 'string' ? payload.state.toLowerCase() : '';
    const requiredFields = ['capacity', 'ph', 'alkalinity', 'calcium', 'cyanuric', 'freechlorine'];
    const optionalFields = ['temperature', 'tds', 'salt-current', 'salt-desired'];

    if (!payload || typeof payload !== 'object' || !VALID_STATES.has(state)) {
        return sendJson(res, 400, { html: buildErrorHtml(getErrorRequired(lang)) });
    }

    if (requiredFields.some((field) => !isNumberish(payload[field]))) {
        return sendJson(res, 400, { html: buildErrorHtml(getErrorRequired(lang)) });
    }

    for (const field of optionalFields) {
        if (hasValue(payload[field]) && !isNumberish(payload[field])) {
            return sendJson(res, 400, { html: buildErrorHtml(getErrorRequired(lang)) });
        }
    }

    payload.lang = lang;
    payload.state = state;

    try {
        const result = calculateLSIAndAdvice(payload);
        return sendJson(res, 200, result);
    } catch (err) {
        console.error('Calculation error:', err);
        return sendJson(res, 500, { error: 'Calculation error.', lang });
    }
};
