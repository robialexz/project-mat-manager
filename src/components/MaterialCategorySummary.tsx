
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Material } from '@/types';
import { ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface MaterialCategorySummaryProps {
  materials: Material[];
}

const COLORS = [
  '#8B5CF6',  // purple
  '#0EA5E9',  // blue
  '#F97316',  // orange
  '#22C55E',  // green
  '#EC4899',  // pink
  '#EF4444',  // red
  '#F59E0B',  // amber
  '#64748B',  // slate
];

const MaterialCategorySummary: React.FC<MaterialCategorySummaryProps> = ({ materials }) => {
  // Group materials by category and calculate totals
  const categoryTotals = materials.reduce((acc: Record<string, number>, material) => {
    const category = material.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = 0;
    }
    if (material.price && material.quantity) {
      acc[category] += material.price * material.quantity;
    }
    return acc;
  }, {});
  
  // Convert to array for the chart
  const chartData = Object.entries(categoryTotals).map(([name, value], index) => ({
    name,
    value,
    fill: COLORS[index % COLORS.length]
  }));
  
  // Calculate delivery status by category
  const categoryStatus = materials.reduce((acc: Record<string, Record<string, number>>, material) => {
    const category = material.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = { pending: 0, ordered: 0, delivered: 0 };
    }
    acc[category][material.status] += 1;
    return acc;
  }, {});
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Materials by Category</CardTitle>
        <CardDescription>Distribution of materials by category and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer 
            config={{ 
              value: { theme: { light: '#8B5CF6', dark: '#8B5CF6' } },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Total Value']} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {Object.entries(categoryStatus).map(([category, statuses]) => (
            <div key={category} className="border p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">{category}</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-amber-500 font-bold">{statuses.pending}</span>
                  <span>Pending</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-blue-500 font-bold">{statuses.ordered}</span>
                  <span>Ordered</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-green-500 font-bold">{statuses.delivered}</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCategorySummary;
