/**
 * lib/mailer.ts — SERVER-ONLY
 * Nodemailer transporter singleton for GoDaddy Workspace Email (SMTP).
 */

import nodemailer, { Transporter } from 'nodemailer'

interface MailOptions {
  to: string
  subject: string
  html: string
  text: string
}

const globalForMailer = globalThis as unknown as {
  mailer: Transporter | undefined
}

function getTransporter(): Transporter {
  if (globalForMailer.mailer) return globalForMailer.mailer

  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'] as const
  for (const key of required) {
    if (!process.env[key]) throw new Error(`Missing env var: ${key}`)
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!, 10),
    secure: process.env.SMTP_SECURE === 'true', // true = 465 SSL, false = 587 STARTTLS
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    tls: { rejectUnauthorized: true },
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForMailer.mailer = transporter
  }

  return transporter
}

export async function sendMail({ to, subject, html, text }: MailOptions) {
  const transporter = getTransporter()
  return transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME ?? 'MiyuLabs'}" <${process.env.SMTP_FROM_EMAIL ?? process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  })
}