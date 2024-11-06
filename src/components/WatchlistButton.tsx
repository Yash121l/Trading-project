import React from 'react';
import { Star } from 'lucide-react';

interface WatchlistButtonProps {
  symbol: string;
  isWatched: boolean;
  onToggle: (symbol: string) => void;
}

export default function WatchlistButton({ symbol, isWatched, onToggle }: WatchlistButtonProps) {
  return (
    <button
      onClick={() => onToggle(symbol)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
        isWatched
          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Star
        className={`h-5 w-5 ${isWatched ? 'fill-yellow-500 text-yellow-500' : ''}`}
      />
      <span>{isWatched ? 'Watched' : 'Add to Watchlist'}</span>
    </button>
  );
}