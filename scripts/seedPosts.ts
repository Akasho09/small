import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  for (const post of posts) {
    const exists = await prisma.post.findUnique({ where: { id: post.id } })
    if (!exists) {
      await prisma.post.create({
        data: {
          title: post.title,
          body: post.body,
        },
      })
    }
  }

  console.log('Posts seeded successfully')
  await prisma.$disconnect()
}

seedPosts().catch((err) => {
  console.error(err)
  prisma.$disconnect()
  process.exit(1)
})
