const CATEGORY_COLORS = {
  'Technology': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
  'Design': { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
  'AI & Machine Learning': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  'Web Development': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  'Culture': { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200' },
  'Tutorials': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
}

export default function ArticleCard({ article, navigate, variant = 'default' }) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  })
  const colors = CATEGORY_COLORS[article.category] || { bg: 'bg-stone-50', text: 'text-stone-600', border: 'border-stone-200' }

  if (variant === 'compact') {
    return (
      <article
        onClick={() => navigate(`/article/${article.slug}`)}
        className="group cursor-pointer flex gap-4 py-4 border-b border-stone-100 last:border-0"
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:opacity-90 transition-opacity"
        />
        <div className="flex-1 min-w-0">
          <span className={`tag-pill ${colors.bg} ${colors.text} border ${colors.border} mb-1.5`}>
            {article.category}
          </span>
          <h3 className="text-sm font-semibold text-stone-800 group-hover:text-indigo-500 transition-colors line-clamp-2 mt-1">
            {article.title}
          </h3>
          <p className="text-xs text-stone-400 mt-1">{date} · {article.readTime} min</p>
        </div>
      </article>
    )
  }

  return (
    <article
      onClick={() => navigate(`/article/${article.slug}`)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-100 card-hover"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`tag-pill ${colors.bg} ${colors.text} border ${colors.border} backdrop-blur-sm`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-lg font-bold text-stone-800 group-hover:text-indigo-500 transition-colors line-clamp-2 mb-2"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          {article.title}
        </h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-4 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={`https://i.pravatar.cc/32?u=${article.author}`}
              alt={article.author}
              className="w-7 h-7 rounded-full"
            />
            <span className="text-xs font-medium text-stone-600">{article.author}</span>
          </div>
          <span className="text-xs text-stone-400">{date} · {article.readTime} min</span>
        </div>
      </div>
    </article>
  )
}
