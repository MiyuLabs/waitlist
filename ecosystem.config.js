// ecosystem.config.js
// PM2 process definition for MiyuLabs waitlist site.
// Usage:
//   pm2 start ecosystem.config.js        # start
//   pm2 reload ecosystem.config.js       # zero-downtime reload
//   pm2 stop miyulabs                    # stop

module.exports = {
  apps: [
    {
      name:         'miyulabs',
      script:       'node_modules/.bin/next',
      args:         'start',
      cwd:          '/var/www/miyulabs',

      // Keep a single instance (SQLite doesn't support multiple writers)
      instances:    1,
      exec_mode:    'fork',

      // Env passed to the Next.js process
      // The real secrets live in /var/www/miyulabs/.env — Next.js reads them automatically.
      env_production: {
        NODE_ENV: 'production',
        PORT:     3001,
      },

      // Restart policy
      autorestart:  true,
      watch:        false,       // never watch — deploys handle restarts
      max_restarts: 10,
      min_uptime:   '10s',

      // Logging
      out_file:     '/var/log/pm2/miyulabs-out.log',
      error_file:   '/var/log/pm2/miyulabs-err.log',
      merge_logs:   true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
}
