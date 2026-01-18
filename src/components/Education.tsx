'use client'

import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

export default function Education() {
  const { education } = portfolioData

  return (
    <section id="education" className="py-20 bg-dark-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-16"
        >
          <h2 className="section-heading">Education</h2>
          <p className="section-subheading mx-auto">
            My academic background and continuous learning journey
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="glass-card p-6 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="text-primary-400" size={24} />
              </div>

              {/* Degree */}
              <h3 className="text-xl font-bold text-white mb-2">
                {edu.degree}
              </h3>

              {/* Institution */}
              <p className="text-primary-400 font-medium mb-3">
                {edu.institution}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-dark-400">
                  <Calendar size={14} />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center gap-1 text-dark-400">
                  <MapPin size={14} />
                  <span>{edu.location}</span>
                </div>
                {edu.gpa && (
                  <div className="flex items-center gap-1 text-dark-400">
                    <Award size={14} />
                    <span>GPA: {edu.gpa}</span>
                  </div>
                )}
              </div>

              {/* Highlights */}
              {edu.highlights && (
                <ul className="space-y-2">
                  {edu.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-dark-400 text-sm"
                    >
                      <span className="text-primary-500 mt-1">&#8226;</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
