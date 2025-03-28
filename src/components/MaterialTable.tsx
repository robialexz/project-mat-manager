
import { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, AlertCircle, Clock, Package, TruckIcon, 
  Edit, MoreHorizontal, CheckCircle2 
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Material } from '@/types';
import { confirmChanges, getMaterialChangeSummary } from '@/utils/materialUtils';
import { toast } from 'sonner';

interface MaterialTableProps {
  materials: Material[];
  onEdit: (material: Material) => void;
  onConfirm: (materialId: string) => void;
}

export default function MaterialTable({ materials, onEdit, onConfirm }: MaterialTableProps) {
  const [sortBy, setSortBy] = useState<keyof Material>('updatedAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: keyof Material) => {
    if (sortBy === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir('asc');
    }
  };
  
  const sortedMaterials = [...materials].sort((a, b) => {
    if (sortBy === 'updatedAt' || sortBy === 'createdAt') {
      return sortDir === 'asc' 
        ? new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
        : new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
    }
    
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return sortDir === 'asc'
      ? Number(aVal) - Number(bVal)
      : Number(bVal) - Number(aVal);
  });
  
  const getStatusIcon = (status: Material['status']) => {
    switch (status) {
      case 'ordered':
        return <TruckIcon className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };
  
  const handleConfirm = (material: Material) => {
    toast.success(`Confirmed changes for ${material.name}`);
    onConfirm(material.id);
  };
  
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%] cursor-pointer" onClick={() => handleSort('name')}>
              Material
              {sortBy === 'name' && (sortDir === 'asc' ? ' ↑' : ' ↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
              Category
              {sortBy === 'category' && (sortDir === 'asc' ? ' ↑' : ' ↓')}
            </TableHead>
            <TableHead className="text-right cursor-pointer" onClick={() => handleSort('quantity')}>
              Quantity
              {sortBy === 'quantity' && (sortDir === 'asc' ? ' ↑' : ' ↓')}
            </TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
              Status
              {sortBy === 'status' && (sortDir === 'asc' ? ' ↑' : ' ↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('updatedAt')}>
              Updated
              {sortBy === 'updatedAt' && (sortDir === 'asc' ? ' ↑' : ' ↓')}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMaterials.map((material) => {
            const isModified = !material.confirmed;
            const changeSummary = getMaterialChangeSummary(material);
            
            return (
              <TableRow 
                key={material.id} 
                className={isModified ? 'modified-row' : ''}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-muted-foreground mr-2" />
                    {material.name}
                    {isModified && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertCircle className="h-4 w-4 text-amber-500 ml-2" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Changes: {changeSummary}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell>{material.category}</TableCell>
                <TableCell className={`text-right ${isModified ? 'modified-value' : ''}`}>
                  {material.quantity}
                </TableCell>
                <TableCell>{material.unit}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={`flex w-fit items-center gap-1 ${
                      material.status === 'delivered' 
                        ? 'border-green-500 text-green-600' 
                        : material.status === 'ordered' 
                          ? 'border-blue-500 text-blue-600'
                          : 'border-amber-500 text-amber-600'
                    }`}
                  >
                    {getStatusIcon(material.status)}
                    {material.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(material.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center space-x-2">
                    {isModified && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleConfirm(material)}
                        className="h-8 w-8 text-green-600"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => onEdit(material)} 
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(material)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onConfirm(material.id)}>
                          Confirm Changes
                        </DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {materials.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No materials found. Add your first material to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
