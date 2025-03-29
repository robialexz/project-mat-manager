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
import Navbar from '@/components/Navbar'; // Assuming Navbar exists at this commit
import MaterialTable from '@/components/MaterialTable';
import MaterialForm from '@/components/MaterialForm';
import ImportExcel from '@/components/ImportExcel';
// Import mock functions from the correct locations based on commit 7473f50
import { 
  createMaterial, updateMaterial, 
  confirmChanges, parseExcelData 
} from '@/utils/materialUtils'; 
import { generateMockProjects } from '@/utils/userUtils'; // Corrected import path
import { Material, Project } from '@/types'; // Assuming types are correct at this commit
import { toast } from 'sonner';
import { useAuth } from '@/App'; // Import useAuth for userId

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { userId } = useAuth(); // Get userId from auth context
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Use a single loading state for simplicity now
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);
  const [isImportingExcel, setIsImportingExcel] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  
  // Load project data using mock function
  useEffect(() => {
    setIsLoading(true);
    // Use the mock project generator from userUtils
    const mockProjects = generateMockProjects(6); // Assuming this function exists in userUtils now
    const foundProject = mockProjects.find(p => p.id === projectId);
    if (foundProject) {
      // Simulate async loading
      setTimeout(() => {
        setProject(foundProject);
        setIsLoading(false);
      }, 300); // Short delay
    } else {
       toast.error("Project not found.");
       setProject(null);
       setIsLoading(false);
    }
  }, [projectId]);
  
  // Loading state UI
  if (isLoading) {
     return (
      <div className="min-h-screen bg-background">
        {/* <Navbar /> */} {/* Navbar might be in AppLayout */}
        <main className="container mx-auto px-4 py-8">
           <div className="animate-pulse space-y-4">
             <div className="h-8 bg-muted rounded w-1/4"></div>
             <div className="h-4 bg-muted rounded w-2/4"></div>
             <div className="h-64 bg-muted rounded"></div>
           </div>
        </main>
      </div>
     );
  }

  // Project not found state
  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        {/* <Navbar /> */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="sm" className="mr-2" asChild>
              <Link to="/projects"> {/* Link back to projects list */}
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
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
                <Link to="/projects">Return to Projects</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Calculate project stats using mock data from the project state
  const materials = project.materials || []; 
  const totalMaterials = materials.length;
  const pendingMaterials = materials.filter(m => m.status === 'pending').length;
  const orderedMaterials = materials.filter(m => m.status === 'ordered').length;
  const deliveredMaterials = materials.filter(m => m.status === 'delivered').length;
  const recentChanges = materials.filter(m => !(m.confirmed ?? true)).length; // Use optional chaining and default to true if confirmed is missing
  
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
  
  // Use mock save function
  const handleSaveMaterial = (materialData: Partial<Material>) => {
     if (!userId || !project) {
       toast.error("Cannot save material.");
       return;
     }
     
     let updatedMaterials;
     if (selectedMaterial) {
       // Update existing material (mock)
       const updatedMaterial = updateMaterial(selectedMaterial, materialData, userId);
       updatedMaterials = materials.map(m => m.id === updatedMaterial.id ? updatedMaterial : m);
       toast.success('Material updated (mock)');
     } else {
       // Create new material (mock)
       const newMaterial = createMaterial(
         materialData as Omit<Material, 'id' | 'createdAt' | 'updatedAt' | 'history' | 'confirmed'>, 
         userId
       );
       updatedMaterials = [...materials, newMaterial];
       toast.success('Material added (mock)');
     }
     
     setProject(prev => prev ? ({ ...prev, materials: updatedMaterials, updatedAt: new Date().toISOString() }) : null);
     setIsAddingMaterial(false);
     setIsEditingMaterial(false);
     setSelectedMaterial(null);
  };
  
  // Use mock confirm function
  const handleConfirmChanges = (materialId: string) => {
     if (!userId || !project) {
       toast.error("Cannot confirm changes.");
       return;
     }
     const material = materials.find(m => m.id === materialId);
     if (!material) return;
     
     const confirmedMaterial = confirmChanges(material, userId);
     const updatedMaterials = materials.map(m => m.id === materialId ? confirmedMaterial : m);
     
     setProject(prev => prev ? ({ ...prev, materials: updatedMaterials }) : null);
     toast.success('Changes confirmed (mock)');
  };
  
  // Use mock import function
  const handleImportMaterials = (data: any[]) => {
     if (!userId || !project) {
       toast.error("Cannot import materials.");
       return;
     }
     try {
        const parsedMaterials = parseExcelData(data);
        const newMaterials = parsedMaterials
          .filter(mat => mat.name) // Basic validation
          .map(materialData => 
             createMaterial(
               materialData as Omit<Material, 'id' | 'createdAt' | 'updatedAt' | 'history' | 'confirmed'>,
               userId
             )
          );
        
        setProject(prev => prev ? ({ 
          ...prev, 
          materials: [...prev.materials, ...newMaterials], 
          updatedAt: new Date().toISOString() 
        }) : null);
        toast.success(`${newMaterials.length} materials imported (mock)`);
     } catch (error) {
        console.error("Error parsing/importing materials:", error);
        toast.error("Failed to import materials.");
     } finally {
        setIsImportingExcel(false);
     }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */} {/* Assuming Navbar is in AppLayout */}
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button and Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link to="/projects"> 
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
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
        
        {/* Project Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Cards remain the same, using calculated stats */}
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
                    There are {recentChanges} materials with unconfirmed changes.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  All material updates confirmed.
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
                <span>{project.team?.length || 0}</span> 
              </div>
              <div className="flex -space-x-2">
                 {project.team?.slice(0, 4).map((member, index) => (
                   <div key={member.id || index} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs" title={member.name}>
                     {member.name ? member.name.substring(0, 2).toUpperCase() : '?'}
                   </div>
                 ))}
                 {project.team && project.team.length > 4 && (
                   <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                     +{project.team.length - 4}
                   </div>
                 )}
                 {(!project.team || project.team.length === 0) && (
                    <p className="text-xs text-muted-foreground">No team members yet.</p>
                 )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Materials Section */}
        <div>
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center flex-wrap gap-2"> 
                <h2 className="text-2xl font-bold mr-4 whitespace-nowrap">Materials</h2> 
                <TabsList>
                  <TabsTrigger value="all">All ({totalMaterials})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({pendingMaterials})</TabsTrigger>
                  <TabsTrigger value="ordered">Ordered ({orderedMaterials})</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered ({deliveredMaterials})</TabsTrigger>
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
              
              <div className="flex space-x-2 mt-2 md:mt-0"> 
                <Button onClick={() => setIsImportingExcel(true)} variant="outline" size="sm"> 
                  <FileUp className="h-4 w-4 mr-1" />
                  Import
                </Button>
                <Button onClick={handleAddMaterial} size="sm"> 
                  <Plus className="h-4 w-4 mr-1" />
                  Add Material
                </Button>
              </div>
            </div>
            
            {/* Pass materials state (which comes from project state) */}
            <TabsContent value="all" className="mt-0">
              <MaterialTable 
                materials={materials} 
                onEdit={handleEditMaterial}
                onConfirm={handleConfirmChanges}
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              <MaterialTable 
                materials={materials.filter(m => m.status === 'pending')}
                onEdit={handleEditMaterial}
                onConfirm={handleConfirmChanges}
              />
            </TabsContent>
            <TabsContent value="ordered" className="mt-0">
              <MaterialTable 
                materials={materials.filter(m => m.status === 'ordered')}
                onEdit={handleEditMaterial}
                onConfirm={handleConfirmChanges}
              />
            </TabsContent>
            <TabsContent value="delivered" className="mt-0">
              <MaterialTable 
                materials={materials.filter(m => m.status === 'delivered')}
                onEdit={handleEditMaterial}
                onConfirm={handleConfirmChanges}
              />
            </TabsContent>
            {recentChanges > 0 && (
              <TabsContent value="changes" className="mt-0">
                <MaterialTable 
                  materials={materials.filter(m => !(m.confirmed ?? true))}
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
