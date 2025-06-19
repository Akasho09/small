'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { fetchPosts, deletePost } from '@/lib/api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Define the Post type
type Post = {
  id: number
  title: string
  body: string
}

export default function AdminPage() {
  const queryClient = useQueryClient()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const {
    data: posts = [],
    isLoading,
  } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  const deleteMutation = useMutation<{ message: string }, Error, number>({
  mutationFn: deletePost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
    setErrorMsg(null)
    setDeletingId(null)
  },
  onError: (error) => {
    setErrorMsg(error.message || 'Failed to delete post')
    setDeletingId(null)
  },
})

  const handleDelete = (id: number) => {
    setDeletingId(id)
    deleteMutation.mutate(id)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">🛠 Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/create-post">+ New Post</Link>
        </Button>
      </div>

      {errorMsg && (
        <div className="p-3 text-red-700 bg-red-100 border border-red-300 rounded">
          {errorMsg}
        </div>
      )}

      <div className="grid gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="space-y-3 p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex justify-end space-x-2 pt-2">
                  <Skeleton className="h-8 w-20 rounded" />
                  <Skeleton className="h-8 w-20 rounded" />
                </div>
              </Card>
            ))
          : posts.slice(0, 100).map((post) => (
              <Card
                key={post.id}
                className="transition-shadow hover:shadow-md border border-gray-200"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm line-clamp-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.body,
                    }}
                  />
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/posts/${post.id}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/edit-post/${post.id}`}>Edit</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                  >
                    {deletingId === post.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  )
}
