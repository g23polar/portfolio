"use client"

import { useState } from "react"
import { Save, X, Loader2 } from "lucide-react"
import FormField from "./FormField"
import FormTextarea from "./FormTextarea"
import ArrayEditor from "./ArrayEditor"
import type { Project } from "@/types/portfolio"

interface ProjectFormProps {
  project?: Project
  onSave: (project: Project | Omit<Project, "id">) => Promise<void>
  onCancel: () => void
}

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  image: "",
  technologies: [],
  liveUrl: "",
  githubUrl: "",
  featured: false,
}

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [data, setData] = useState<Project | Omit<Project, "id">>(project || emptyProject)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(data)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">
          {project ? "Edit Project" : "Add Project"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-dark-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          label="Title"
          value={data.title}
          onChange={(v) => setData({ ...data, title: v })}
          required
        />
        <FormField
          label="Image URL"
          value={data.image || ""}
          onChange={(v) => setData({ ...data, image: v })}
          placeholder="/projects/project.jpg"
        />
        <FormField
          label="Live URL"
          value={data.liveUrl || ""}
          onChange={(v) => setData({ ...data, liveUrl: v })}
          placeholder="https://example.com"
        />
        <FormField
          label="GitHub URL"
          value={data.githubUrl || ""}
          onChange={(v) => setData({ ...data, githubUrl: v })}
          placeholder="https://github.com/user/repo"
        />
      </div>

      <div className="mb-4">
        <FormTextarea
          label="Description"
          value={data.description}
          onChange={(v) => setData({ ...data, description: v })}
          rows={3}
          required
        />
      </div>

      <div className="mb-4">
        <ArrayEditor
          label="Technologies"
          items={data.technologies}
          onChange={(v) => setData({ ...data, technologies: v })}
          placeholder="Add technology..."
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.featured}
            onChange={(e) => setData({ ...data, featured: e.target.checked })}
            className="w-5 h-5 rounded bg-dark-800 border-dark-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
          />
          <span className="text-dark-300">Featured project (shown prominently on homepage)</span>
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {project ? "Update" : "Create"}
        </button>
      </div>
    </form>
  )
}
