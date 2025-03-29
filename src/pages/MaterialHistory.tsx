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

// Mock data generation for MaterialHistory
const generateMockMaterialHistory = (projects: Project[]): MaterialHistory[] => {
  const history: MaterialHistory[] = [];
  const fields = ['quantity', 'price', 'status', 'supplier'];
  const users = ['user_1', 'user_2', 'user_3']; // Mock user IDs

  projects.forEach(project => {
    project.materials.forEach(material => {
      const changeCount = Math.floor(Math.random() * 3); // 0-2 changes per material
      let currentQty = material.quantity;
      let currentPrice = material.price;
      let currentStatus = material.status;

      for (let i = 0; i < changeCount; i++) {
        const field = fields[Math.floor(Math.random() * fields.length)];
        const changedAt = new Date(Date.parse(material.createdAt) + Math.random() * (Date.now() - Date.parse(material.createdAt))).toISOString();
        const changedBy = users[Math.floor(Math.random() * users.length)];
        let oldValue: any = null;
        let newValue: any = null;

        switch (field) {
          case 'quantity':
            oldValue = currentQty;
            newValue = Math.max(0, currentQty + Math.floor(Math.random() * 21) - 10); // Change by -10 to +10
            currentQty = newValue;
            break;
          case 'price':
            oldValue = currentPrice;
            newValue = Math.max(0, currentPrice + (Math.random() * 20 - 10)); // Change price by +/- 10
            currentPrice = newValue;
            break;
          case 'status':
            oldValue = currentStatus;
            const statuses: Material['status'][] = ['pending', 'ordered', 'delivered', 'cancelled'];
            newValue = statuses[Math.floor(Math.random() * statuses.length)];
            currentStatus = newValue;
            break;
           case 'supplier':
             oldValue = material.supplier; // Keep original for simplicity
             newValue = `Supplier ${Math.floor(Math.random() * 5) + 1}`;
             break;
        }

        if (oldValue !== newValue) {
          history.push({
            id: `hist_${material.id}_${i}`,
            materialId: material.id,
            field: field,
            oldValue: oldValue,
            newValue: newValue,
            changedAt: changedAt,
            changedBy: changedBy,
            confirmed: Math.random() > 0.3, // Randomly confirmed
            // Add projectId for easier filtering if needed in type
            // projectId: project.id 
          });
        }
      }
    });
  });
  return history.sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());
};


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
         // Add search by material name (requires joining/lookup)
      );
    }
    
    if (projectFilter !== 'all') {
       // This requires projectId to be part of MaterialHistory type or a lookup
       // For mock data, we'll filter based on the generated data structure if possible
       // Assuming generateMockMaterialHistory adds projectId
       result = result.filter(item => (item as any).projectId === projectFilter); 
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
