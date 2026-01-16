import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio | Your Name',
  description: 'Full Stack Developer portfolio showcasing projects, experience, and skills.',
  keywords: ['developer', 'portfolio', 'react', 'nextjs', 'full stack'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Portfolio | Your Name',
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-dark-950 text-dark-100`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
