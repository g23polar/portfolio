"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Loader2, Star, ExternalLink, Github } from "lucide-react"
import ProjectForm from "@/components/admin/ProjectForm"
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal"
import type { Project } from "@/types/portfolio"

export default function ProjectsManagePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const res = await fetch("/api/portfolio/projects")
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  const handleSave = async (project: Project | Omit<Project, "id">) => {
    const method = "id" in project ? "PUT" : "POST"

    await fetch("/api/portfolio/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })

    await fetchProjects()
    setEditingId(null)
    setIsAdding(false)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    await fetch("/api/portfolio/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteId }),
    })

    await fetchProjects()
    setDeleteId(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-400" size={32} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-dark-400 mt-1">
            {projects.length} projects ({projects.filter((p) => p.featured).length} featured)
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 overflow-hidden">
          <ProjectForm onSave={handleSave} onCancel={() => setIsAdding(false)} />
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="glass-card p-6">
            {editingId === project.id ? (
              <ProjectForm
                project={project}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-400 text-xs rounded-full">
                        <Star size={12} />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-dark-300 text-sm mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-dark-800 text-dark-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-dark-400 hover:text-white"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setEditingId(project.id)}
                    className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteId(project.id)}
                    className="p-2 text-dark-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  )
}
