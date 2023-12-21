import { ArticleLayout } from '@/components/ArticleLayout'
import { getDocumentBySlug, getDocuments } from 'outstatic/server'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export default async function Index({ params }: { params: any }) {
  const { data, content } = await getPost(params)
  return <ArticleLayout data={data} content={content} />
}

async function getPost(params: any) {
  const postsDirectory = join(process.cwd(), `outstatic/content/posts`)
  const fullPath = join(postsDirectory, `${params?.slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // let { data, content } = matter(fileContents)
  let contents = matter(fileContents)
  let test = await remark().use(html, { sanitize: false }).process(contents.content)
  let content = test.toString()
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
    data: contents.data, 
    content
  }
}