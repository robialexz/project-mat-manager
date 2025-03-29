
import { useState, useEffect } from 'react';
import { useAuth } from '@/App';
import { useNavigate } from 'react-router-dom';
// Use mock function names
import { getUserProjectsMock as getUserProjects } from '@/utils/userUtils'; 
import { Project, TeamMember } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  AlertCircle, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileSpreadsheet, 
  Plus, 
  ShoppingBag,
  Truck,
  Users,
  Building,
  Boxes,
  Hammer
} from 'lucide-react';
import { toast } from 'sonner';
// Use mock function names
import { getAllSuppliersMock as getAllSuppliers, getOrderStatuses } from '@/utils/supplierUtils'; 
import { Supplier, OrderStatus } from '@/types/supplier';

// Custom types for dashboard
interface ProjectStatusCount {
  name: string;
  value: number;
  color: string;
}

interface TaskStatusCount {
  name: string;
  value: number;
  color: string;
}

interface SupplierCategoryCount {
  name: string;
  value: number;
}

export default function Dashboard() {
  const { userId, userRole } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [orders, setOrders] = useState<OrderStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [projectStatusCounts, setProjectStatusCounts] = useState<ProjectStatusCount[]>([]);
  const [taskStatusCounts, setTaskStatusCounts] = useState<TaskStatusCount[]>([]);
  const [supplierCategoryCounts, setSupplierCategoryCounts] = useState<SupplierCategoryCount[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        if (!userId) {
           console.warn("Dashboard: User ID not found, skipping data load.");
           setIsLoading(false);
           return;
        };
        
        // Load user's projects (mock)
        const userProjects = getUserProjects(userId); 
        setProjects(userProjects);
        
        // Load active projects (mock)
        const active = userProjects.filter(p => p.status === 'active');
        setActiveProjects(active.slice(0, 3)); 
        
        // Load suppliers (mock)
        const allSuppliers = getAllSuppliers(); 
        setSuppliers(allSuppliers);
        
        // Load orders (mock)
        const allOrders = getOrderStatuses(); 
        setOrders(allOrders);
        
        // Calculate project status counts
        const statusCounts: Record<string, number> = {
          active: 0,
          completed: 0,
          archived: 0
        };
        
        userProjects.forEach(project => {
          statusCounts[project.status] = (statusCounts[project.status] || 0) + 1;
        });
        
        setProjectStatusCounts([
          { name: 'Active', value: statusCounts.active, color: '#3b82f6' },
          { name: 'Completed', value: statusCounts.completed, color: '#10b981' },
          { name: 'Archived', value: statusCounts.archived, color: '#6b7280' }
        ]);
        
        // Calculate task status counts
        const taskCounts: Record<string, number> = {
          todo: 0,
          'in-progress': 0,
          completed: 0
        };
        
        userProjects.forEach(project => {
          project.tasks.forEach(task => {
            taskCounts[task.status] = (taskCounts[task.status] || 0) + 1;
          });
        });
        
        setTaskStatusCounts([
          { name: 'To Do', value: taskCounts.todo, color: '#f97316' },
          { name: 'In Progress', value: taskCounts['in-progress'], color: '#8b5cf6' },
          { name: 'Completed', value: taskCounts.completed, color: '#10b981' }
        ]);
        
        // Calculate supplier category counts
        const categoryCounts: Record<string, number> = {};
        
        allSuppliers.forEach(supplier => {
          categoryCounts[supplier.category] = (categoryCounts[supplier.category] || 0) + 1;
        });
        
        const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
          name,
          value
        }));
        
        setSupplierCategoryCounts(categoryData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [userId]);
  
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const confirmedOrdersCount = orders.filter(o => o.status === 'confirmed').length;
  const shippedOrdersCount = orders.filter(o => o.status === 'shipped').length;
  
  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f97316', '#ef4444', '#6b7280'];
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your construction projects and activities</p>
        </div>
        <Button onClick={() => navigate('/projects/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <h3 className="text-2xl font-bold mt-1">{projects.length}</h3>
              </div>
              <div className="rounded-full p-3 bg-primary/10">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-muted-foreground">Active: {projects.filter(p => p.status === 'active').length}</span>
              </div>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-muted-foreground">Completed: {projects.filter(p => p.status === 'completed').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Suppliers</p>
                <h3 className="text-2xl font-bold mt-1">{suppliers.length}</h3>
              </div>
              <div className="rounded-full p-3 bg-primary/10">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="flex items-center">
                <span className="text-muted-foreground">Categories: {supplierCategoryCounts.length}</span>
              </div>
              <div className="mx-2">•</div>
              <Button variant="link" className="h-auto p-0" onClick={() => navigate('/suppliers')}>
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <h3 className="text-2xl font-bold mt-1">{pendingOrdersCount + confirmedOrdersCount + shippedOrdersCount}</h3>
              </div>
              <div className="rounded-full p-3 bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-muted-foreground">Pending: {pendingOrdersCount}</span>
              </div>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                <Truck className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-muted-foreground">Shipped: {shippedOrdersCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                <h3 className="text-2xl font-bold mt-1">
                  {projects.flatMap(p => p.team).filter((v, i, a) => a.findIndex(t => t.userId === v.userId) === i).length}
                </h3>
              </div>
              <div className="rounded-full p-3 bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Button variant="link" className="h-auto p-0" onClick={() => navigate('/users')}>
                Manage Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Projects by Status</CardTitle>
            <CardDescription>Distribution of projects by their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusCounts}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {projectStatusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    formatter={(value) => [`${value} projects`, 'Count']} 
                    labelFormatter={(name) => `Status: ${name}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Overview of tasks by their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={taskStatusCounts}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                  <Bar dataKey="value" name="Tasks">
                    {taskStatusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Active Projects */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Your current ongoing projects</CardDescription>
            </div>
            <Button variant="outline" onClick={() => navigate('/projects')}>View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeProjects.length > 0 ? (
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <div className="flex-1 mb-2 md:mb-0">
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <div className="flex items-center mt-1">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{project.progress}%</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Due Date</span>
                      <span className="text-sm font-medium">
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Budget</span>
                      <span className="text-sm font-medium">{formatCurrency(project.budget)}</span>
                    </div>
                    
                    <Button variant="outline" size="sm" className="md:self-center" onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${project.id}`);
                    }}>
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Building className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No active projects</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start creating projects to track your construction work
              </p>
              <Button className="mt-4" onClick={() => navigate('/projects')}>
                <Plus className="mr-2 h-4 w-4" /> Create Project
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Recent Activity and Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.flatMap(p => 
                p.updates.map(update => ({
                  ...update,
                  projectId: p.id,
                  projectName: p.name
                }))
              )
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((update) => (
                  <div key={update.id} className="flex gap-4 items-start pb-4 border-b">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileSpreadsheet className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{update.projectName}</p>
                          <p className="text-sm text-muted-foreground">{update.message}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(update.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              
              {projects.flatMap(p => p.updates).length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Shortcuts to frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/projects')}>
                <Building className="mr-2 h-4 w-4" />
                View All Projects
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/suppliers')}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Manage Suppliers
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/users')}>
                <Users className="mr-2 h-4 w-4" />
                Team Members
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/calendar')}>
                <Calendar className="mr-2 h-4 w-4" />
                Project Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Report feature coming soon')}>
                <Boxes className="mr-2 h-4 w-4" />
                Generate Reports
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Material calculator coming soon')}>
                <Hammer className="mr-2 h-4 w-4" />
                Material Calculator
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
