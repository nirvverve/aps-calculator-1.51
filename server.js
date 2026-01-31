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

// Block access to sensitive files/directories before static serving
app.use((req, res, next) => {
    const blocked = ['/user_activity.log', '/calculator.js', '/server.js',
                     '/package.json', '/package-lock.json',
                     '/.beads', '/.ntm', '/.claude', '/.git', '/.vscode',
                     '/node_modules', '/.gitignore', '/AGENTS.md',
                     '/INVESTIGATION_REPORT.md'];
    const lower = req.path.toLowerCase();
    if (blocked.some(p => lower === p || lower.startsWith(p + '/'))) {
        return res.status(404).send('Not found');
    }
    next();
});

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post('/api/calculate', (req, res) => {
    console.log("Received request body:", req.body);
    try {
        const result = calculateLSIAndAdvice(req.body);
        console.log("Sending API response:", result);
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