import React from 'react';
import { Globe, Users, Building2 } from 'lucide-react';
import type { CompanyInfo } from '../types/stock';

interface CompanyOverviewProps {
  info: CompanyInfo | null;
  isLoading: boolean;
}

export default function CompanyOverview({ info, isLoading }: CompanyOverviewProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-100 rounded w-1/4"></div>
        <div className="h-24 bg-gray-100 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!info) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{info.name}</h3>
      <p className="text-gray-600 leading-relaxed">{info.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
          <Building2 className="h-5 w-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Sector</div>
            <div className="font-medium">{info.sector}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
          <Users className="h-5 w-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Employees</div>
            <div className="font-medium">{info.employees.toLocaleString()}</div>
          </div>
        </div>

        <a
          href={info.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <Globe className="h-5 w-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Website</div>
            <div className="font-medium">Visit Site</div>
          </div>
        </a>
      </div>
    </div>
  );
}