const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const USE_REAL_API = process.env.USE_REAL_API === 'true';

app.use(cors());
app.use(express.json());

console.log('Backend server running on http://localhost:' + PORT);
console.log('Using ' + (USE_REAL_API ? 'REAL APIs' : 'MOCK DATA'));

// Mock data for fallback/testing
const mockKalshiMarkets = [
  { market_id: 'k1', title: 'Will Trump win 2024', category: 'politics', last_price: 0.65, volume_24h: 150000, status: 'active' },
  { market_id: 'k2', title: 'Will Bitcoin reach 100k', category: 'crypto', last_price: 0.72, volume_24h: 200000, status: 'active' },
  { market_id: 'k3', title: 'Will Fed cut rates next month', category: 'economy', last_price: 0.45, volume_24h: 180000, status: 'active' },
  { market_id: 'k4', title: 'Will Apple stock rise 10%', category: 'stocks', last_price: 0.58, volume_24h: 120000, status: 'active' },
];

const mockPolymarketMarkets = [
  { market_id: 'p1', title: 'Will Trump win 2024', category: 'politics', last_price: 0.62, volume_24h: 180000, status: 'active' },
  { market_id: 'p2', title: 'Will Bitcoin reach 100k', category: 'crypto', last_price: 0.75, volume_24h: 220000, status: 'active' },
  { market_id: 'p3', title: 'Will Fed cut rates next month', category: 'economy', last_price: 0.48, volume_24h: 160000, status: 'active' },
  { market_id: 'p4', title: 'Will Apple stock rise 10%', category: 'stocks', last_price: 0.59, volume_24h: 140000, status: 'active' },
];

// Kalshi API - Using public endpoint (no auth required for reading)
async function getKalshiMarkets() {
  if (!USE_REAL_API) {
    return mockKalshiMarkets;
  }

  try {
    console.log('Fetching Kalshi markets...');
    const response = await axios.get('https://api.kalshi.com/trade-api/v2/markets', {
      params: {
        status: 'active',
        limit: 50,
      },
      timeout: 15000,
    });

    console.log('Kalshi response received, processing...');
    const markets = response.data.markets || response.data || [];

    return markets.slice(0, 50).map((market) => ({
      market_id: market.market_id || market.id,
      title: market.title || market.question || '',
      category: market.category || market.event_ticker || 'unknown',
      last_price: parseFloat(market.last_price || market.last_traded_price || 0.5),
      volume_24h: parseFloat(market.volume_24h || market.volume || 0),
      status: market.status || 'active',
    })).filter(m => m.title);
  } catch (error) {
    console.error('Error fetching Kalshi markets:', error.message);
    console.error('Falling back to mock data...');
    return mockKalshiMarkets;
  }
}

// Polymarket API - Using GAMMA API (data endpoint, no auth required)
async function getPolymarketMarkets() {
  if (!USE_REAL_API) {
    return mockPolymarketMarkets;
  }

  try {
    console.log('Fetching Polymarket markets...');

    // Try GAMMA API first (recommended for reading)
    try {
      const response = await axios.get('https://gamma-api.polymarket.com/markets', {
        params: {
          limit: 100,
          order: 'volume24hDesc',
        },
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Arbitrage-Scanner/1.0',
        },
      });

      console.log('Polymarket response received, processing...');
      const markets = response.data || [];

      return markets.slice(0, 50).map((market) => ({
        market_id: market.id || market.market_id || '',
        title: market.question || market.title || '',
        category: market.category || 'unknown',
        last_price: parseFloat(market.lastPrice || market.last_price || 0.5),
        volume_24h: parseFloat(market.volume24h || market.volume || 0),
        status: market.status || 'active',
      })).filter(m => m.title && m.market_id);
    } catch (gammaError) {
      console.log('GAMMA API failed, trying CLOB API...');

      // Fallback to CLOB API
      const response = await axios.get('https://clob.polymarket.com/markets', {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Arbitrage-Scanner/1.0',
        },
      });

      const markets = response.data || [];
      return markets.slice(0, 50).map((market) => ({
        market_id: market.market_id || market.id || '',
        title: market.question || market.title || '',
        category: market.category || 'unknown',
        last_price: parseFloat(market.price || market.last_price || 0.5),
        volume_24h: parseFloat(market.volume24h || 0),
        status: market.status || 'active',
      })).filter(m => m.title && m.market_id);
    }
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error.message);
    console.error('Falling back to mock data...');
    return mockPolymarketMarkets;
  }
}

function findArbitrageOpportunities(kalshiMarkets, polymarketMarkets) {
  const opportunities = [];

  for (const kalshi of kalshiMarkets) {
    for (const poly of polymarketMarkets) {
      const kalshiTitle = (kalshi.title || '').toLowerCase().trim();
      const polyTitle = (poly.title || '').toLowerCase().trim();

      // Smart matching: exact match or similar keywords
      const isSameMarket = kalshiTitle === polyTitle ||
                          (kalshiTitle.length > 10 &&
                           polyTitle.includes(kalshiTitle.substring(0, 15)));

      if (isSameMarket && kalshiTitle.length > 5) {
        const kalshiPrice = kalshi.last_price || 0;
        const polyPrice = poly.last_price || 0;

        if (kalshiPrice > 0 && polyPrice > 0) {
          const spread = Math.abs(kalshiPrice - polyPrice);
          const spreadPercent = (spread / Math.max(kalshiPrice, polyPrice)) * 100;

          if (spreadPercent > 0.5) { // Show spreads > 0.5%
            opportunities.push({
              category: kalshi.category || 'unknown',
              title: kalshi.title || poly.title,
              kalshi: {
                price: kalshiPrice,
                volume: kalshi.volume_24h || 0,
                market: kalshi.market_id,
              },
              polymarket: {
                price: polyPrice,
                volume: poly.volume_24h || 0,
                market: poly.market_id,
              },
              spread,
              spreadPercent: spreadPercent.toFixed(2),
              buyOn: kalshiPrice < polyPrice ? 'kalshi' : 'polymarket',
              sellOn: kalshiPrice < polyPrice ? 'polymarket' : 'kalshi',
            });
          }
        }
      }
    }
  }

  return opportunities.sort((a, b) => parseFloat(b.spreadPercent) - parseFloat(a.spreadPercent));
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', usingRealApi: USE_REAL_API });
});

app.get('/api/markets', async (req, res) => {
  try {
    const [kalshiMarkets, polymarketMarkets] = await Promise.all([
      getKalshiMarkets(),
      getPolymarketMarkets(),
    ]);

    res.json({
      kalshi: kalshiMarkets,
      polymarket: polymarketMarkets,
      timestamp: new Date().toISOString(),
      usingRealApi: USE_REAL_API,
    });
  } catch (error) {
    console.error('Error fetching markets:', error);
    res.status(500).json({ error: 'Failed to fetch markets' });
  }
});

app.get('/api/comparison', async (req, res) => {
  try {
    const [kalshiMarkets, polymarketMarkets] = await Promise.all([
      getKalshiMarkets(),
      getPolymarketMarkets(),
    ]);

    const comparison = findArbitrageOpportunities(kalshiMarkets, polymarketMarkets);

    res.json({
      opportunities: comparison,
      timestamp: new Date().toISOString(),
      usingRealApi: USE_REAL_API,
    });
  } catch (error) {
    console.error('Error comparing markets:', error);
    res.status(500).json({ error: 'Failed to compare markets' });
  }
});

app.listen(PORT, () => {
  console.log('✓ Backend ready on http://localhost:' + PORT);
});
