"use client"

import { useState } from "react"
import { Save, X, Loader2 } from "lucide-react"
import FormField from "./FormField"
import FormTextarea from "./FormTextarea"
import ArrayEditor from "./ArrayEditor"
import type { Experience } from "@/types/portfolio"

interface ExperienceFormProps {
  experience?: Experience
  onSave: (experience: Experience | Omit<Experience, "id">) => Promise<void>
  onCancel: () => void
}

const emptyExperience: Omit<Experience, "id"> = {
  company: "",
  role: "",
  period: "",
  location: "",
  description: "",
  highlights: [],
  technologies: [],
}

export default function ExperienceForm({ experience, onSave, onCancel }: ExperienceFormProps) {
  const [data, setData] = useState<Experience | Omit<Experience, "id">>(
    experience || emptyExperience
  )
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
          {experience ? "Edit Experience" : "Add Experience"}
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
          label="Company"
          value={data.company}
          onChange={(v) => setData({ ...data, company: v })}
          required
        />
        <FormField
          label="Role"
          value={data.role}
          onChange={(v) => setData({ ...data, role: v })}
          required
        />
        <FormField
          label="Period"
          value={data.period}
          onChange={(v) => setData({ ...data, period: v })}
          placeholder="2022 - Present"
          required
        />
        <FormField
          label="Location"
          value={data.location}
          onChange={(v) => setData({ ...data, location: v })}
          placeholder="San Francisco, CA"
        />
      </div>

      <div className="mb-4">
        <FormTextarea
          label="Description"
          value={data.description}
          onChange={(v) => setData({ ...data, description: v })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ArrayEditor
          label="Highlights"
          items={data.highlights}
          onChange={(v) => setData({ ...data, highlights: v })}
          placeholder="Add highlight..."
        />
        <ArrayEditor
          label="Technologies"
          items={data.technologies}
          onChange={(v) => setData({ ...data, technologies: v })}
          placeholder="Add technology..."
        />
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
          {experience ? "Update" : "Create"}
        </button>
      </div>
    </form>
  )
}
