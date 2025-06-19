'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createPost } from '@/lib/api'
import { TextEditor } from '@/components/TextEditor'

// Define Post type
interface Post {
  id: number
  userId? : number
  title: string
  body: string
  createdAt?: string
  updatedAt?: string
}

// Payload for creating a post
interface CreatePostInput {
  title: string
  body: string
}

export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const qc = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<Post, Error, CreatePostInput>({
    mutationFn: createPost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] })
      router.push('/')
    },
  })

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Post</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextEditor 
          content={body}
          onChange={setBody}
          placeholder="Start typing here..."
          characterLimit={5000}
        />
      <button
        onClick={() => mutation.mutate({ title, body })}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={mutation.isPending} // ✅ React Query v5
      >
        {mutation.isPending ? 'Saving...' : 'Save'}
      </button>

      {mutation.isError && (
        <p className="text-red-500">Error: {mutation.error?.message}</p>
      )}
    </div>
  )
}

