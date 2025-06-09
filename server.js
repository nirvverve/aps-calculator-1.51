process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { calculateLSIAndAdvice } = require('./calculator'); 
const app = express();
const PORT = 3000; // or whatever port you use

app.set('trust proxy', true); // Or app.set('trust proxy', 1
app.use(express.static(path.join(__dirname))); // serves your HTML, JS, CSS
app.use(bodyParser.json()); // lets Express read JSON sent from the browser
app.post('/api/calculate', (req, res) => {
    console.log("Received request body:", req.body);
    const clientIp = req.ip;
    console.log("Client IP:", clientIp)
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