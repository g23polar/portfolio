import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      isAdmin?: boolean
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        session.user.isAdmin = session.user.email === process.env.ADMIN_EMAIL
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
})
