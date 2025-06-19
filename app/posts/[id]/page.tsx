'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchPost } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export interface Post {
  id: number
  userId?: number
  title: string
  body: string
  createdAt?: string
  updatedAt?: string
}

export default function PostDetails() {
  const params = useParams()
  const id = params?.id as string

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPost(id)
        setPost(data)
      } catch (error) {
        console.error(`Failed to fetch post with id ${id}:`, error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadPost()
    }
  }, [id])

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Button asChild variant="link" className="px-0 text-blue-600 text-sm">
        <Link href="/">← Back to posts</Link>
      </Button>

      <Card>
        <CardHeader>
          {loading ? (
            <>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </>
          ) : (
            <>
              <CardTitle className="text-3xl text-gray-900">{post?.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                By <span className="font-medium">Akash</span> •{' '}
                {formatDate(post?.createdAt ?? new Date().toISOString())}
              </p>
            </>
          )}
        </CardHeader>
        <Separator />
        <CardContent className="prose prose-lg max-w-none pt-4">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: post!.body }} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
