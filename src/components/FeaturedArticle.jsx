export default function FeaturedArticle({ article, navigate }) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <article
      onClick={() => navigate(`/article/${article.slug}`)}
      className="group cursor-pointer relative overflow-hidden rounded-2xl bg-stone-900 text-white"
    >
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 md:h-[420px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-transparent to-transparent md:hidden" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="tag-pill bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {article.category}
            </span>
            <span className="tag-pill bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ★ Featured
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-indigo-300 transition-colors leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {article.title}
          </h2>

          <p className="text-stone-300 text-base leading-relaxed mb-6 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4">
            <img
              src={article.authorAvatar || `https://i.pravatar.cc/40?u=${article.author}`}
              alt={article.author}
              className="w-10 h-10 rounded-full ring-2 ring-stone-700"
            />
            <div>
              <p className="text-sm font-medium text-white">{article.author}</p>
              <p className="text-xs text-stone-400">{date} · {article.readTime} min read</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
