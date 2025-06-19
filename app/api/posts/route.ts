import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/posts - fetch all DB posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
        orderBy: {
    createdAt: 'desc',
  },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

// POST /api/posts - create a new post
export async function POST(req: Request) {
  try {
    const { title, body, userId } = await req.json()

    if (!title || !body) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        body,
        userId
      },
    })

    return NextResponse.json(newPost)
  } catch (error) {
    console.error('[POST_CREATE_ERROR]', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}