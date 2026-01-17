import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio"
import type { Skills } from "@/types/portfolio"

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.skills)
  } catch {
    return NextResponse.json({ error: "Failed to load skills data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const skills: Skills = await request.json()
    const data = await getPortfolioData()
    data.skills = skills
    await savePortfolioData(data)
    return NextResponse.json(skills)
  } catch {
    return NextResponse.json({ error: "Failed to update skills" }, { status: 500 })
  }
}
