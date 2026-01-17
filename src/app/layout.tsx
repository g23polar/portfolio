import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio | Gautam Nair',
  description: 'Full Stack Developer portfolio showcasing projects, experience, and skills.',
  keywords: ['developer', 'portfolio', 'react', 'nextjs', 'full stack'],
  authors: [{ name: 'Gautam Nair' }],
  openGraph: {
    title: 'Portfolio | Gautam Nair',
    description: 'Full Stack Developer portfolio showcasing projects, experience, and skills.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-dark-950 text-dark-100`} suppressHydrationWarning>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
