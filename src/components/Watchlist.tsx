import React from 'react';
import { Star, X } from 'lucide-react';

interface WatchlistProps {
  stocks: string[];
  onSelect: (symbol: string) => void;
  onRemove: (symbol: string) => void;
}

export default function Watchlist({ stocks, onSelect, onRemove }: WatchlistProps) {
  if (!stocks.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>Your watchlist is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {stocks.map((symbol) => (
        <div
          key={symbol}
          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
        >
          <button
            onClick={() => onSelect(symbol)}
            className="font-medium text-gray-900 hover:text-blue-600"
          >
            {symbol}
          </button>
          <button
            onClick={() => onRemove(symbol)}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Remove from watchlist"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  );
}