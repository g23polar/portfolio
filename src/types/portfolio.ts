export interface Social {
  github?: string
  linkedin?: string
  twitter?: string
}

export interface Personal {
  name: string
  title: string
  tagline: string
  bio: string
  email: string
  location: string
  avatar: string
  resumeUrl: string
  social: Social
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  description: string
  highlights: string[]
  technologies: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  location: string
  gpa?: string
  highlights?: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface Skills {
  languages: string[]
  frontend: string[]
  backend: string[]
  databases: string[]
  devops: string[]
  tools: string[]
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
}

export interface PortfolioData {
  personal: Personal
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: Skills
  blog: BlogPost[]
}
