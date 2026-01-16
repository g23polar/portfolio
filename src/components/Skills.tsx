'use client'

import { motion } from 'framer-motion'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="py-20 bg-dark-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-subheading mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map(({ key, label, icon: Icon }) => {
            const categorySkills = skills[key as keyof typeof skills]
            if (!categorySkills || categorySkills.length === 0) return null

            return (
              <motion.div
                key={key}
                variants={itemVariants}
                whileHover={{ y: -4 }}
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
                  {categorySkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-sm bg-dark-800 text-dark-300 rounded-lg hover:bg-primary-500/10 hover:text-primary-400 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
