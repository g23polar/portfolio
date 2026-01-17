'use client'

import { ExternalLink, Github, Folder } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

export default function Projects() {
  const { projects } = portfolioData
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-subheading mx-auto">
            A selection of projects I&apos;ve built and contributed to
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-20 mb-20">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Project Image */}
              <div className="lg:w-1/2 w-full">
                <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-2xl overflow-hidden border border-dark-800 flex items-center justify-center">
                  <Folder size={64} className="text-primary-500/50" />
                </div>
              </div>

              {/* Project Info */}
              <div className="lg:w-1/2 w-full">
                <p className="text-primary-400 font-medium mb-2">
                  Featured Project
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                <div className="glass-card p-6 mb-4">
                  <p className="text-dark-300">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm text-dark-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-400 hover:text-primary-400 transition-colors"
                    >
                      <Github size={22} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-400 hover:text-primary-400 transition-colors"
                    >
                      <ExternalLink size={22} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              Other Noteworthy Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card p-6 flex flex-col h-full hover:border-primary-500/50 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <Folder size={40} className="text-primary-400" />
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark-400 hover:text-primary-400 transition-colors"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark-400 hover:text-primary-400 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-bold text-white mb-2">
                    {project.title}
                  </h4>
                  <p className="text-dark-400 text-sm mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-dark-500 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
