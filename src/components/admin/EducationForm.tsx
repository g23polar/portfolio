"use client"

import { useState } from "react"
import { Save, X, Loader2 } from "lucide-react"
import FormField from "./FormField"
import ArrayEditor from "./ArrayEditor"
import type { Education } from "@/types/portfolio"

interface EducationFormProps {
  education?: Education
  onSave: (education: Education | Omit<Education, "id">) => Promise<void>
  onCancel: () => void
}

const emptyEducation: Omit<Education, "id"> = {
  institution: "",
  degree: "",
  period: "",
  location: "",
  gpa: "",
  highlights: [],
}

export default function EducationForm({ education, onSave, onCancel }: EducationFormProps) {
  const [data, setData] = useState<Education | Omit<Education, "id">>(education || emptyEducation)
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
          {education ? "Edit Education" : "Add Education"}
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
          label="Institution"
          value={data.institution}
          onChange={(v) => setData({ ...data, institution: v })}
          required
        />
        <FormField
          label="Degree"
          value={data.degree}
          onChange={(v) => setData({ ...data, degree: v })}
          required
        />
        <FormField
          label="Period"
          value={data.period}
          onChange={(v) => setData({ ...data, period: v })}
          placeholder="2014 - 2018"
          required
        />
        <FormField
          label="Location"
          value={data.location}
          onChange={(v) => setData({ ...data, location: v })}
          placeholder="Boston, MA"
        />
        <FormField
          label="GPA"
          value={data.gpa || ""}
          onChange={(v) => setData({ ...data, gpa: v })}
          placeholder="3.8/4.0"
        />
      </div>

      <div className="mb-6">
        <ArrayEditor
          label="Highlights"
          items={data.highlights || []}
          onChange={(v) => setData({ ...data, highlights: v })}
          placeholder="Add highlight..."
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
          className="btn-primary flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {education ? "Update" : "Create"}
        </button>
      </div>
    </form>
  )
}
