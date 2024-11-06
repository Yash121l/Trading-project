import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Activity } from 'lucide-react';

interface StockInfoProps {
  stockData: {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    marketCap: number;
  } | null;
  isLoading: boolean;
}

export default function StockInfo({ stockData, isLoading }: StockInfoProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse h-32 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (!stockData) return null;

  const isPositive = stockData.change >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <DollarSign className="h-5 w-5" />
          <span className="text-sm font-medium">Current Price</span>
        </div>
        <div className="text-2xl font-bold">${stockData.price.toFixed(2)}</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500" />
          )}
          <span className="text-sm font-medium">Change</span>
        </div>
        <div className={`text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Activity className="h-5 w-5" />
          <span className="text-sm font-medium">Volume</span>
        </div>
        <div className="text-2xl font-bold">
          {(stockData.volume / 1000000).toFixed(2)}M
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <BarChart2 className="h-5 w-5" />
          <span className="text-sm font-medium">Market Cap</span>
        </div>
        <div className="text-2xl font-bold">
          ${(stockData.marketCap / 1000000000).toFixed(2)}B
        </div>
      </div>
    </div>
  );
}