module.exports = {
    apps: [
        {
            name: 'aps-calculator',
            script: 'server.js',
            env: {
                NODE_ENV: 'production',
                PORT: process.env.PORT || 3000
            },
            watch: false
        },
        {
            name: 'aps-calculator-updater',
            script: 'scripts/pm2-update.sh',
            cron_restart: '0 4 * * 0',
            autorestart: false,
            watch: false
        }
    ]
};
