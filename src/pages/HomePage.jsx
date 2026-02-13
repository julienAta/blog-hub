import { useCollection } from '../hooks/useCollection'
import FeaturedArticle from '../components/FeaturedArticle'
import ArticleCard from '../components/ArticleCard'
import CategoryBadge from '../components/CategoryBadge'
import NewsletterBanner from '../components/NewsletterBanner'
import { ArticleCardSkeleton, FeaturedSkeleton } from '../components/Skeleton'

export default function HomePage({ navigate }) {
  const { items: articles, loading: loadingArticles } = useCollection('articles')
  const { items: categories, loading: loadingCategories } = useCollection('categories')

  // Sort articles by date, newest first
  const sorted = [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  const featured = sorted.find(a => a.featured)
  const regular = sorted.filter(a => a !== featured)
  const latest = regular.slice(0, 6)
  const sidebar = regular.slice(6)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero / Featured */}
      <section className="mb-12">
        {loadingArticles ? (
          <FeaturedSkeleton />
        ) : featured ? (
          <FeaturedArticle article={featured} navigate={navigate} />
        ) : null}
      </section>

      {/* Categories */}
      <section className="mb-10">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {loadingCategories ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-10 w-28 bg-stone-100 rounded-xl animate-pulse flex-shrink-0" />
            ))
          ) : (
            categories.map(cat => (
              <CategoryBadge key={cat.id} category={cat} navigate={navigate} />
            ))
          )}
        </div>
      </section>

      {/* Latest Articles Grid + Sidebar */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Latest Articles
          </h2>
          <div className="h-px flex-1 bg-stone-200 ml-6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {loadingArticles ? (
              Array(4).fill(0).map((_, i) => <ArticleCardSkeleton key={i} />)
            ) : (
              latest.map(article => (
                <ArticleCard key={article.id} article={article} navigate={navigate} />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Popular / More articles */}
              <div className="bg-stone-50 rounded-2xl p-5 mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-4">
                  More to Read
                </h3>
                {sidebar.length > 0 ? (
                  sidebar.map(article => (
                    <ArticleCard key={article.id} article={article} navigate={navigate} variant="compact" />
                  ))
                ) : (
                  <p className="text-sm text-stone-400">More articles coming soon...</p>
                )}
              </div>

              {/* Tags Cloud */}
              <div className="bg-white border border-stone-100 rounded-2xl p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['react', 'ai', 'css', 'rust', 'architecture', 'ux', 'career', 'tutorial', 'performance', 'ethics'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-500 hover:text-indigo-500 hover:border-indigo-200 cursor-pointer transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-12">
        <NewsletterBanner />
      </section>
    </div>
  )
}
