import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getPortfolioData, savePortfolioData, generateId } from "@/lib/portfolio"
import type { Experience } from "@/types/portfolio"

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.experience)
  } catch {
    return NextResponse.json({ error: "Failed to load experience data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newExperience: Omit<Experience, "id"> = await request.json()
    const data = await getPortfolioData()

    const experience: Experience = {
      ...newExperience,
      id: generateId("exp"),
    }

    data.experience.unshift(experience)
    await savePortfolioData(data)

    return NextResponse.json(experience, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedExperience: Experience = await request.json()
    const data = await getPortfolioData()

    const index = data.experience.findIndex((e) => e.id === updatedExperience.id)
    if (index === -1) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    data.experience[index] = updatedExperience
    await savePortfolioData(data)

    return NextResponse.json(updatedExperience)
  } catch {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
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

    data.experience = data.experience.filter((e) => e.id !== id)
    await savePortfolioData(data)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}
