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

interface Props {
  opportunities: Opportunity[]
}

export default function MarketGrid({ opportunities }: Props) {
  const sortedBySpread = [...opportunities].sort(
    (a, b) => parseFloat(b.spreadPercent) - parseFloat(a.spreadPercent)
  )

  return (
    <div className="space-y-4">
      {sortedBySpread.map((opp, idx) => (
        <div
          key={idx}
          className="bg-slate-700 border border-slate-600 rounded-lg p-6 hover:border-slate-500 transition"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold mb-1">{opp.title}</h3>
              <p className="text-sm text-slate-400">{opp.category}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">{opp.spreadPercent}%</div>
              <div className="text-sm text-slate-400">spread</div>
            </div>
          </div>

          {/* Price Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Kalshi */}
            <div className={`p-4 rounded-lg border-2 ${
              opp.buyOn === 'kalshi' ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-slate-600 bg-slate-800'
            }`}>
              <p className="text-slate-400 text-sm mb-2">Kalshi</p>
              <p className="text-2xl font-bold mb-1">${opp.kalshi.price.toFixed(4)}</p>
              <p className="text-xs text-slate-400">Vol: ${(opp.kalshi.volume / 1000).toFixed(1)}k</p>
              {opp.buyOn === 'kalshi' && <p className="text-xs text-green-400 mt-2">← BUY HERE</p>}
            </div>

            {/* Spread Info */}
            <div className="p-4 rounded-lg border-2 border-amber-600 bg-amber-900 bg-opacity-20 flex flex-col justify-center">
              <p className="text-amber-400 text-sm mb-2">Arbitrage</p>
              <p className="text-xl font-bold">Δ ${opp.spread.toFixed(4)}</p>
              <p className="text-xs text-amber-400 mt-2">
                Buy {opp.buyOn === 'kalshi' ? 'Kalshi' : 'Polymarket'}, Sell{' '}
                {opp.sellOn === 'kalshi' ? 'Kalshi' : 'Polymarket'}
              </p>
            </div>

            {/* Polymarket */}
            <div className={`p-4 rounded-lg border-2 ${
              opp.buyOn === 'polymarket' ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-slate-600 bg-slate-800'
            }`}>
              <p className="text-slate-400 text-sm mb-2">Polymarket</p>
              <p className="text-2xl font-bold mb-1">${opp.polymarket.price.toFixed(4)}</p>
              <p className="text-xs text-slate-400">Vol: ${(opp.polymarket.volume / 1000).toFixed(1)}k</p>
              {opp.buyOn === 'polymarket' && <p className="text-xs text-green-400 mt-2">← BUY HERE</p>}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2 text-xs text-slate-400">
            <span>Kalshi ID: {opp.kalshi.market}</span>
            <span>•</span>
            <span>Poly ID: {opp.polymarket.market}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
