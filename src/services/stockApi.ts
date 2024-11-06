// import axios from 'axios';
// import type { StockData, CompanyInfo, NewsItem, ChartData } from '../types/stock';

// const BASE_URL = 'https://query1.finance.yahoo.com/v8/finance';

// export async function getStockData(symbol: string): Promise<StockData> {
//   try {
//     const response = await axios.get(`${BASE_URL}/chart/${symbol}`);
//     const quote = response.data.chart.result[0].meta;
//     const indicators = response.data.chart.result[0].indicators.quote[0];

//     return {
//       symbol,
//       price: quote.regularMarketPrice,
//       change: quote.regularMarketPrice - quote.previousClose,
//       changePercent: ((quote.regularMarketPrice - quote.previousClose) / quote.previousClose) * 100,
//       volume: quote.regularMarketVolume,
//       marketCap: quote.marketCap,
//       pe: quote.pe || 0,
//       eps: quote.eps || 0,
//       dividend: quote.dividendYield || 0,
//       high52: quote.fiftyTwoWeekHigh,
//       low52: quote.fiftyTwoWeekLow
//     };
//   } catch (error) {
//     throw new Error('Failed to fetch stock data');
//   }
// }

// export async function getChartData(symbol: string, range = '1mo'): Promise<ChartData[]> {
//   try {
//     const response = await axios.get(`${BASE_URL}/chart/${symbol}?range=${range}&interval=1d`);
//     const { timestamp, indicators } = response.data.chart.result[0];
//     const quotes = indicators.quote[0];

//     return timestamp.map((time: number, index: number) => ({
//       date: new Date(time * 1000).toLocaleDateString(),
//       price: quotes.close[index],
//       volume: quotes.volume[index]
//     }));
//   } catch (error) {
//     throw new Error('Failed to fetch chart data');
//   }
// }

// export async function getCompanyInfo(symbol: string): Promise<CompanyInfo> {
//   try {
//     const response = await axios.get(`${BASE_URL}/quoteSummary/${symbol}?modules=assetProfile`);
//     const profile = response.data.quoteSummary.result[0].assetProfile;

//     return {
//       name: profile.longName || symbol,
//       description: profile.longBusinessSummary || '',
//       sector: profile.sector || 'N/A',
//       industry: profile.industry || 'N/A',
//       employees: profile.fullTimeEmployees || 0,
//       website: profile.website || '#'
//     };
//   } catch (error) {
//     throw new Error('Failed to fetch company info');
//   }
// }

// export async function getNewsData(symbol: string): Promise<NewsItem[]> {
//   try {
//     const response = await axios.get(`${BASE_URL}/quoteSummary/${symbol}?modules=news`);
//     const news = response.data.quoteSummary.result[0].news;

//     return news.map((item: any) => ({
//       title: item.title,
//       link: item.link,
//       pubDate: item.providerPublishTime,
//       source: item.publisher
//     }));
//   } catch (error) {
//     throw new Error('Failed to fetch news data');
//   }
// }

import type {
  StockData,
  CompanyInfo,
  NewsItem,
  ChartData,
} from '../types/stock';

export async function getStockData(symbol: string): Promise<StockData> {
  return {
    symbol,
    price: 150.0,
    change: 2.5,
    changePercent: 1.7,
    volume: 1000000,
    marketCap: 1000000000,
    pe: 15.3,
    eps: 5.0,
    dividend: 1.2,
    high52: 200.0,
    low52: 100.0,
  };
}

export async function getChartData(
  symbol: string,
  range = '1mo'
): Promise<ChartData[]> {
  return Array.from({ length: 30 }, (_, index) => ({
    date: new Date(Date.now() - index * 86400000).toLocaleDateString(),
    price: 150 + Math.random() * 5 - 2.5,
    volume: 500000 + Math.floor(Math.random() * 100000),
  }));
}

export async function getCompanyInfo(symbol: string): Promise<CompanyInfo> {
  return {
    name: 'Dummy Company',
    description: 'This is a dummy company description.',
    sector: 'Technology',
    industry: 'Software',
    employees: 5000,
    website: 'https://dummycompany.com',
  };
}

export async function getNewsData(symbol: string): Promise<NewsItem[]> {
  return [
    {
      title: 'Dummy News Title 1',
      link: 'https://news.example.com/dummy1',
      pubDate: Date.now().toString(),
      source: 'Dummy News Source 1',
    },
    {
      title: 'Dummy News Title 2',
      link: 'https://news.example.com/dummy2',
      pubDate: Date.now().toString(),
      source: 'Dummy News Source 2',
    },
  ];
}
