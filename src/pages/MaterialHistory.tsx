import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { MaterialHistory, Project, Material } from '@/types'; // Added Material import
import { generateMockProjects } from '@/utils/userUtils'; 
// Import the history generator from materialUtils
import { generateMockMaterialHistory } from '@/utils/materialUtils'; 

// Mock data generation function is now in materialUtils.ts

const MaterialHistoryPage = () => {
  const [history, setHistory] = useState<MaterialHistory[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<MaterialHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]); // To populate filter

  useEffect(() => {
    // Load mock data
    const mockProjects = generateMockProjects(5); // Generate some projects
    setProjects(mockProjects);
    // Use the imported generator function
    const mockHistory = generateMockMaterialHistory(mockProjects); 
    setHistory(mockHistory);
    setFilteredHistory(mockHistory);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Filter history based on search term and project
    let result = [...history];
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(item => 
         item.field.toLowerCase().includes(lowerSearchTerm) ||
         String(item.oldValue).toLowerCase().includes(lowerSearchTerm) ||
         String(item.newValue).toLowerCase().includes(lowerSearchTerm) ||
         item.materialId.toLowerCase().includes(lowerSearchTerm) || // Search by material ID
         item.changedBy.toLowerCase().includes(lowerSearchTerm) // Search by user ID
         // TODO: Add search by material name (requires joining/lookup)
      );
    }
    
    if (projectFilter !== 'all') {
       // TODO: This requires projectId to be part of MaterialHistory type or a lookup
       // For mock data, filtering by project ID is not directly possible with current structure
       // result = result.filter(item => (item as any).projectId === projectFilter); 
       console.warn("Filtering history by project ID is not implemented in mock data.")
    }
    
    setFilteredHistory(result);
  }, [searchTerm, projectFilter, history]);

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Material Change History</h1>

      <Card>
        <CardHeader>
          <CardTitle>History Log</CardTitle>
          <CardDescription>Track changes made to materials across all projects.</CardDescription>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
            <div className="relative md:col-span-3">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search history (field, value, user...)"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by project" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading history...</p> // Simple loading state
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material ID</TableHead>
                    <TableHead>Field Changed</TableHead>
                    <TableHead>Old Value</TableHead>
                    <TableHead>New Value</TableHead>
                    <TableHead>Changed At</TableHead>
                    <TableHead>Changed By</TableHead>
                    <TableHead>Confirmed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium truncate max-w-[100px]">{item.materialId}</TableCell>
                        <TableCell>{item.field}</TableCell>
                        <TableCell>{String(item.oldValue)}</TableCell>
                        <TableCell>{String(item.newValue)}</TableCell>
                        <TableCell>{formatDate(item.changedAt)}</TableCell>
                        <TableCell>{item.changedBy}</TableCell>
                        <TableCell>
                          {/* Use valid Badge variants: default, secondary, destructive, outline */}
                          <Badge variant={item.confirmed ? "secondary" : "outline"}> 
                            {item.confirmed ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No history records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialHistoryPage;
