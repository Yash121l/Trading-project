import React from 'react';
import { ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

interface NewsSectionProps {
  news: NewsItem[];
  isLoading: boolean;
}

export default function NewsSection({ news, isLoading }: NewsSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse h-24 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{item.source}</span>
                <span>•</span>
                <span>{new Date(item.pubDate).toLocaleDateString()}</span>
              </div>
            </div>
            <ExternalLink className="h-5 w-5 text-gray-400 flex-shrink-0" />
          </div>
        </a>
      ))}
    </div>
  );
}