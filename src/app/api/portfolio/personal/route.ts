import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio"
import type { Personal } from "@/types/portfolio"

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.personal)
  } catch {
    return NextResponse.json({ error: "Failed to load personal data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const personal: Personal = await request.json()
    const data = await getPortfolioData()
    data.personal = personal
    await savePortfolioData(data)
    return NextResponse.json(personal)
  } catch {
    return NextResponse.json({ error: "Failed to update personal data" }, { status: 500 })
  }
}
