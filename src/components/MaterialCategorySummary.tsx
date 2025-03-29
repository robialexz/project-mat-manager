
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Material } from '@/types';
import { ChartContainer } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Boxes, CheckCircle, Clock, AlertTriangle, Package } from 'lucide-react';

interface MaterialCategorySummaryProps {
  materials: Material[];
}

const MaterialCategorySummary: React.FC<MaterialCategorySummaryProps> = ({ materials }) => {
  // Group materials by category
  const categorizedMaterials = materials.reduce((acc: Record<string, Material[]>, material) => {
    const category = material.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(material);
    return acc;
  }, {});
  
  // Calculate totals for each category
  const categoryAnalytics = Object.entries(categorizedMaterials).map(([category, items]) => {
    const totalValue = items.reduce((sum, item) => {
      return sum + (item.price && item.quantity ? item.price * item.quantity : 0);
    }, 0);
    
    const statusCounts = items.reduce((counts: Record<string, number>, item) => {
      if (!counts[item.status]) counts[item.status] = 0;
      counts[item.status]++;
      return counts;
    }, { pending: 0, ordered: 0, delivered: 0 });
    
    const deliveryProgress = Math.round((statusCounts.delivered / items.length) * 100);
    
    return {
      category,
      totalItems: items.length,
      totalValue,
      pending: statusCounts.pending,
      ordered: statusCounts.ordered,
      delivered: statusCounts.delivered,
      deliveryProgress
    };
  });
  
  // Sort categories by total value
  categoryAnalytics.sort((a, b) => b.totalValue - a.totalValue);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Material Workflow Timeline</CardTitle>
        <CardDescription>Current status of materials across all categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {categoryAnalytics.map((category) => (
            <div key={category.category} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Boxes className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium text-lg">{category.category}</h3>
                </div>
                <Badge variant="outline">
                  ${category.totalValue.toLocaleString()}
                </Badge>
              </div>
              
              {/* Timeline visualization */}
              <div className="relative">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500" 
                    style={{ width: `${category.deliveryProgress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                    <span>{category.pending} pending</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-blue-500 mr-1" />
                    <span>{category.ordered} ordered</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span>{category.delivered} delivered</span>
                  </div>
                </div>
              </div>
              
              {/* Key milestones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                {category.pending > 0 && (
                  <div className="flex items-center p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <Clock className="h-5 w-5 text-amber-500 mr-2" />
                    <div>
                      <p className="font-medium">{category.pending} items</p>
                      <p className="text-xs text-muted-foreground">Awaiting order</p>
                    </div>
                  </div>
                )}
                
                {category.ordered > 0 && (
                  <div className="flex items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <CalendarDays className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="font-medium">{category.ordered} items</p>
                      <p className="text-xs text-muted-foreground">In transit</p>
                    </div>
                  </div>
                )}
                
                {category.delivered > 0 && (
                  <div className="flex items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="font-medium">{category.delivered} items</p>
                      <p className="text-xs text-muted-foreground">Delivered</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {categoryAnalytics.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <Boxes className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No material categories found. Create custom categories to organize your materials.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCategorySummary;
