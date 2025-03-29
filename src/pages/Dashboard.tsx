import { useState, useEffect } from 'react';
import { useAuth } from '@/App';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
// Use mock function names
import { getUserProjectsMock as getUserProjects } from '@/utils/userUtils'; 
import { Project } from '@/types'; // Removed TeamMember as it's not directly used here
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  FileSpreadsheet, Plus, ShoppingBag, Truck, Users, Building, Boxes, Hammer, Clock, CheckCircle, Archive, AlertCircle, Calendar
} from 'lucide-react'; // Consolidated icons
import { toast } from 'sonner';
// Use mock function names
import { getAllSuppliersMock as getAllSuppliers, getOrderStatuses } from '@/utils/supplierUtils'; 
import { Supplier, OrderStatus } from '@/types/supplier'; // Assuming this type exists

// Custom types for dashboard charts
interface ChartDataPoint {
  name: string;
  value: number;
  color?: string; // Optional color for charts
}

export default function Dashboard() {
  const { userId } = useAuth(); // Removed userRole as it's not used
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [orders, setOrders] = useState<OrderStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Derived states for summaries and charts
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [projectStatusCounts, setProjectStatusCounts] = useState<ChartDataPoint[]>([]);
  const [taskStatusCounts, setTaskStatusCounts] = useState<ChartDataPoint[]>([]);
  const [supplierCategoryCounts, setSupplierCategoryCounts] = useState<ChartDataPoint[]>([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [shippedOrdersCount, setShippedOrdersCount] = useState(0);
  const [totalTeamMembers, setTotalTeamMembers] = useState(0);

  useEffect(() => {
    const loadData = () => { // Removed async as using mock
      try {
        setIsLoading(true);
        if (!userId) {
           console.warn("Dashboard: User ID not found, skipping data load.");
           setIsLoading(false);
           return;
        };
        
        // Load mock data
        const userProjects = getUserProjects(userId); 
        const allSuppliers = getAllSuppliers(); 
        const allOrders = getOrderStatuses(); 
        
        setProjects(userProjects);
        setSuppliers(allSuppliers);
        setOrders(allOrders);
        
        // --- Calculate derived data ---
        
        // Active Projects (Top 3)
        const active = userProjects.filter(p => p.status === 'active');
        setActiveProjects(active.slice(0, 3)); 
        
        // Project Status Counts
        const statusCounts: Record<string, number> = { active: 0, completed: 0, archived: 0 };
        userProjects.forEach(p => { statusCounts[p.status] = (statusCounts[p.status] || 0) + 1; });
        setProjectStatusCounts([
          { name: 'Active', value: statusCounts.active, color: '#3b82f6' }, // Blue
          { name: 'Completed', value: statusCounts.completed, color: '#10b981' }, // Green
          { name: 'Archived', value: statusCounts.archived, color: '#6b7280' } // Gray
        ]);
        
        // Task Status Counts
        const taskCounts: Record<string, number> = { todo: 0, 'in-progress': 0, completed: 0 };
        userProjects.forEach(p => { p.tasks?.forEach(task => { taskCounts[task.status] = (taskCounts[task.status] || 0) + 1; }); });
        setTaskStatusCounts([
          { name: 'To Do', value: taskCounts.todo, color: '#f97316' }, // Orange
          { name: 'In Progress', value: taskCounts['in-progress'], color: '#8b5cf6' }, // Purple
          { name: 'Completed', value: taskCounts.completed, color: '#10b981' } // Green
        ]);
        
        // Supplier Category Counts
        const categoryCounts: Record<string, number> = {};
        allSuppliers.forEach(s => { categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1; });
        setSupplierCategoryCounts(Object.entries(categoryCounts).map(([name, value]) => ({ name, value })));
        
        // Order Counts
        setPendingOrdersCount(allOrders.filter(o => o.status === 'pending').length);
        setShippedOrdersCount(allOrders.filter(o => o.status === 'shipped').length);

        // Team Members Count (Unique across projects)
        const uniqueUserIds = new Set(userProjects.flatMap(p => p.team?.map(m => m.userId) || []));
        setTotalTeamMembers(uniqueUserIds.size);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [userId]); // Dependency array includes userId
  
  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f97316', '#ef4444', '#6b7280']; // Define colors for charts
  
  // Format currency helper
  const formatCurrency = (amount?: number) => { // Made amount optional
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

   // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try { return new Date(dateString).toLocaleDateString(); } 
    catch (e) { return 'Invalid Date'; }
  };

  // Helper to calculate days left
  const calculateDaysLeft = (endDateString?: string) => {
     if (!endDateString) return 'N/A';
     try {
       const endDate = new Date(endDateString);
       const today = new Date();
       endDate.setHours(0, 0, 0, 0);
       today.setHours(0, 0, 0, 0);
       const diffTime = endDate.getTime() - today.getTime();
       if (diffTime < 0) return 'Overdue';
       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
       return `${diffDays} Days Left`;
     } catch (e) { return 'N/A'; }
  };

  // Get status icon helper function (restored)
  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'archived':
        return <Archive className="h-4 w-4 text-gray-500" />;
      default:
         return null;
    }
  };

  // Loading state
  if (isLoading) {
     return (
       <div className="container mx-auto px-4 py-8">
         <div className="animate-pulse space-y-8">
           <div className="h-8 bg-muted rounded w-1/3"></div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-muted rounded-lg"></div>)}
           </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-muted rounded-lg"></div>
              <div className="h-80 bg-muted rounded-lg"></div>
           </div>
           <div className="h-64 bg-muted rounded-lg"></div>
         </div>
       </div>
     );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your projects and activities</p>
        </div>
        <Button onClick={() => navigate('/projects')}> {/* Changed button action */}
          <Plus className="mr-2 h-4 w-4" /> View Projects
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Projects Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              {projectStatusCounts.find(s => s.name === 'Active')?.value || 0} Active
            </p>
          </CardContent>
        </Card>
         {/* Suppliers Card */}
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">
              {supplierCategoryCounts.length} Categories
            </p>
          </CardContent>
        </Card>
         {/* Pending Orders Card */}
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrdersCount + shippedOrdersCount}</div> 
            <p className="text-xs text-muted-foreground">
               {pendingOrdersCount} Pending, {shippedOrdersCount} Shipped
            </p>
          </CardContent>
        </Card>
         {/* Team Members Card */}
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeamMembers}</div>
             <p className="text-xs text-muted-foreground">
               Across {projects.length} projects
             </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Projects by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={projectStatusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {projectStatusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} projects`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskStatusCounts} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} width={30}/>
                  <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}/>
                  <Bar dataKey="value" name="Tasks" radius={[4, 4, 0, 0]}>
                    {taskStatusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Active Projects List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Projects Overview</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/projects')}>View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeProjects.length > 0 ? (
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 mb-3 sm:mb-0 mr-4">
                    <Link to={`/projects/${project.id}`} className="font-medium hover:underline">{project.name}</Link>
                    <p className="text-sm text-muted-foreground line-clamp-1">{project.description || "No description"}</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm w-full sm:w-auto">
                     <div className="flex items-center" title="Status">
                       {getStatusIcon(project.status)}
                       <span className="ml-1 capitalize">{project.status}</span>
                     </div>
                     <div className="flex items-center" title="Progress">
                       <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden mr-1.5">
                         <div className="h-full bg-primary" style={{ width: `${project.progress || 0}%` }}></div>
                       </div>
                       <span>{project.progress || 0}%</span>
                     </div>
                     <div className="flex items-center" title="Due Date">
                       <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                       <span>{formatDate(project.endDate)}</span>
                     </div>
                     <Button variant="ghost" size="sm" onClick={() => navigate(`/projects/${project.id}`)}>Details</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No active projects found.
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Quick Links (Optional - can be removed if sidebar is sufficient) */}
      {/* ... Quick Links Card ... */}

    </div>
  );
}
