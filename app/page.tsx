'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export interface Post {
  id: number
  title: string
  body: string
  userId?: number
}

export default function HomePage() {
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">📢 Public Posts</h1>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Card key={idx} className="p-4">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-red-600 text-center text-lg">
          Error loading posts: {`${error}`}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">📢 Public Posts</h1>

      {posts.length === 0 && (
        <p className="text-gray-500 text-center text-lg">
          No posts available at the moment.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-blue-800 text-2xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-base line-clamp-3">
                  {post.body.replace(/<[^>]*>?/gm, '').slice(0, 200)}...
                </p>
                <span className="text-sm text-blue-600 mt-3 inline-block hover:underline">
                  Read more →
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
