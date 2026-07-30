# MiyuLabs — Waitlist Site

Pre-launch landing page + waitlist for [MiyuLabs](https://miyulabs.in). Built with Next.js 16, Prisma + SQLite, and Nodemailer.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | SQLite via Prisma + better-sqlite3 |
| Email | Nodemailer (GoDaddy SMTP) |
| Process manager | PM2 + nginx (production) |

---

## Local Development

### 1. Clone & install

```bash
git clone https://github.com/MiyuLabs/waitlist.git
cd waitlist
npm install
```

### 2. Environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite path — keep `file:./dev.db` for local |
| `IP_HASH_SALT` | Random string used to hash IPs — generate with `openssl rand -hex 24` |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (e.g. `465`) |
| `SMTP_SECURE` | `true` for port 465 |
| `SMTP_USER` | SMTP login email |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM_NAME` | Sender display name |
| `SMTP_FROM_EMAIL` | Sender email address |
| `NEXT_PUBLIC_APP_URL` | Full URL of the app (e.g. `https://yourdomain.tld`) |
| `ADMIN_SECRET_TOKEN` | Dashboard access token — generate with `openssl rand -hex 32` |
| `ADMIN_COOKIE_MAX_AGE` | Session TTL in seconds (`604800` = 1 week) |

### 3. Set up the database

```bash
npm run db:push      # apply schema to dev.db (prototyping only)
```

> For production, migrations are tracked in `prisma/migrations/`. Run `npm run db:migrate` to create a new named migration when you change the schema.

### 4. Run

```bash
npm run dev           # http://localhost:3000
```

---

## Admin Dashboard

Visit `/admin` to view all waitlist signups and export as JSON.

Access is gated by `ADMIN_SECRET_TOKEN` — set it in your `.env` and your hosting provider's secret vault. The token is stored in an `HttpOnly; SameSite=Strict` cookie and **never exposed to client JS**.

**Programmatic access** (curl / scripts):

```bash
curl -H "Authorization: Bearer <your-token>" \
     https://miyulabs.in/api/admin/subscribers
```

---

## Production Deployment

### Server prerequisites (one-time)

```bash
# On the server — as root or sudo user
apt install -y git nginx
npm install -g pm2

# Clone the repo
git clone https://github.com/MiyuLabs/waitlist.git /var/www/waitlist
cd /var/www/waitlist

# Create production .env (fill in all values)
cp .env.example .env
nano .env

# Install deps, generate Prisma client, run migrations, build
npm ci
npx prisma migrate deploy
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup          # follow the printed command to enable auto-restart on reboot
```

### nginx config

> The `ecosystem.config.js` is configured to run the app on port 3001. Make sure to update the `proxy_pass` in the nginx config to match the port in the ecosystem file.

```nginx
server {
    listen 80;
    server_name yourdomain.tld www.yourdomain.tld;

    location / {
        proxy_pass         http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then get a TLS certificate:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.tld -d www.yourdomain.tld
```

### Subsequent deploys (automated via GitHub Actions)

After the first setup, all deploys are handled automatically on push to `main`. See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## GitHub Actions Secrets

Add these in **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `SSH_HOST` | Server IP or domain |
| `SSH_USER` | Deploy user (e.g. `deploy`) |
| `SSH_PRIVATE_KEY` | Private key for that user (`cat ~/.ssh/id_ed25519`) |

---

## Scripts

```bash
npm run dev          # start dev server
npm run build        # production build
npm run lint         # ESLint
npm run db:migrate   # create a new named migration (dev)
npm run db:push      # sync schema → DB without migration history (prototyping only)
npm run db:studio    # open Prisma Studio
```

---

## License

[MIT](LICENSE)
