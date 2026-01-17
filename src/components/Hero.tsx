'use client'

import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

export default function Hero() {
  const { personal } = portfolioData

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-dark-950 to-dark-950" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Greeting */}
          <p className="text-primary-400 font-medium mb-4">
            Hello, I&apos;m
          </p>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {personal.name}
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-medium gradient-text mb-6">
            {personal.title}
          </h2>

          {/* Tagline */}
          <p className="text-dark-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {personal.tagline}
          </p>

          {/* Bio */}
          <p className="text-dark-300 text-base max-w-xl mx-auto mb-10">
            {personal.bio}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {Object.entries(personal.social).map(([platform, url]) => {
              const Icon = socialIcons[platform as keyof typeof socialIcons]
              return Icon ? (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-card text-dark-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ) : null
            })}
            <a
              href={`mailto:${personal.email}`}
              className="p-3 glass-card text-dark-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a
            href="#experience"
            className="text-dark-500 hover:text-primary-400 transition-colors"
          >
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  )
}
