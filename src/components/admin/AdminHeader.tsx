"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { motion } from "framer-motion"

interface AdminHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-dark-900/80 backdrop-blur-md border-b border-dark-800 z-30 flex items-center justify-between px-8">
      <div />

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-white">{user.name}</p>
          <p className="text-xs text-dark-400">{user.email}</p>
        </div>

        {user.image && (
          <img src={user.image} alt={user.name || ""} className="w-10 h-10 rounded-full" />
        )}

        <motion.button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={18} />
          <span className="text-sm">Sign out</span>
        </motion.button>
      </div>
    </header>
  )
}
