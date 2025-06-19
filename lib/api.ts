export interface Post {
  id: number
  userId?: number
  title: string
  body: string
  createdAt?: string
  updatedAt?: string
}

// Fetch all posts from your DB
export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`)
  if (!res.ok) {
    throw new Error('Failed to fetch DB posts')
  }
  return res.json()
}

// Fetch a single post
export async function fetchPost(id: string | number): Promise<Post | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://small09.vercel.app' 
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` || // for Vercel
    'http://localhost:3000' // fallback for dev

  const res = await fetch(`${baseUrl}/api/posts/${id}`)

  if (!res.ok) return null
  return res.json()
}

// Create a new post in your DB
export async function createPost(data: Omit<Post, 'id'>): Promise<Post> {
  const res = await fetch(`/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Failed to create post')
  }
  return res.json()
}

// Update a post
export async function updatePost(id: number, data: Partial<Post>): Promise<Post> {
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Failed to update post')
  }
  return res.json()
}

// Delete a post
export async function deletePost(id: number): Promise<{ message: string }> {
  const res = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody?.error || 'Failed to delete post')
  }

  return res.json()
}
