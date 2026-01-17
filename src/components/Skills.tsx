'use client'

import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
} from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const skillCategories = [
  { key: 'languages', label: 'Languages', icon: Code2 },
  { key: 'frontend', label: 'Frontend', icon: Layout },
  { key: 'backend', label: 'Backend', icon: Server },
  { key: 'databases', label: 'Databases', icon: Database },
  { key: 'devops', label: 'DevOps', icon: Cloud },
  { key: 'tools', label: 'Tools', icon: Wrench },
]

export default function Skills() {
  const { skills } = portfolioData

  return (
    <section id="skills" className="py-20 bg-dark-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-subheading mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(({ key, label, icon: Icon }) => {
            const categorySkills = skills[key as keyof typeof skills]
            if (!categorySkills || categorySkills.length === 0) return null

            return (
              <div
                key={key}
                className="glass-card p-6 hover:border-primary-500/50 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                    <Icon className="text-primary-400" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{label}</h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-dark-800 text-dark-300 rounded-lg hover:bg-primary-500/10 hover:text-primary-400 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
