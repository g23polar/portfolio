"use client"

import { useState, useEffect } from "react"
import { Save, Loader2 } from "lucide-react"
import SkillsEditor from "@/components/admin/SkillsEditor"
import type { Skills } from "@/types/portfolio"

export default function SkillsManagePage() {
  const [skills, setSkills] = useState<Skills | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/portfolio/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    if (!skills) return
    setSaving(true)
    setMessage("")

    try {
      const res = await fetch("/api/portfolio/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skills),
      })

      if (res.ok) {
        setMessage("Saved successfully!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Failed to save. Please try again.")
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading || !skills) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-400" size={32} />
      </div>
    )
  }

  const totalSkills = Object.values(skills).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Skills</h1>
          <p className="text-dark-400 mt-1">{totalSkills} skills across 6 categories</p>
        </div>
        <div className="flex items-center gap-4">
          {message && (
            <span
              className={message.includes("success") ? "text-green-400" : "text-red-400"}
            >
              {message}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
      </div>

      <SkillsEditor skills={skills} onChange={setSkills} />
    </div>
  )
}
