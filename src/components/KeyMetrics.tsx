import React from 'react';
import { Target, Percent, TrendingUp } from 'lucide-react';
import type { StockData } from '../types/stock';

interface KeyMetricsProps {
  data: StockData | null;
  isLoading: boolean;
}

export default function KeyMetrics({ data, isLoading }: KeyMetricsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse h-24 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Target className="h-5 w-5" />
          <span className="text-sm font-medium">P/E Ratio</span>
        </div>
        <div className="text-xl font-bold">{data.pe.toFixed(2)}</div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Percent className="h-5 w-5" />
          <span className="text-sm font-medium">EPS</span>
        </div>
        <div className="text-xl font-bold">${data.eps.toFixed(2)}</div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <TrendingUp className="h-5 w-5" />
          <span className="text-sm font-medium">52W Range</span>
        </div>
        <div className="text-xl font-bold">
          ${data.low52.toFixed(2)} - ${data.high52.toFixed(2)}
        </div>
      </div>
    </div>
  );
}