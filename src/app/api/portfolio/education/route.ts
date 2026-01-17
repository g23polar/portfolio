import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getPortfolioData, savePortfolioData, generateId } from "@/lib/portfolio"
import type { Education } from "@/types/portfolio"

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.education)
  } catch {
    return NextResponse.json({ error: "Failed to load education data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newEducation: Omit<Education, "id"> = await request.json()
    const data = await getPortfolioData()

    const education: Education = {
      ...newEducation,
      id: generateId("edu"),
    }

    data.education.unshift(education)
    await savePortfolioData(data)

    return NextResponse.json(education, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedEducation: Education = await request.json()
    const data = await getPortfolioData()

    const index = data.education.findIndex((e) => e.id === updatedEducation.id)
    if (index === -1) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 })
    }

    data.education[index] = updatedEducation
    await savePortfolioData(data)

    return NextResponse.json(updatedEducation)
  } catch {
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    const data = await getPortfolioData()

    data.education = data.education.filter((e) => e.id !== id)
    await savePortfolioData(data)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 })
  }
}
