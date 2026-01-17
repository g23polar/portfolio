'use client'

import { Calendar, Clock, ArrowRight } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

export default function Blog() {
  const { blog } = portfolioData

  return (
    <section id="blog" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Latest Articles</h2>
          <p className="section-subheading mx-auto">
            Thoughts, tutorials, and insights about web development
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.map((post) => (
            <article
              key={post.id}
              className="glass-card overflow-hidden group hover:border-primary-500/50 transition-all duration-300"
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-primary-700/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-dark-900/50 flex items-center justify-center">
                  <span className="text-4xl font-bold gradient-text opacity-50">
                    {post.title.charAt(0)}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-200">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-dark-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            View all articles <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
