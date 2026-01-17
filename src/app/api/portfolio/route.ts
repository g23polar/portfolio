import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio"

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to load portfolio data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    await savePortfolioData(data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to save portfolio data" }, { status: 500 })
  }
}
