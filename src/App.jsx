import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import CategoryPage from './pages/CategoryPage'

function App() {
  const [route, setRoute] = useState({ page: 'home', params: {} })

  useEffect(() => {
    const handleNav = () => {
      const hash = window.location.hash.slice(1) || '/'
      if (hash.startsWith('/article/')) {
        setRoute({ page: 'article', params: { slug: hash.replace('/article/', '') } })
      } else if (hash.startsWith('/category/')) {
        setRoute({ page: 'category', params: { slug: hash.replace('/category/', '') } })
      } else {
        setRoute({ page: 'home', params: {} })
      }
    }
    handleNav()
    window.addEventListener('hashchange', handleNav)
    return () => window.removeEventListener('hashchange', handleNav)
  }, [])

  const navigate = (path) => {
    window.location.hash = path
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header navigate={navigate} />
      <main className="flex-1">
        {route.page === 'home' && <HomePage navigate={navigate} />}
        {route.page === 'article' && <ArticlePage slug={route.params.slug} navigate={navigate} />}
        {route.page === 'category' && <CategoryPage slug={route.params.slug} navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}

export default App
