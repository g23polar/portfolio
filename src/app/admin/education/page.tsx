"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import EducationForm from "@/components/admin/EducationForm"
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal"
import type { Education } from "@/types/portfolio"

export default function EducationManagePage() {
  const [education, setEducation] = useState<Education[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    const res = await fetch("/api/portfolio/education")
    const data = await res.json()
    setEducation(data)
    setLoading(false)
  }

  const handleSave = async (edu: Education | Omit<Education, "id">) => {
    const method = "id" in edu ? "PUT" : "POST"

    await fetch("/api/portfolio/education", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edu),
    })

    await fetchEducation()
    setEditingId(null)
    setIsAdding(false)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    await fetch("/api/portfolio/education", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteId }),
    })

    await fetchEducation()
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
          <h1 className="text-3xl font-bold text-white">Education</h1>
          <p className="text-dark-400 mt-1">{education.length} entries</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 overflow-hidden">
          <EducationForm onSave={handleSave} onCancel={() => setIsAdding(false)} />
        </div>
      )}

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="glass-card p-6">
            {editingId === edu.id ? (
              <EducationForm
                education={edu}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-primary-400">{edu.institution}</p>
                  <p className="text-dark-400 text-sm mt-1">
                    {edu.period} | {edu.location}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </p>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {edu.highlights.map((highlight, i) => (
                        <li key={i} className="text-dark-300 text-sm flex items-start gap-2">
                          <span className="text-primary-400 mt-1">-</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setEditingId(edu.id)}
                    className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteId(edu.id)}
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
        title="Delete Education"
        message="Are you sure you want to delete this education entry? This action cannot be undone."
      />
    </div>
  )
}
