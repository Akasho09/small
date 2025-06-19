'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, updatePost } from '@/lib/api'
import { TextEditor } from '@/components/TextEditor'

// Define the Post type
interface Post {
  id: number
  userId? : number
  title: string
  body: string
  createdAt?: string
  updatedAt?: string
}

export default function EditPostPage() {
  const { id } = useParams()
  const postId = Number(id)

  const router = useRouter()
  const qc = useQueryClient()

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  const post = posts?.find((p) => p.id === postId)

  const [title, setTitle] = useState(post?.title ?? '')
  const [body, setBody] = useState(post?.body ?? '')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
    }
  }, [post])

  const mutation = useMutation<Post, Error, { id: number; title: string; body: string }>({
    mutationFn: ({ id, title, body }) => updatePost(id, { title, body }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] })
      router.push('/')
    },
  })

  if (isLoading) return <p>Loading post...</p>
  if (!post) return <p>Post not found.</p>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Post</h1>

      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
      />

      <TextEditor 
          content={body}
          onChange={setBody}
          placeholder="Start typing here..."
          characterLimit={5000}
        />
      <button
        onClick={() => mutation.mutate({ id: postId, title, body })}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Updating...' : 'Update'}
      </button>

      {mutation.isError && (
        <p className="text-red-500">Error: {mutation.error?.message}</p>
      )}
    </div>
  )
}
