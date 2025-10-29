import { useState, useEffect } from 'react'
import axios from 'axios'
import Scanner from './components/Scanner'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check backend connection
    const checkBackend = async () => {
      try {
        // Try to connect to backend using relative path
        await axios.get('/health', { timeout: 5000 })
        setIsLoading(false)
      } catch (err) {
        setError('Failed to connect to backend. Please try refreshing the page.')
        setIsLoading(false)
      }
    }

    checkBackend()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="bg-red-900 border border-red-700 text-white px-8 py-6 rounded-lg max-w-md">
          <h2 className="font-bold text-lg mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return <Scanner />
}

export default App
