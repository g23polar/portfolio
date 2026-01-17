import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import SessionProvider from "@/components/providers/SessionProvider"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/login")
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-dark-950">
        <AdminSidebar />
        <AdminHeader user={session.user} />
        <main className="ml-64 pt-16 p-8">{children}</main>
      </div>
    </SessionProvider>
  )
}
