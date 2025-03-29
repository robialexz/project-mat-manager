import { useState, useEffect } from 'react';
import { useAuth } from "@/App"; // Use the restored mock auth
import { Project, TeamMember } from '@/types'; // Use restored types
// Use mock function names from the restored userUtils.ts
import { getUserProjectsMock as getUserProjects, createProjectMock as createProject } from '@/utils/userUtils'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from '@/components/ui/badge';
import { FileSpreadsheet, Calendar, Plus, Search, Filter, Clock, CheckCircle, Archive } from 'lucide-react'; // Removed AlertCircle if not used
// Removed ProjectCard import if not used or restored
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';

// Form schema for new project
const newProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Project description is required'),
});

export default function Projects() {
  const { userId } = useAuth(); // Use restored mock auth context
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // Fetch projects using mock function
  useEffect(() => {
    const loadProjects = () => { // No longer async
      setIsLoading(true);
      if (!userId) {
        console.warn("User ID not found in auth context for loading projects.");
        setIsLoading(false);
        return; 
      };
      
      try {
        // Use the mock function directly
        const userProjects = getUserProjects(userId); 
        setProjects(userProjects);
        setFilteredProjects(userProjects); 
      } catch (error) {
        console.error('Error loading projects:', error);
        toast.error('Failed to load projects');
        setProjects([]); 
        setFilteredProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [userId]); 

  // Filter projects (remains the same)
  useEffect(() => {
    let result = [...projects];
    if (searchTerm) {
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(project => project.status === statusFilter);
    }
    setFilteredProjects(result);
  }, [searchTerm, statusFilter, projects]);
  
  // Handle project creation using mock function
  const handleCreateProject = (data: z.infer<typeof newProjectSchema>) => { // No longer async
    if (!userId) {
      toast.error('You must be logged in to create a project');
      return;
    }
    
    try {
      // Use the mock createProject function
      const newProject = createProject(data.name, data.description, userId); 
      
      if (newProject) {
        setProjects(prev => [...prev, newProject]); 
        toast.success('Project created successfully (mock)');
        setIsCreateDialogOpen(false);
        form.reset();
      } else {
         toast.error('Failed to create project (mock).');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    }
  };
  
  // Get status icon (remains the same)
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

   // Helper to format dates (optional, can be done inline)
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return 'Invalid Date';
    }
  };

  // Helper to calculate days left (optional)
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
     } catch (e) {
       return 'N/A';
     }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Create Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <p className="text-muted-foreground">Manage and track all your construction projects</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Enter the basic details to create a new construction project.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              {/* Pass the synchronous handler */}
              <form onSubmit={form.handleSubmit(handleCreateProject)} className="space-y-8 pt-4"> 
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Riverside Apartments Development" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of the project" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                     {form.formState.isSubmitting ? "Creating..." : "Create Project"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="relative md:col-span-3">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Project List / Loading / Empty State */}
      {isLoading ? (
        // Skeleton Loader
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => ( 
            <Card key={i} className="h-[280px] animate-pulse"> {/* Adjusted height */}
              <CardHeader className="pb-2">
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
                <div className="space-y-3 mt-6">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        // Project Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-md transition-shadow cursor-pointer flex flex-col" 
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1">{project.name}</CardTitle> 
                    <CardDescription className="mt-1 text-xs"> 
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </CardDescription>
                  </div>
                  <Badge 
                    // Use correct variants based on restored state
                    variant={project.status === 'active' ? 'default' : 
                            project.status === 'completed' ? 'secondary' : 'outline'} 
                    className="flex items-center gap-1 whitespace-nowrap" 
                  >
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow"> 
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.description || "No description provided."}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress || 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${project.progress > 80 ? 'bg-green-500' : 'bg-primary'}`} 
                      style={{ width: `${project.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileSpreadsheet className="h-3 w-3" />
                    <span>{project.tasks?.length || 0} Tasks</span> 
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{calculateDaysLeft(project.endDate)}</span>
                  </div>
                </div>
                
                {project.team && project.team.length > 0 && (
                  <div className="mt-3">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 4).map((member, index) => (
                        <div 
                          key={member.id || index} 
                          className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium"
                          title={member.name}
                        >
                          {member.name ? member.name.substring(0, 2).toUpperCase() : '?'}
                        </div>
                      ))}
                      {project.team.length > 4 && (
                        <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium">
                          +{project.team.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              
              {/* Footer removed as click on card navigates */}
            </Card>
          ))}
        </div>
      ) : (
         // Empty State
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="mb-2">No projects found</CardTitle>
          <CardDescription>
            {searchTerm || statusFilter !== 'all' 
              ? "Try adjusting your search or filters." 
              : "You haven't created any projects yet."}
          </CardDescription>
          <div className="mt-6">
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Your First Project
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
