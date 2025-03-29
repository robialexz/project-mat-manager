import { useState, useEffect } from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardDescription
    import { 
      Plus, FileUp, ArrowLeft, Package, Clock, TruckIcon, 
      CheckCircle, AlertCircle, Users, Calendar, DollarSign, MapPin, Archive // Added more icons
    } from 'lucide-react';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import { Progress } from '@/components/ui/progress';
    import { Badge } from '@/components/ui/badge';
    // Removed Navbar import, assuming it's in AppLayout
    import MaterialTable from '@/components/MaterialTable';
    import MaterialForm from '@/components/MaterialForm';
    import ImportExcel from '@/components/ImportExcel';
    // Use mock functions
    import { 
      createMaterial, updateMaterial, 
      confirmChanges, parseExcelData 
    } from '@/utils/materialUtils'; 
    import { getProjectByIdMock as getProjectById } from '@/utils/userUtils'; // Use mock function
    import { Material, Project } from '@/types'; 
    import { toast } from 'sonner';
    import { useAuth } from '@/App'; 

    const ProjectDetails = () => {
      const { projectId } = useParams<{ projectId: string }>();
      const { userId } = useAuth(); 
      const navigate = useNavigate(); // Initialize navigate
      const [project, setProject] = useState<Project | null>(null);
      const [isLoading, setIsLoading] = useState(true); 
      const [isAddingMaterial, setIsAddingMaterial] = useState(false);
      const [isEditingMaterial, setIsEditingMaterial] = useState(false);
      const [isImportingExcel, setIsImportingExcel] = useState(false);
      const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
      
      // Load project data using mock function
      useEffect(() => {
        setIsLoading(true);
        // Use the mock project function
        const foundProject = getProjectById(projectId || ''); // Use mock function
        if (foundProject) {
          setTimeout(() => {
            setProject(foundProject);
            setIsLoading(false);
          }, 300); 
        } else {
           toast.error("Project not found.");
           setProject(null);
           setIsLoading(false);
           // Optional: Redirect back if project not found
           // navigate('/projects'); 
        }
      }, [projectId, navigate]); // Added navigate to dependency array
      
      // Format date helper
      const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try { return new Date(dateString).toLocaleDateString(); } 
        catch (e) { return 'Invalid Date'; }
      };

       // Format currency helper
      const formatCurrency = (amount?: number) => { 
        if (amount === undefined || amount === null) return 'N/A';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
      };

      // Get status icon helper function
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

      // Loading state UI
      if (isLoading) {
         return (
          <div className="container mx-auto px-4 py-8">
             <div className="animate-pulse space-y-8">
               <div className="h-8 bg-muted rounded w-1/4"></div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-muted rounded-lg"></div>)}
               </div>
               <div className="h-96 bg-muted rounded-lg"></div>
             </div>
           </div>
         );
      }

      // Project not found state
      if (!project) {
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate('/projects')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </div>
            <div className="flex items-center justify-center h-[70vh]">
              <div className="text-center">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  The project you're looking for doesn't exist or you don't have access to it.
                </p>
                <Button onClick={() => navigate('/projects')}>Return to Projects</Button>
              </div>
            </div>
          </div>
        );
      }
      
      // Calculate project stats using mock data from the project state
      const materials = project.materials || []; 
      const totalMaterials = materials.length;
      const pendingMaterials = materials.filter(m => m.status === 'pending').length;
      const orderedMaterials = materials.filter(m => m.status === 'ordered').length;
      const deliveredMaterials = materials.filter(m => m.status === 'delivered').length;
      const recentChanges = materials.filter(m => !(m.confirmed ?? true)).length; 
      
      const progressPercentage = project.progress || 0; // Use progress from project data
      
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
         if (!userId || !project) { toast.error("Cannot save material."); return; }
         let updatedMaterials;
         if (selectedMaterial) {
           const updatedMaterial = updateMaterial(selectedMaterial, materialData, userId);
           updatedMaterials = materials.map(m => m.id === updatedMaterial.id ? updatedMaterial : m);
           toast.success('Material updated (mock)');
         } else {
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
         if (!userId || !project) { toast.error("Cannot confirm changes."); return; }
         const material = materials.find(m => m.id === materialId);
         if (!material) return;
         const confirmedMaterial = confirmChanges(material, userId);
         const updatedMaterials = materials.map(m => m.id === materialId ? confirmedMaterial : m);
         setProject(prev => prev ? ({ ...prev, materials: updatedMaterials }) : null);
         toast.success('Changes confirmed (mock)');
      };
      
      // Use mock import function
      const handleImportMaterials = (data: any[]) => {
         if (!userId || !project) { toast.error("Cannot import materials."); return; }
         try {
            const parsedMaterials = parseExcelData(data);
            const newMaterials = parsedMaterials
              .filter(mat => mat.name) 
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
        <div className="container mx-auto px-4 py-8 space-y-8"> 
          {/* Back Button */}
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate('/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </div>

          {/* Project Info Card */}
           <Card>
             <CardHeader>
                <div className="flex justify-between items-start">
                   <div>
                     <CardTitle className="text-2xl">{project.name}</CardTitle>
                     <CardDescription className="mt-1">{project.description || "No description"}</CardDescription>
                   </div>
                    <Badge 
                      variant={project.status === 'active' ? 'default' : project.status === 'completed' ? 'secondary' : 'outline'}
                      className="ml-2 capitalize whitespace-nowrap"
                    >
                       {getStatusIcon(project.status)}
                       <span className="ml-1">{project.status}</span>
                    </Badge>
                </div>
             </CardHeader>
             <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                   <MapPin className="h-4 w-4 mr-2 text-muted-foreground"/>
                   <span className="text-muted-foreground">{project.address || "No address"}</span>
                </div>
                 <div className="flex items-center">
                   <Calendar className="h-4 w-4 mr-2 text-muted-foreground"/>
                   <span className="text-muted-foreground">{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                </div>
                 <div className="flex items-center">
                   <DollarSign className="h-4 w-4 mr-2 text-muted-foreground"/>
                   <span className="text-muted-foreground">{formatCurrency(project.budget)}</span>
                </div>
                 <div className="flex items-center">
                   <Users className="h-4 w-4 mr-2 text-muted-foreground"/>
                   <span className="text-muted-foreground">{project.team?.length || 0} Team Members</span>
                </div>
             </CardContent>
           </Card>
          
          {/* Project Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Progress Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Progress</CardTitle>
                 <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressPercentage}%</div>
                <Progress value={progressPercentage} className="h-2 mt-2" />
              </CardContent>
            </Card>
            {/* Material Status Card */}
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Material Status</CardTitle>
                 <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                 <div className="text-lg font-bold">{totalMaterials} <span className="text-sm font-normal text-muted-foreground">Total</span></div>
                 <div className="flex justify-between text-xs mt-2">
                    <span>Pending: {pendingMaterials}</span>
                    <span>Ordered: {orderedMaterials}</span>
                    <span>Delivered: {deliveredMaterials}</span>
                 </div>
              </CardContent>
            </Card>
            {/* Recent Activity Card */}
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Recent Changes</CardTitle>
                 <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                 <div className="text-2xl font-bold">{recentChanges}</div>
                 <p className="text-xs text-muted-foreground">
                   {recentChanges > 0 ? "Materials with unconfirmed changes" : "All changes confirmed"}
                 </p>
              </CardContent>
            </Card>
            {/* Team Card */}
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-sm font-medium">Team</CardTitle>
                 <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                 <div className="text-2xl font-bold">{project.team?.length || 0}</div>
                 {/* Display avatars */}
                 {project.team && project.team.length > 0 && (
                   <div className="flex -space-x-2 mt-2">
                     {project.team.slice(0, 5).map((member, index) => (
                       <div key={member.id || index} className="w-6 h-6 rounded-full border border-background bg-muted flex items-center justify-center text-[10px] font-medium" title={member.name}>
                         {member.name ? member.name.substring(0, 2).toUpperCase() : '?'}
                       </div>
                     ))}
                     {project.team.length > 5 && (
                       <div className="w-6 h-6 rounded-full border border-background bg-muted flex items-center justify-center text-[10px] font-medium">
                         +{project.team.length - 5}
                       </div>
                     )}
                   </div>
                 )}
                 {(!project.team || project.team.length === 0) && (
                    <p className="text-xs text-muted-foreground mt-2">No team members assigned.</p>
                 )}
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
