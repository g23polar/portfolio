"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2, Loader2, Calendar, Clock } from "lucide-react"
import BlogForm from "@/components/admin/BlogForm"
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal"
import type { BlogPost } from "@/types/portfolio"

export default function BlogManagePage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const res = await fetch("/api/portfolio/blog")
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  const handleSave = async (post: BlogPost | Omit<BlogPost, "id">) => {
    const method = "id" in post ? "PUT" : "POST"

    await fetch("/api/portfolio/blog", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })

    await fetchPosts()
    setEditingId(null)
    setIsAdding(false)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    await fetch("/api/portfolio/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteId }),
    })

    await fetchPosts()
    setDeleteId(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
          <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-dark-400 mt-1">{posts.length} posts</p>
        </div>
        <motion.button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={18} />
          Add Post
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <BlogForm onSave={handleSave} onCancel={() => setIsAdding(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div key={post.id} layout className="glass-card p-6">
            {editingId === post.id ? (
              <BlogForm post={post} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{post.title}</h3>
                  <p className="text-dark-300 text-sm mt-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-dark-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(post.date)}
                    </span>
                    {post.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    )}
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-primary-500/10 text-primary-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setEditingId(post.id)}
                    className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteId(post.id)}
                    className="p-2 text-dark-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </div>
  )
}
