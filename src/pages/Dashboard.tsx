
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileSpreadsheet, Package, TruckIcon, CheckCircle, AlertCircle, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import { generateMockProjects } from '@/utils/materialUtils';

const Dashboard = () => {
  const [projects] = useState(() => generateMockProjects(6));
  
  // Calculate totals across all projects
  const totals = projects.reduce(
    (acc, project) => {
      const totalMaterials = project.materials.length;
      const pendingMaterials = project.materials.filter(m => m.status === 'pending').length;
      const orderedMaterials = project.materials.filter(m => m.status === 'ordered').length;
      const deliveredMaterials = project.materials.filter(m => m.status === 'delivered').length;
      const recentChanges = project.materials.filter(m => !m.confirmed).length;
      
      return {
        totalMaterials: acc.totalMaterials + totalMaterials,
        pendingMaterials: acc.pendingMaterials + pendingMaterials,
        orderedMaterials: acc.orderedMaterials + orderedMaterials,
        deliveredMaterials: acc.deliveredMaterials + deliveredMaterials,
        recentChanges: acc.recentChanges + recentChanges,
      };
    },
    { totalMaterials: 0, pendingMaterials: 0, orderedMaterials: 0, deliveredMaterials: 0, recentChanges: 0 }
  );
  
  const activeProjects = projects.filter(p => p.status === 'active');
  const recentProjects = [...projects].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 3);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your materials and projects
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2">
            <Button asChild>
              <Link to="/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Materials
              </CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">{totals.totalMaterials}</span>
                <span className="p-1.5 rounded-full bg-primary/10">
                  <Package className="h-4 w-4 text-primary" />
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">{totals.pendingMaterials}</span>
                <span className="p-1.5 rounded-full bg-amber-100">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ordered
              </CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">{totals.orderedMaterials}</span>
                <span className="p-1.5 rounded-full bg-blue-100">
                  <TruckIcon className="h-4 w-4 text-blue-500" />
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Delivered
              </CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">{totals.deliveredMaterials}</span>
                <span className="p-1.5 rounded-full bg-green-100">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Recent Changes
              </CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">{totals.recentChanges}</span>
                <span className="p-1.5 rounded-full bg-amber-100">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Projects */}
        <div className="mb-8">
          <Tabs defaultValue="active">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Projects</h2>
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="active" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                
                {activeProjects.length === 0 && (
                  <div className="col-span-3 py-12 text-center">
                    <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No active projects</h3>
                    <p className="text-muted-foreground mb-4">
                      Create a new project to get started
                    </p>
                    <Button asChild>
                      <Link to="/projects/new">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-center">Create New Project</h3>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FileSpreadsheet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-center">Import from Excel</h3>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-center">Review Changes</h3>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-center">Manage Users</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
