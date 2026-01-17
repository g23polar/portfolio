import { auth } from "@/auth"
import { getPortfolioData } from "@/lib/portfolio"
import Link from "next/link"
import { Briefcase, GraduationCap, FolderOpen, FileText, User, Wrench } from "lucide-react"

export default async function AdminDashboard() {
  const [session, data] = await Promise.all([auth(), getPortfolioData()])

  const stats = [
    {
      label: "Experience",
      count: data.experience.length,
      href: "/admin/experience",
      icon: Briefcase,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Education",
      count: data.education.length,
      href: "/admin/education",
      icon: GraduationCap,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Projects",
      count: data.projects.length,
      href: "/admin/projects",
      icon: FolderOpen,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Blog Posts",
      count: data.blog.length,
      href: "/admin/blog",
      icon: FileText,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
  ]

  const quickLinks = [
    { label: "Edit Personal Info", href: "/admin/personal", icon: User },
    { label: "Manage Skills", href: "/admin/skills", icon: Wrench },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {session?.user?.name?.split(" ")[0]}
        </h1>
        <p className="text-dark-400">Manage your portfolio content from here</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.href} href={stat.href}>
              <div className="glass-card p-6 hover:border-primary-500/50 transition-all hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                  <span className="text-3xl font-bold text-white">{stat.count}</span>
                </div>
                <p className="text-dark-400">{stat.label}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <div className="flex items-center gap-3 p-4 bg-dark-800/50 rounded-lg hover:bg-dark-700/50 transition-colors">
                  <Icon size={20} className="text-primary-400" />
                  <span className="text-white">{link.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
