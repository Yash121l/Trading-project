export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  eps: number;
  dividend: number;
  high52: number;
  low52: number;
}

export interface CompanyInfo {
  name: string;
  description: string;
  sector: string;
  industry: string;
  employees: number;
  website: string;
}

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export interface ChartData {
  date: string;
  price: number;
  volume: number;
}