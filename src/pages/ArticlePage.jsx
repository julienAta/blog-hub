import { useCollection } from '../hooks/useCollection'
import ArticleCard from '../components/ArticleCard'
import NewsletterBanner from '../components/NewsletterBanner'

function renderContent(content) {
  if (!content) return null

  // Simple markdown-like rendering
  const lines = content.split('\n')
  const elements = []
  let inCodeBlock = false
  let codeContent = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(<pre key={i}><code>{codeContent.trim()}</code></pre>)
        codeContent = ''
        inCodeBlock = false
      } else {
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeContent += line + '\n'
      continue
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-lg font-semibold mt-6 mb-2">{line.slice(4)}</h3>)
    } else if (line.trim() === '') {
      continue
    } else {
      // Handle bold text
      const parts = line.split(/(\*\*.*?\*\*)/)
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j}>{part.slice(2, -2)}</strong>
        }
        return part
      })
      if (line.startsWith('- ')) {
        elements.push(<li key={i}>{rendered.map((r, idx) => typeof r === 'string' ? r.replace(/^- /, '') : r)}</li>)
      } else if (/^\d+\./.test(line)) {
        elements.push(<li key={i}>{rendered.map((r, idx) => typeof r === 'string' ? r.replace(/^\d+\.\s*/, '') : r)}</li>)
      } else {
        elements.push(<p key={i}>{rendered}</p>)
      }
    }
  }

  return elements
}

export default function ArticlePage({ slug, navigate }) {
  const { items: articles, loading } = useCollection('articles')

  const article = articles.find(a => a.slug === slug)
  const relatedArticles = articles
    .filter(a => a.slug !== slug && a.category === article?.category)
    .slice(0, 3)

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-stone-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-stone-100 rounded w-1/2 mb-8" />
          <div className="h-80 bg-stone-200 rounded-2xl mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-stone-100 rounded w-full" />
            <div className="h-4 bg-stone-100 rounded w-full" />
            <div className="h-4 bg-stone-100 rounded w-5/6" />
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Article not found
        </h1>
        <p className="text-stone-500 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    )
  }

  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <div>
      {/* Article Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-indigo-500 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to articles
        </button>

        <div className="flex items-center gap-3 mb-4">
          <a
            href={`#/category/${article.category?.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
            className="tag-pill bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            {article.category}
          </a>
          <span className="text-sm text-stone-400">{article.readTime} min read</span>
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          {article.title}
        </h1>

        <p className="text-lg text-stone-500 mb-8 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author + Date */}
        <div className="flex items-center gap-4 pb-8 border-b border-stone-200">
          <img
            src={`https://i.pravatar.cc/48?u=${article.author}`}
            alt={article.author}
            className="w-12 h-12 rounded-full ring-2 ring-stone-100"
          />
          <div>
            <p className="font-medium text-stone-800">{article.author}</p>
            <p className="text-sm text-stone-400">{date}</p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl"
        />
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="prose max-w-none">
          {renderContent(article.content)}
        </div>

        {/* Tags */}
        {article.tags && (
          <div className="mt-10 pt-8 border-t border-stone-200">
            <div className="flex flex-wrap gap-2">
              {(typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags).map(tag => (
                <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-500 rounded-lg text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-8 pt-8 border-t border-stone-200 flex items-center justify-between">
          <span className="text-sm font-medium text-stone-500">Share this article</span>
          <div className="flex gap-3">
            <button className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors text-stone-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </button>
            <button className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors text-stone-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </button>
            <button className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors text-stone-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map(a => (
              <ArticleCard key={a.id} article={a} navigate={navigate} />
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-16">
        <NewsletterBanner />
      </div>
    </div>
  )
}
