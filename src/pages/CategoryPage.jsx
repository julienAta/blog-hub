import { useCollection } from '../hooks/useCollection'
import ArticleCard from '../components/ArticleCard'
import CategoryBadge from '../components/CategoryBadge'
import { ArticleCardSkeleton } from '../components/Skeleton'

const CATEGORY_MAP = {
  'technology': 'Technology',
  'design': 'Design',
  'ai-ml': 'AI & Machine Learning',
  'web-dev': 'Web Development',
  'culture': 'Culture',
  'tutorials': 'Tutorials',
}

const CATEGORY_DESCRIPTIONS = {
  'technology': 'Exploring the cutting edge of software, hardware, and digital innovation.',
  'design': 'UI/UX, visual design, accessibility, and the creative process.',
  'ai-ml': 'Artificial intelligence, machine learning, and what comes next.',
  'web-dev': 'Frontend, backend, DevOps, and the craft of building for the web.',
  'culture': 'The human side of tech — careers, remote work, and digital life.',
  'tutorials': 'Hands-on guides, step-by-step tutorials, and practical how-tos.',
}

const CATEGORY_EMOJIS = {
  'technology': '⚡',
  'design': '🎨',
  'ai-ml': '🤖',
  'web-dev': '🌐',
  'culture': '💡',
  'tutorials': '📚',
}

export default function CategoryPage({ slug, navigate }) {
  const { items: articles, loading: loadingArticles } = useCollection('articles')
  const { items: categories, loading: loadingCategories } = useCollection('categories')

  const categoryName = CATEGORY_MAP[slug] || slug
  const categoryArticles = articles
    .filter(a => a.category === categoryName)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Category Header */}
      <div className="mb-10">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-indigo-500 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All articles
        </button>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{CATEGORY_EMOJIS[slug] || '📝'}</span>
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            {categoryName}
          </h1>
        </div>
        <p className="text-stone-500 text-lg max-w-2xl">
          {CATEGORY_DESCRIPTIONS[slug] || 'Browse articles in this category.'}
        </p>
        <p className="text-sm text-stone-400 mt-2">
          {categoryArticles.length} article{categoryArticles.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 mb-10 scrollbar-hide">
        {!loadingCategories && categories.map(cat => (
          <CategoryBadge
            key={cat.id}
            category={cat}
            navigate={navigate}
            active={cat.slug === slug}
          />
        ))}
      </div>

      {/* Articles Grid */}
      {loadingArticles ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => <ArticleCardSkeleton key={i} />)}
        </div>
      ) : categoryArticles.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map(article => (
            <ArticleCard key={article.id} article={article} navigate={navigate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-bold text-stone-700 mb-2">No articles yet</h2>
          <p className="text-stone-500 mb-6">We're working on content for this category. Check back soon!</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
          >
            Browse all articles
          </button>
        </div>
      )}
    </div>
  )
}
