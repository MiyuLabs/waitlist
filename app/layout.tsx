import type { Metadata }                                           from 'next'
import { Fraunces, Syne, Plus_Jakarta_Sans, Press_Start_2P }       from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets:  ['latin'],
  variable: '--font-fraunces',
  axes:     ['opsz'],
  style:    ['normal', 'italic'],
  display:  'swap',
})

const syne = Syne({
  subsets:  ['latin'],
  variable: '--font-syne',
  weight:   ['400', '600', '800'],
  display:  'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets:  ['latin'],
  variable: '--font-jakarta',
  weight:   ['400', '500'],
  display:  'swap',
})

const pixel = Press_Start_2P({
  subsets:  ['latin'],
  variable: '--font-pixel',
  weight:   ['400'],
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'MiyuLabs — something is waking up',
  description: 'a little companion. for your desk. for your late nights.',
  openGraph: {
    title:       'MiyuLabs — something is waking up',
    description: 'for the ones still up at 3am.',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${syne.variable} ${jakarta.variable} ${pixel.variable}`}
    >
      <body className="bg-midnight text-text-1 overflow-hidden h-screen">
        {children}
      </body>
    </html>
  )
}