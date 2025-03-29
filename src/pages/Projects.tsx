
import { useState, useEffect } from 'react';
import { useAuth } from "@/App";
import { Project } from '@/types';
import { getUserProjects } from '@/utils/userUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, FileSpreadsheet, Calendar, Plus, Search, Filter } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

export default function Projects() {
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would fetch projects from an API
        // For now, we'll use the mock projects
        const userId = `user_1`; // Mock user ID - in real app would come from auth
        const userProjects = getUserProjects(userId);
        
        setProjects(userProjects);
        setFilteredProjects(userProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [userEmail]);

  useEffect(() => {
    // Filter projects based on search term and status
    let result = [...projects];
    
    if (searchTerm) {
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(project => project.status === statusFilter);
    }
    
    setFilteredProjects(result);
  }, [searchTerm, statusFilter, projects]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Projects</h1>
            <p className="text-muted-foreground">Manage and track all your construction projects</p>
          </div>
          <Button onClick={() => toast.info('Create Project feature coming soon')}>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
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
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-[300px] animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full mb-4"></div>
                  <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
                  <div className="space-y-3 mt-8">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <CardTitle className="mb-2">No projects found</CardTitle>
            <CardDescription>
              {searchTerm || statusFilter !== 'all' 
                ? "Try adjusting your search or filters" 
                : "Create a new project to get started"}
            </CardDescription>
            <div className="mt-6">
              <Button onClick={() => toast.info('Create Project feature coming soon')}>
                <Plus className="mr-2 h-4 w-4" /> Create New Project
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
