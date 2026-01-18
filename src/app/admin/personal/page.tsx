"use client"

import { useState, useEffect } from "react"
import { Save, Loader2 } from "lucide-react"
import FormField from "@/components/admin/FormField"
import FormTextarea from "@/components/admin/FormTextarea"
import type { Personal } from "@/types/portfolio"

export default function PersonalEditPage() {
  const [data, setData] = useState<Personal | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/portfolio/personal")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    try {
      const res = await fetch("/api/portfolio/personal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-400" size={32} />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Personal Information</h1>

      <form onSubmit={handleSubmit} className="glass-card p-8 max-w-2xl">
        <div className="space-y-6">
          <FormField
            label="Name"
            value={data.name}
            onChange={(v) => setData({ ...data, name: v })}
            required
          />
          <FormField
            label="Title"
            value={data.title}
            onChange={(v) => setData({ ...data, title: v })}
            required
          />
          <FormField
            label="Tagline"
            value={data.tagline}
            onChange={(v) => setData({ ...data, tagline: v })}
          />
          <FormTextarea
            label="Bio"
            value={data.bio}
            onChange={(v) => setData({ ...data, bio: v })}
          />
          <FormField
            label="Email"
            type="email"
            value={data.email}
            onChange={(v) => setData({ ...data, email: v })}
            required
          />
          <FormField
            label="Location"
            value={data.location}
            onChange={(v) => setData({ ...data, location: v })}
          />
          <FormField
            label="Avatar URL"
            value={data.avatar}
            onChange={(v) => setData({ ...data, avatar: v })}
            placeholder="/avatar.jpg"
          />
          <FormField
            label="Resume URL"
            value={data.resumeUrl}
            onChange={(v) => setData({ ...data, resumeUrl: v })}
            placeholder="/resume.pdf"
          />

          <div className="border-t border-dark-700 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
            <div className="space-y-4">
              <FormField
                label="GitHub URL"
                value={data.social.github || ""}
                onChange={(v) => setData({ ...data, social: { ...data.social, github: v } })}
                placeholder="https://github.com/username"
              />
              <FormField
                label="LinkedIn URL"
                value={data.social.linkedin || ""}
                onChange={(v) => setData({ ...data, social: { ...data.social, linkedin: v } })}
                placeholder="https://linkedin.com/in/username"
              />
              <FormField
                label="Twitter URL"
                value={data.social.twitter || ""}
                onChange={(v) => setData({ ...data, social: { ...data.social, twitter: v } })}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </button>

          {message && (
            <span
              className={message.includes("success") ? "text-green-400" : "text-red-400"}
            >
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
