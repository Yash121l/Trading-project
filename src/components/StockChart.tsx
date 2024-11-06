import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Calendar } from 'lucide-react';

interface StockChartProps {
  data: any[];
  isLoading: boolean;
}

const timeRanges = [
  { label: '1D', value: '1d' },
  { label: '1W', value: '5d' },
  { label: '1M', value: '1mo' },
  { label: '3M', value: '3mo' },
  { label: '1Y', value: '1y' },
  { label: '5Y', value: '5y' }
];

export default function StockChart({ data, isLoading }: StockChartProps) {
  const [selectedRange, setSelectedRange] = useState('1mo');

  if (isLoading) {
    return (
      <div className="animate-pulse h-[400px] bg-gray-100 rounded-xl"></div>
    );
  }

  if (!data.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Calendar className="h-5 w-5 text-gray-500" />
        <div className="flex gap-2">
          {timeRanges.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSelectedRange(value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedRange === value
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full bg-white rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              name="Stock Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}