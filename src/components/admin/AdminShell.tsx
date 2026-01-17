"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"

interface AdminShellProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  children: React.ReactNode
}

export default function AdminShell({ user, children }: AdminShellProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-dark-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <AdminSidebar />
      <AdminHeader user={user} />
      <main className="ml-64 pt-16 p-8">{children}</main>
    </div>
  )
}
