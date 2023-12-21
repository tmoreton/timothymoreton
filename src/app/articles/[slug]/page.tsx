import { ArticleLayout } from '@/components/ArticleLayout'
import { getDocumentBySlug, getDocuments } from 'outstatic/server'

export default async function Index({ params }: { params: any }) {
  const post = await getPost(params)
  return <div>{post?.title}</div>
  return <ArticleLayout article={post} />
}

async function getPost(params: any) {
  let article = getDocumentBySlug('posts', params?.slug, [
    'title',
    'publishedAt',
    'slug',
    'author',
    'content',
    'coverImage',
    'description'
  ])
  console.log(article)
  return article
}