import { useState } from 'react'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 p-8 md:p-12 text-white">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-sm mb-4">
          <span>✉️</span>
          <span>Weekly Newsletter</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Stay in the loop
        </h2>
        <p className="text-indigo-100 mb-6">
          Get the best articles, tutorials, and insights delivered straight to your inbox. No spam, unsubscribe anytime.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 bg-white/15 rounded-xl p-4">
            <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">You're in! Check your inbox for confirmation.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/30"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
