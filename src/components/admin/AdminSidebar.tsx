"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Wrench,
  FileText,
  ArrowLeft,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/personal", label: "Personal Info", icon: User },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-900/80 backdrop-blur-md border-r border-dark-800 p-4 z-40">
      <div className="mb-8 px-4 pt-4">
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        <p className="text-dark-400 text-sm">Manage your portfolio</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/30"
                    : "text-dark-400 hover:text-white hover:bg-dark-800"
                }`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Link href="/">
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-colors"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Back to Site</span>
          </motion.div>
        </Link>
      </div>
    </aside>
  )
}
