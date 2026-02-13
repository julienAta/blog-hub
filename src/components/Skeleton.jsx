export function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 animate-pulse">
      <div className="h-48 bg-stone-200" />
      <div className="p-5">
        <div className="h-5 bg-stone-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-stone-100 rounded w-full mb-2" />
        <div className="h-4 bg-stone-100 rounded w-2/3 mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-stone-200" />
            <div className="h-3 bg-stone-200 rounded w-20" />
          </div>
          <div className="h-3 bg-stone-100 rounded w-16" />
        </div>
      </div>
    </div>
  )
}

export function FeaturedSkeleton() {
  return (
    <div className="rounded-2xl bg-stone-200 animate-pulse h-[420px]" />
  )
}
