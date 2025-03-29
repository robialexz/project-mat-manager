import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, ListChecks, AlertTriangle } from 'lucide-react';
import ImportExcel from '@/components/ImportExcel'; // Assuming this component exists and works
import { Material, Project } from '@/types'; // Import necessary types
import { toast } from 'sonner';
import { useAuth } from '@/App'; // Use mock auth
// Import mock functions
import { parseExcelData } from '@/utils/materialUtils'; 
import { getUserProjectsMock as getUserProjects } from '@/utils/userUtils'; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; 
import { Label } from '@/components/ui/label'; 

const ImportMaterialsPage = () => {
  const { userId } = useAuth(); // Get mock userId
  const [isImporting, setIsImporting] = useState(false);
  const [importedMaterials, setImportedMaterials] = useState<Partial<Material>[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false); // Add saving state
  const [projects, setProjects] = useState<Project[]>([]); // State for user's projects
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(); // State for selected project

  // Fetch user's projects for the dropdown selector (using mock)
  useEffect(() => {
    if (userId) {
      const userProjects = getUserProjects(userId);
      setProjects(userProjects);
    }
  }, [userId]);

  // Handle data parsed from the Excel file
  const handleDataParsed = (parsedData: any[]) => { 
    let validMaterials: Partial<Material>[] = [];
    let currentErrorCount = 0;

    try {
      // Use the restored parseExcelData function
      validMaterials = parseExcelData(parsedData); 
      
      // Basic validation example (can be enhanced in parseExcelData)
      validMaterials = validMaterials.filter(mat => {
         if (!mat.name || !mat.quantity || !mat.unit) {
           currentErrorCount++;
           return false;
         }
         return true;
      });

    } catch (error) {
       console.error("Error parsing Excel data:", error);
       toast.error("Failed to parse the uploaded file.");
       currentErrorCount = parsedData.length; // Assume all rows failed if parsing fails
       validMaterials = [];
    }

    setImportedMaterials(validMaterials);
    setErrorCount(currentErrorCount);
    setIsImporting(false); // Close the import dialog

    if (currentErrorCount > 0) {
      toast.warning(`${currentErrorCount} rows had missing/invalid data or failed to parse.`);
    } 
    
    if (validMaterials.length > 0) {
      toast.success(`${validMaterials.length} materials parsed successfully. Review and save.`); 
    } else if (currentErrorCount === 0) { 
       toast.info("No valid materials found in the file.");
    }
  };

  // Handle saving imported materials (Mock for now)
  const handleSaveChanges = async () => {
     if (!userId) {
       toast.error("Authentication error.");
        return;
     }
     if (importedMaterials.length === 0) {
        toast.info("No materials to save.");
        return;
     }
     if (!selectedProjectId) { 
        toast.warning("Please select a project to import materials into.");
        return;
     }

     setIsSaving(true); 
     try {
       // Simulate saving delay
       await new Promise(resolve => setTimeout(resolve, 1000)); 
       
       // In a real app, call bulkAddMaterials from materialUtils (which would be async)
       // const result = await bulkAddMaterials(selectedProjectId, importedMaterials);
       
       // Mock success
       const result = { success: true, count: importedMaterials.length }; 
       
       if (result.success) {
         toast.success(`${result.count} materials imported successfully (mock)!`);
         setImportedMaterials([]); 
         setErrorCount(0);
         setSelectedProjectId(undefined); 
       } else {
          // toast.error(`Failed to import materials: ${result.message}`); // Use if real function returns error
          toast.error(`Failed to import materials (mock).`);
       }
       
     } catch (error) {
        console.error("Error saving imported materials:", error);
        toast.error("An unexpected error occurred while saving.");
     } finally {
        setIsSaving(false); 
     }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Import Materials</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>
            Upload an Excel (.xlsx, .xls) or CSV (.csv) file containing your material list. 
            Ensure columns like 'Name', 'Category', 'Quantity', 'Unit', 'Price'.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsImporting(true)}>
            <UploadCloud className="mr-2 h-4 w-4" />
            Select File to Import
          </Button>
          {/* ImportExcel component handles the actual upload and calls onImport */}
          <ImportExcel
            open={isImporting}
            onClose={() => setIsImporting(false)}
            onImport={handleDataParsed} 
          />
        </CardContent>
      </Card>

      {/* Preview and Save Section */}
      {importedMaterials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview Imported Materials</CardTitle>
            <CardDescription>
              Review the materials parsed from your file before saving. 
              {errorCount > 0 && (
                <span className="text-destructive font-medium ml-2">({errorCount} rows ignored due to errors)</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Preview Table */}
            <div className="overflow-x-auto rounded-md border max-h-96 mb-6">
              <table className="min-w-full divide-y divide-muted">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Unit</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Supplier</th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-muted">
                  {importedMaterials.map((material, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-foreground">{material.name || '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{material.category || '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{material.quantity || '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{material.unit || '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{material.price ? `$${material.price.toFixed(2)}` : '-'}</td>
                       <td className="px-4 py-2 whitespace-nowrap text-sm text-muted-foreground">{material.supplier || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end items-center space-y-3 sm:space-y-0 sm:space-x-3">
               <Button variant="outline" onClick={() => { setImportedMaterials([]); setErrorCount(0); setSelectedProjectId(undefined); }}>
                 Clear Preview
               </Button>
               {/* Project Selector */}
               <div className="w-full sm:w-auto sm:max-w-xs">
                 <Label htmlFor="project-select" className="sr-only">Select Project</Label>
                 <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                    <SelectTrigger id="project-select">
                      <SelectValue placeholder="Select Project to Import Into" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.length === 0 && <SelectItem value="loading" disabled>Loading projects...</SelectItem>}
                      {projects.map(proj => (
                        <SelectItem key={proj.id} value={proj.id}>{proj.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
               </div>
               <Button onClick={handleSaveChanges} disabled={!selectedProjectId || isSaving}>
                 {isSaving ? "Saving..." : <><ListChecks className="mr-2 h-4 w-4" /> Save to Project (Mock)</>}
               </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImportMaterialsPage;
