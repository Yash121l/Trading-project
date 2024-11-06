import React, { useState, useEffect } from 'react';
import { LineChart, Newspaper, Star } from 'lucide-react';
import SearchBar from './components/SearchBar';
import StockChart from './components/StockChart';
import StockInfo from './components/StockInfo';
import NewsSection from './components/NewsSection';
import CompanyOverview from './components/CompanyOverview';
import KeyMetrics from './components/KeyMetrics';
import WatchlistButton from './components/WatchlistButton';
import Watchlist from './components/Watchlist';
import { getStockData, getChartData, getCompanyInfo, getNewsData } from './services/stockApi';
import type { StockData, CompanyInfo, NewsItem, ChartData } from './types/stock';

function App() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleSearch = async (symbol: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const [stock, chart, company, newsData] = await Promise.all([
        getStockData(symbol),
        getChartData(symbol),
        getCompanyInfo(symbol),
        getNewsData(symbol)
      ]);

      setStockData(stock);
      setChartData(chart);
      setCompanyInfo(company);
      setNews(newsData);
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LineChart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">StockVision</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-8">
              <div className="flex justify-center">
                <SearchBar onSearch={handleSearch} />
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl">
                  {error}
                </div>
              )}

              {(stockData || isLoading) && (
                <>
                  <div className="flex justify-between items-start">
                    <StockInfo stockData={stockData} isLoading={isLoading} />
                    {stockData && (
                      <WatchlistButton
                        symbol={stockData.symbol}
                        isWatched={watchlist.includes(stockData.symbol)}
                        onToggle={toggleWatchlist}
                      />
                    )}
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-6">Price History</h2>
                    <StockChart data={chartData} isLoading={isLoading} />
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-6">Key Metrics</h2>
                    <KeyMetrics data={stockData} isLoading={isLoading} />
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-6">Company Overview</h2>
                    <CompanyOverview info={companyInfo} isLoading={isLoading} />
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Newspaper className="h-6 w-6 text-gray-600" />
                      <h2 className="text-xl font-semibold">Latest News</h2>
                    </div>
                    <NewsSection news={news} isLoading={isLoading} />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Watchlist</h2>
              </div>
              <Watchlist
                stocks={watchlist}
                onSelect={handleSearch}
                onRemove={(symbol) => toggleWatchlist(symbol)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;