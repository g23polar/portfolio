"use client"

import { useState } from "react"
import { Save, X, Loader2 } from "lucide-react"
import FormField from "./FormField"
import FormTextarea from "./FormTextarea"
import ArrayEditor from "./ArrayEditor"
import type { BlogPost } from "@/types/portfolio"

interface BlogFormProps {
  post?: BlogPost
  onSave: (post: BlogPost | Omit<BlogPost, "id">) => Promise<void>
  onCancel: () => void
}

const emptyPost: Omit<BlogPost, "id"> = {
  title: "",
  slug: "",
  excerpt: "",
  date: new Date().toISOString().split("T")[0],
  readTime: "",
  tags: [],
}

export default function BlogForm({ post, onSave, onCancel }: BlogFormProps) {
  const [data, setData] = useState<BlogPost | Omit<BlogPost, "id">>(post || emptyPost)
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setData({
      ...data,
      title,
      slug: data.slug || generateSlug(title),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">
          {post ? "Edit Blog Post" : "Add Blog Post"}
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
          onChange={handleTitleChange}
          required
        />
        <FormField
          label="Slug"
          value={data.slug}
          onChange={(v) => setData({ ...data, slug: v })}
          placeholder="my-blog-post"
          required
        />
        <FormField
          label="Date"
          type="date"
          value={data.date}
          onChange={(v) => setData({ ...data, date: v })}
          required
        />
        <FormField
          label="Read Time"
          value={data.readTime}
          onChange={(v) => setData({ ...data, readTime: v })}
          placeholder="5 min read"
        />
      </div>

      <div className="mb-4">
        <FormTextarea
          label="Excerpt"
          value={data.excerpt}
          onChange={(v) => setData({ ...data, excerpt: v })}
          rows={3}
          placeholder="A brief summary of the blog post..."
          required
        />
      </div>

      <div className="mb-6">
        <ArrayEditor
          label="Tags"
          items={data.tags}
          onChange={(v) => setData({ ...data, tags: v })}
          placeholder="Add tag..."
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
          {post ? "Update" : "Create"}
        </button>
      </div>
    </form>
  )
}
