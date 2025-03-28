
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, FileUp, ArrowLeft, Package, Clock, TruckIcon, 
  CheckCircle, AlertCircle, Users 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import MaterialTable from '@/components/MaterialTable';
import MaterialForm from '@/components/MaterialForm';
import ImportExcel from '@/components/ImportExcel';
import { 
  generateMockProjects, createMaterial, updateMaterial, 
  confirmChanges, parseExcelData 
} from '@/utils/materialUtils';
import { Material, Project } from '@/types';
import { toast } from 'sonner';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);
  const [isImportingExcel, setIsImportingExcel] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  
  // Load project data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockProjects = generateMockProjects(6);
    const foundProject = mockProjects.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [projectId]);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="sm" className="mr-2" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The project you're looking for doesn't exist or you don't have access to it.
              </p>
              <Button asChild>
                <Link to="/dashboard">Return to Dashboard</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Calculate project stats
  const totalMaterials = project.materials.length;
  const pendingMaterials = project.materials.filter(m => m.status === 'pending').length;
  const orderedMaterials = project.materials.filter(m => m.status === 'ordered').length;
  const deliveredMaterials = project.materials.filter(m => m.status === 'delivered').length;
  const recentChanges = project.materials.filter(m => !m.confirmed).length;
  
  const progressPercentage = totalMaterials === 0 
    ? 0 
    : Math.round((deliveredMaterials / totalMaterials) * 100);
  
  const handleAddMaterial = () => {
    setIsAddingMaterial(true);
    setSelectedMaterial(null);
  };
  
  const handleEditMaterial = (material: Material) => {
    setSelectedMaterial(material);
    setIsEditingMaterial(true);
  };
  
  const handleSaveMaterial = (materialData: Partial<Material>) => {
    if (selectedMaterial) {
      // Update existing material
      const updatedMaterial = updateMaterial(
        selectedMaterial,
        materialData,
        'user_1' // In a real app, this would be the current user's ID
      );
      
      const updatedMaterials = project.materials.map(m =>
        m.id === updatedMaterial.id ? updatedMaterial : m
      );
      
      setProject({
        ...project,
        materials: updatedMaterials,
        updatedAt: new Date()
      });
      
      toast.success('Material updated successfully');
    } else {
      // Create new material
      const newMaterial = createMaterial(
        materialData as Omit<Material, 'id' | 'createdAt' | 'updatedAt' | 'history'>,
        'user_1' // In a real app, this would be the current user's ID
      );
      
      setProject({
        ...project,
        materials: [...project.materials, newMaterial],
        updatedAt: new Date()
      });
      
      toast.success('Material added successfully');
    }
  };
  
  const handleConfirmChanges = (materialId: string) => {
    const material = project.materials.find(m => m.id === materialId);
    if (!material) return;
    
    const confirmedMaterial = confirmChanges(material, 'user_1');
    
    const updatedMaterials = project.materials.map(m =>
      m.id === materialId ? confirmedMaterial : m
    );
    
    setProject({
      ...project,
      materials: updatedMaterials
    });
  };
  
  const handleImportMaterials = (data: any[]) => {
    const parsedMaterials = parseExcelData(data);
    
    const newMaterials = parsedMaterials.map(materialData => 
      createMaterial(
        materialData as Omit<Material, 'id' | 'createdAt' | 'updatedAt' | 'history'>,
        'user_1'
      )
    );
    
    setProject({
      ...project,
      materials: [...project.materials, ...newMaterials],
      updatedAt: new Date()
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <Badge 
                variant={project.status === 'active' ? 'default' : project.status === 'completed' ? 'secondary' : 'outline'}
                className="ml-2 capitalize"
              >
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>
        
        {/* Project Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Material Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {deliveredMaterials}/{totalMaterials}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-2" />
              <div className="text-sm text-muted-foreground">
                {progressPercentage}% materials delivered
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Material Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span>{pendingMaterials}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TruckIcon className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm">Ordered</span>
                  </div>
                  <span>{orderedMaterials}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Delivered</span>
                  </div>
                  <span>{deliveredMaterials}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Recent Activity</h3>
              {recentChanges > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">Unconfirmed Changes</span>
                    </div>
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      {recentChanges}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    There are {recentChanges} materials with unconfirmed changes that require your attention.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No recent changes. All material updates have been confirmed.
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Team</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Team Members</span>
                </div>
                <span>3</span>
              </div>
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">AM</div>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">JD</div>
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">RK</div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs">+</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Materials Section */}
        <div>
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold mr-4">Materials</h2>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="ordered">Ordered</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  {recentChanges > 0 && (
                    <TabsTrigger value="changes" className="relative">
                      Changes
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 text-[10px] text-white flex items-center justify-center">
                        {recentChanges}
                      </span>
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={() => setIsImportingExcel(true)} variant="outline">
                  <FileUp className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button onClick={handleAddMaterial}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Material
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <MaterialTable 
                materials={project.materials}
                onEdit={handleEditMaterial}
                onConfirm={handleConfirmChanges}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <MaterialTable 
                materials={project.materials.filter(m => m.status === 'pending')}
                onEdit={handleEditMaterial}
                onConfirm={handleConfirmChanges}
              />
            </TabsContent>
            
            <TabsContent value="ordered" className="mt-0">
              <MaterialTable 
                materials={project.materials.filter(m => m.status === 'ordered')}
                onEdit={handleEditMaterial}
                onConfirm={handleConfirmChanges}
              />
            </TabsContent>
            
            <TabsContent value="delivered" className="mt-0">
              <MaterialTable 
                materials={project.materials.filter(m => m.status === 'delivered')}
                onEdit={handleEditMaterial}
                onConfirm={handleConfirmChanges}
              />
            </TabsContent>
            
            {recentChanges > 0 && (
              <TabsContent value="changes" className="mt-0">
                <MaterialTable 
                  materials={project.materials.filter(m => !m.confirmed)}
                  onEdit={handleEditMaterial}
                  onConfirm={handleConfirmChanges}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      
      {/* Dialogs */}
      <MaterialForm
        open={isAddingMaterial}
        onClose={() => setIsAddingMaterial(false)}
        onSave={handleSaveMaterial}
        isEdit={false}
      />
      
      <MaterialForm
        open={isEditingMaterial}
        onClose={() => setIsEditingMaterial(false)}
        onSave={handleSaveMaterial}
        initialData={selectedMaterial || undefined}
        isEdit={true}
      />
      
      <ImportExcel
        open={isImportingExcel}
        onClose={() => setIsImportingExcel(false)}
        onImport={handleImportMaterials}
      />
    </div>
  );
};

export default ProjectDetails;
