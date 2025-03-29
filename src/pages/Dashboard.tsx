
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard from '@/components/ProjectCard';
import Navbar from '@/components/Navbar';
import { generateMockProjects, getProjectSummary } from '@/utils/materialUtils';
import { Package, Search, PlusCircle, Users, Building, Boxes } from 'lucide-react';
import MaterialCategorySummary from '@/components/MaterialCategorySummary';

const Dashboard = () => {
  const [projects, setProjects] = useState(generateMockProjects(8));
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Combine all materials from all projects
  const allMaterials = projects.flatMap(project => project.materials);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your projects and materials
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Link to="/users">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
            </Link>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {projects.filter(p => p.status === 'active').length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allMaterials.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {allMaterials.filter(m => !m.confirmed).length} waiting confirmation
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Delivery Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-1">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-amber-500">
                    {allMaterials.filter(m => m.status === 'pending').length}
                  </span>
                  <span className="text-xs text-muted-foreground">Pending</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-blue-500">
                    {allMaterials.filter(m => m.status === 'ordered').length}
                  </span>
                  <span className="text-xs text-muted-foreground">Ordered</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-green-500">
                    {allMaterials.filter(m => m.status === 'delivered').length}
                  </span>
                  <span className="text-xs text-muted-foreground">Delivered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <MaterialCategorySummary materials={allMaterials} />
        </div>
        
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold mr-4">Projects</h2>
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects
                .filter(project => project.status === 'active')
                .map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                  />
                ))
              }
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects
                .filter(project => project.status === 'completed')
                .map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                  />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
