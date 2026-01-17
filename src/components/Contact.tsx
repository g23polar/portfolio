'use client'

import { useState } from 'react'
import { Send, Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

export default function Contact() {
  const { personal } = portfolioData
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)
    setFormState({ name: '', email: '', message: '' })

    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 bg-dark-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Get In Touch</h2>
          <p className="section-subheading mx-auto">
            Have a project in mind or just want to say hi? I&apos;d love to hear
            from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Let&apos;s work together
            </h3>
            <p className="text-dark-400 mb-8">
              I&apos;m currently available for freelance work and full-time
              opportunities. If you have a project that you want to get started,
              think you need my help with something, or just want to say hey,
              don&apos;t hesitate to reach out.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
                  <Mail className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-dark-500 text-sm">Email</p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-white hover:text-primary-400 transition-colors"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
                  <MapPin className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-dark-500 text-sm">Location</p>
                  <p className="text-white">{personal.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-dark-500 text-sm mb-4">Find me on</p>
              <div className="flex items-center gap-4">
                {Object.entries(personal.social).map(([platform, url]) => {
                  const Icon = socialIcons[platform as keyof typeof socialIcons]
                  return Icon ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-card flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300"
                    >
                      <Icon size={20} />
                    </a>
                  ) : null
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-dark-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Gautam Nair"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-dark-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-dark-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    submitted
                      ? 'bg-green-500 text-white'
                      : 'bg-primary-600 hover:bg-primary-500 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : submitted ? (
                    <>
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
