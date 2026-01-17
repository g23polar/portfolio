import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getPortfolioData, savePortfolioData, generateId } from "@/lib/portfolio"
import type { Project } from "@/types/portfolio"

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.projects)
  } catch {
    return NextResponse.json({ error: "Failed to load projects data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newProject: Omit<Project, "id"> = await request.json()
    const data = await getPortfolioData()

    const project: Project = {
      ...newProject,
      id: generateId("proj"),
    }

    data.projects.unshift(project)
    await savePortfolioData(data)

    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedProject: Project = await request.json()
    const data = await getPortfolioData()

    const index = data.projects.findIndex((p) => p.id === updatedProject.id)
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    data.projects[index] = updatedProject
    await savePortfolioData(data)

    return NextResponse.json(updatedProject)
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
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

    data.projects = data.projects.filter((p) => p.id !== id)
    await savePortfolioData(data)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
