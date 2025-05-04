const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Change these to your own secure credentials!
const USERNAME = 'seanjohnson';
const PASSWORD = 'seanjohnson123';

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'Lizzo',
    resave: false,
    saveUninitialized: false
}));

// Login page
app.get('/login', (req, res) => {
    res.send(`
        <h2>Login</h2>
        <form method="POST" action="/login">
            <input name="username" placeholder="Username" required><br>
            <input name="password" type="password" placeholder="Password" required><br>
            <button type="submit">Login</button>
        </form>
        ${req.query.error ? '<p style="color:red;">Invalid login</p>' : ''}
    `);
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.redirect('/login?error=1');
    }
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Middleware to protect all routes except /login
app.use((req, res, next) => {
    if (req.session.loggedIn || req.path === '/login') {
        next();
    } else {
        res.redirect('/login');
    }
});

// Serve static files (your calculator)
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`Secure server running at http://localhost:${PORT}/`);
});