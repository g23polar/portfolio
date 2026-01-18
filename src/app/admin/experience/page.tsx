"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import ExperienceForm from "@/components/admin/ExperienceForm"
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal"
import type { Experience } from "@/types/portfolio"

export default function ExperienceManagePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    const res = await fetch("/api/portfolio/experience")
    const data = await res.json()
    setExperiences(data)
    setLoading(false)
  }

  const handleSave = async (experience: Experience | Omit<Experience, "id">) => {
    const method = "id" in experience ? "PUT" : "POST"

    await fetch("/api/portfolio/experience", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(experience),
    })

    await fetchExperiences()
    setEditingId(null)
    setIsAdding(false)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    await fetch("/api/portfolio/experience", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteId }),
    })

    await fetchExperiences()
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
          <h1 className="text-3xl font-bold text-white">Work Experience</h1>
          <p className="text-dark-400 mt-1">{experiences.length} entries</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {isAdding && (
        <div className="mb-6">
          <ExperienceForm onSave={handleSave} onCancel={() => setIsAdding(false)} />
        </div>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="glass-card p-6">
            {editingId === exp.id ? (
              <ExperienceForm
                experience={exp}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-primary-400">{exp.company}</p>
                  <p className="text-dark-400 text-sm mt-1">
                    {exp.period} | {exp.location}
                  </p>
                  {exp.description && (
                    <p className="text-dark-300 text-sm mt-2">{exp.description}</p>
                  )}
                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-dark-800 text-dark-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setEditingId(exp.id)}
                    className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteId(exp.id)}
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
        title="Delete Experience"
        message="Are you sure you want to delete this experience entry? This action cannot be undone."
      />
    </div>
  )
}
