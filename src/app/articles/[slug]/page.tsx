import { ArticleLayout } from '@/components/ArticleLayout'
import { getDocumentBySlug, getDocuments } from 'outstatic/server'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export default async function Index({ params }: { params: any }) {
  const { data, content } = await getPost(params)
  return <div>{data?.title}</div>
  // return <ArticleLayout article={post} />
}

async function getPost(params: any) {
  const postsDirectory = join(process.cwd(), `outstatic/content/posts`)
  const fullPath = join(postsDirectory, `${params?.slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // let article = getDocumentBySlug('posts', params?.slug, [
  //   'title',
  //   'publishedAt',
  //   'slug',
  //   'author',
  //   'content',
  //   'coverImage',
  //   'description'
  // ])
  return { 
    data, content
  }
}