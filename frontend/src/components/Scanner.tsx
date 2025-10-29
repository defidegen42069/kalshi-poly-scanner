import { useState, useEffect } from 'react'
import axios from 'axios'
import MarketGrid from './MarketGrid'

interface Opportunity {
  category: string
  title: string
  kalshi: {
    price: number
    volume: number
    market: string
  }
  polymarket: {
    price: number
    volume: number
    market: string
  }
  spread: number
  spreadPercent: string
  buyOn: 'kalshi' | 'polymarket'
  sellOn: 'kalshi' | 'polymarket'
}

export default function Scanner() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOpportunities = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get('/api/comparison', { timeout: 15000 })
      setOpportunities(response.data.opportunities || [])
      setLastUpdate(new Date())
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch opportunities'
      setError(errorMsg)
      console.error('Error fetching opportunities:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchOpportunities()

    // Set up auto-refresh
    let interval: NodeJS.Timeout | null = null
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchOpportunities()
      }, 10000) // Refresh every 10 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Arbitrage Scanner</h1>
          <p className="text-slate-400">Kalshi ↔ Polymarket Price Comparison</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={fetchOpportunities}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-6 py-2 rounded-lg font-medium transition"
          >
            {isLoading ? 'Scanning...' : 'Scan Now'}
          </button>

          <label className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-600 transition">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Auto-refresh (10s)</span>
          </label>

          {lastUpdate && (
            <div className="bg-slate-700 px-4 py-2 rounded-lg text-sm text-slate-300">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Status */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {opportunities.length === 0 && !isLoading && (
          <div className="bg-slate-700 border border-slate-600 text-slate-300 px-4 py-6 rounded-lg text-center">
            <p className="mb-2">No arbitrage opportunities found at the moment.</p>
            <p className="text-sm">Market prices are synchronized across platforms.</p>
          </div>
        )}

        {/* Opportunities Grid */}
        {opportunities.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Found {opportunities.length} Opportunity{opportunities.length !== 1 ? 'ies' : ''}
            </h2>
            <MarketGrid opportunities={opportunities} />
          </div>
        )}

        {/* Stats */}
        {opportunities.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Total Opportunities</p>
              <p className="text-3xl font-bold">{opportunities.length}</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Average Spread</p>
              <p className="text-3xl font-bold">
                {(
                  opportunities.reduce((sum, opp) => sum + parseFloat(opp.spreadPercent), 0) /
                  opportunities.length
                ).toFixed(2)}
                %
              </p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Best Spread</p>
              <p className="text-3xl font-bold">
                {Math.max(...opportunities.map((opp) => parseFloat(opp.spreadPercent))).toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
