import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Utility to safely extract post ID from URL
function getPostIdFromUrl(req: Request): number | null {
  const url = new URL(req.url)
  const idParam = url.pathname.split('/').pop()
  const id = parseInt(idParam || '', 10)
  return isNaN(id) ? null : id
}

// GET /api/posts/[id]
export async function GET(req: Request) {
  const id = getPostIdFromUrl(req)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  try {
    const post = await prisma.post.findUnique({ where: { id } })
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    console.error('GET /api/posts/[id] error:', error)
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 })
  }
}

// PUT /api/posts/[id]
export async function PUT(req: Request) {
  const id = getPostIdFromUrl(req)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  try {
    const { title, body } = await req.json()

    const post = await prisma.post.upsert({
      where: { id },
      update: { title, body },
      create: { id, title, body },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('PUT /api/posts/[id] error:', error)
    return NextResponse.json({ error: 'Error updating or creating post' }, { status: 500 })
  }
}

// DELETE /api/posts/[id]
export async function DELETE(req: Request) {
  const id = getPostIdFromUrl(req)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  try {
    const existing = await prisma.post.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Cannot delete post: not found in DB' }, { status: 404 })
    }

    await prisma.post.delete({ where: { id } })
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('DELETE /api/posts/[id] error:', error)
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 })
  }
}
