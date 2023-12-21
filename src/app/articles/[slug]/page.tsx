import { ArticleLayout } from '@/components/ArticleLayout'
import { getDocumentBySlug, getDocuments } from 'outstatic/server'

export default async function Index({ params }: { params: any }) {
  const post = await getPost(params)
  return <ArticleLayout article={post} />
}

async function getPost(params: any) {
  console.log(params)
  // let articles = getDocuments('posts', ['title', 'slug', 'publishedAt', 'description', 'content', 'description', 'coverImage'])
  // let article = articles.find(a => a.slug === params.slug)
  let article = getDocumentBySlug('posts', params.slug, [
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