# Kalshi-Polymarket Arbitrage Scanner

A web application that scans Kalshi and Polymarket for arbitrage opportunities by comparing prices across both platforms in real-time.

## Features

- **Real-time Price Scanning**: Fetches current prices from both Kalshi and Polymarket APIs
- **Arbitrage Detection**: Identifies price discrepancies between platforms
- **Auto-refresh**: Automatically refreshes data every 10 seconds
- **Spread Analysis**: Shows buy/sell recommendations and spread percentages
- **Beautiful UI**: Clean, responsive dashboard built with React and Tailwind CSS

## Tech Stack

**Backend:**
- Node.js + Express
- TypeScript
- Axios for API calls

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Vite

## Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```bash
cd kalshi-poly-scanner
npm install
npm install --prefix frontend
```

### Running the Application

#### Development Mode (both backend and frontend)

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:5173`

#### Running Separately

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

#### Production Build

```bash
npm run build
```

## How It Works

1. **Backend** fetches market data from Kalshi and Polymarket APIs
2. **Market Matching** compares markets with similar titles
3. **Spread Calculation** identifies price discrepancies
4. **Frontend** displays opportunities sorted by spread percentage

## API Endpoints

- `GET /health` - Health check
- `GET /api/markets` - Get all markets from both platforms
- `GET /api/comparison` - Get arbitrage opportunities

## Market Data Flow

```
Kalshi API (v2) ──┐
                  ├→ Backend (Node.js) ──→ Frontend (React)
Polymarket API ──┘
```

## Current Limitations

- Market matching is basic (keyword-based)
- No order execution functionality yet
- Does not account for trading fees or gas costs
- No persistent data storage

## Next Steps

To extend this scanner:

1. **Improve market matching**: Use NLP or more sophisticated string matching
2. **Add order execution**: Integrate Kalshi and Polymarket APIs for placing trades
3. **Add filters**: Filter by category, minimum spread, minimum volume
4. **Webhook notifications**: Alert on profitable opportunities
5. **Historical data**: Track spreads over time
6. **Fee calculation**: Account for trading fees and slippage

## Environment Variables

```
PORT=5000              # Backend port
NODE_ENV=development   # Environment (development/production)
```

## Disclaimer

This is an experimental tool for educational purposes. Use at your own risk. Ensure you have proper authorization and understanding of the risks involved in algorithmic trading before using this in production.
