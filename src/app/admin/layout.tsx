import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import SessionProvider from "@/components/providers/SessionProvider"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/login")
  }

  return (
    <SessionProvider>
      <AdminShell user={session.user}>{children}</AdminShell>
    </SessionProvider>
  )
}
