'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Heart } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

export default function Footer() {
  const { personal } = portfolioData
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900/50 border-t border-dark-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-2">
              {personal.name}
            </h3>
            <p className="text-dark-400 text-sm">{personal.tagline}</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {Object.entries(personal.social).map(([platform, url]) => {
              const Icon = socialIcons[platform as keyof typeof socialIcons]
              return Icon ? (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-dark-400 hover:text-primary-400 transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              ) : null
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-dark-800 text-center">
          <p className="text-dark-500 text-sm flex items-center justify-center gap-1">
            &copy; {currentYear} {personal.name}. Made with{' '}
            <Heart size={14} className="text-red-500 fill-red-500" /> using
            Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
