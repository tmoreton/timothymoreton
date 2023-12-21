import { ArticleLayout } from '@/components/ArticleLayout'
import { getDocumentBySlug } from 'outstatic/server'

export default async function Index({ params }: { params: any }) {
  const post = await getPost(params)
  console.log(post)
  return <ArticleLayout article={post} />
}

async function getPost(params: any) {
  console.log(params)
  return getDocumentBySlug('posts', params.slug, [
    'title',
    'publishedAt',
    'slug',
    'author',
    'content',
    'coverImage',
    'description'
  ])
}