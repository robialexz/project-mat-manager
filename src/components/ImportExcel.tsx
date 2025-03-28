
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { FileSpreadsheet, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { parseExcelData } from '@/utils/materialUtils';
import { toast } from 'sonner';

interface ImportExcelProps {
  open: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

export default function ImportExcel({ open, onClose, onImport }: ImportExcelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [parseComplete, setParseComplete] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      toast.error('Please upload an Excel (.xlsx, .xls) or CSV file');
      return;
    }
    
    setUploadedFile(file);
    setIsParsing(true);
    
    try {
      // In a real application, use a library like xlsx or papaparse to parse the file
      // For this demo, we'll simulate parsing with a timeout and mock data
      setTimeout(() => {
        // Mock some parsed data for preview
        const mockData = [
          { name: 'Concrete', category: 'Structural', quantity: 50, unit: 'm³', price: 1200, supplier: 'Acme Concrete' },
          { name: 'Rebar', category: 'Structural', quantity: 500, unit: 'kg', price: 800, supplier: 'Steel Plus' },
          { name: 'Drywall', category: 'Finish', quantity: 25, unit: 'pcs', price: 350, supplier: 'Building Materials Co.' },
        ];
        
        setPreviewData(mockData);
        setIsParsing(false);
        setParseComplete(true);
      }, 1000);
    } catch (error) {
      console.error('Error parsing file:', error);
      toast.error('Error parsing file. Please try again.');
      setIsParsing(false);
    }
  };
  
  const handleImport = () => {
    onImport(previewData);
    onClose();
    toast.success(`Successfully imported ${previewData.length} materials`);
  };
  
  const resetImport = () => {
    setUploadedFile(null);
    setPreviewData([]);
    setParseComplete(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Import Materials from Excel</DialogTitle>
        </DialogHeader>
        
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-10 text-center ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Drag and drop your Excel file here</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports Excel (.xlsx, .xls) and CSV files
            </p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileInput}
              className="hidden"
              id="excel-upload"
            />
            <label htmlFor="excel-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 bg-muted/30 p-4 rounded-md">
              <FileSpreadsheet className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <h4 className="font-medium">{uploadedFile.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {uploadedFile.size ? `${Math.round(uploadedFile.size / 1024)} KB` : ''}
                </p>
              </div>
              {isParsing ? (
                <div className="flex items-center text-muted-foreground">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Parsing...
                </div>
              ) : parseComplete ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500" />
              )}
            </div>
            
            {parseComplete && (
              <>
                <div className="border rounded-md overflow-auto max-h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead>Supplier</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.name}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell className="text-right">{row.quantity}</TableCell>
                          <TableCell>{row.unit}</TableCell>
                          <TableCell className="text-right">{row.price}</TableCell>
                          <TableCell>{row.supplier}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetImport}>
                    Import Different File
                  </Button>
                  <Button onClick={handleImport}>
                    Import {previewData.length} Materials
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
