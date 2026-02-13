const CATEGORY_STYLES = {
  'technology': { emoji: '⚡', gradient: 'from-indigo-500 to-blue-500' },
  'design': { emoji: '🎨', gradient: 'from-pink-500 to-rose-500' },
  'ai-ml': { emoji: '🤖', gradient: 'from-emerald-500 to-teal-500' },
  'web-dev': { emoji: '🌐', gradient: 'from-amber-500 to-orange-500' },
  'culture': { emoji: '💡', gradient: 'from-violet-500 to-purple-500' },
  'tutorials': { emoji: '📚', gradient: 'from-cyan-500 to-sky-500' },
}

export default function CategoryBadge({ category, navigate, active = false }) {
  const style = CATEGORY_STYLES[category.slug] || { emoji: '📝', gradient: 'from-stone-500 to-stone-600' }

  return (
    <button
      onClick={() => navigate(`/category/${category.slug}`)}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
        ${active
          ? `bg-gradient-to-r ${style.gradient} text-white shadow-lg shadow-indigo-500/20`
          : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:shadow-sm'
        }
      `}
    >
      <span>{style.emoji}</span>
      <span>{category.name}</span>
    </button>
  )
}
