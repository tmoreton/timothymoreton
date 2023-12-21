import { ArticleLayout } from '@/components/ArticleLayout'
import { getDocumentBySlug } from 'outstatic/server'

export default async function Index({ params }: { params: any }) {
  const post = await getPost(params)
  return <ArticleLayout article={post} />
}

async function getPost(params: any) {
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