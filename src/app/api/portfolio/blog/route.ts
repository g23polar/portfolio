import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { getPortfolioData, savePortfolioData, generateId } from "@/lib/portfolio"
import type { BlogPost } from "@/types/portfolio"

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.blog)
  } catch {
    return NextResponse.json({ error: "Failed to load blog data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newPost: Omit<BlogPost, "id"> = await request.json()
    const data = await getPortfolioData()

    const post: BlogPost = {
      ...newPost,
      id: generateId("blog"),
    }

    data.blog.unshift(post)
    await savePortfolioData(data)

    return NextResponse.json(post, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedPost: BlogPost = await request.json()
    const data = await getPortfolioData()

    const index = data.blog.findIndex((p) => p.id === updatedPost.id)
    if (index === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    data.blog[index] = updatedPost
    await savePortfolioData(data)

    return NextResponse.json(updatedPost)
  } catch {
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
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

    data.blog = data.blog.filter((p) => p.id !== id)
    await savePortfolioData(data)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
