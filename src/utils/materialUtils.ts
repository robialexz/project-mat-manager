import { Material, Project, ProjectSummary, MaterialHistory } from '@/types';
import { v4 as uuidv4 } from 'uuid';
// Removed Supabase client import as we are reverting to mock
// import { supabase } from '@/lib/supabaseClient'; 
// import { toast } from 'sonner'; 

// --- Mock Functions (Restored) ---

// Create a new material (Mock)
export const createMaterial = (
  material: Omit<Material, 'id' | 'createdAt' | 'updatedAt' | 'history' | 'confirmed'>, 
  userId: string // userId might be used for createdBy/updatedBy if those fields exist in type
): Material => {
  const now = new Date();
  // Ensure the returned object matches the Material type definition
  const newMaterial: Material = {
    ...material,
    id: `mat_${uuidv4()}`, // Use uuid for better uniqueness
    createdAt: now.toISOString(), 
    updatedAt: now.toISOString(), 
    history: [],
    confirmed: true, // Default to confirmed for new mock materials? Or false?
    // Add other required fields from Material type with default values if necessary
    status: material.status || 'pending', // Ensure status has a default
    ordered: material.ordered || false,
    delivered: material.delivered || false,
  };
  // Add createdBy/updatedBy if they exist in your Material type
  // newMaterial.createdBy = userId; 
  // newMaterial.updatedBy = userId;
  return newMaterial;
};

// Update a material and track changes (Mock)
export const updateMaterial = (
  material: Material,
  updates: Partial<Omit<Material, 'id' | 'createdAt' | 'updatedAt' | 'history'>>,
  userId: string // userId might be used for updatedBy or history
): Material => {
  const now = new Date();
  const newHistory: MaterialHistory[] = [...(material.history || [])]; // Handle potentially undefined history

  // Track changes for each updated field
  Object.entries(updates).forEach(([key, newValue]) => {
    const oldValue = material[key as keyof Material];
    // Check if key is a valid field and value changed
    if (key !== 'id' && key !== 'createdAt' && key !== 'history' && oldValue !== newValue) {
       // Ensure the history entry matches the MaterialHistory type
       newHistory.push({
         id: `hist_${uuidv4()}`, 
         materialId: material.id,
         field: key,
         oldValue: oldValue as string | number | boolean, 
         newValue: newValue as string | number | boolean, 
         changedAt: now.toISOString(), 
         changedBy: userId, 
         confirmed: false // Changes are initially unconfirmed
       });
    }
  });
  
  const updatedMaterial: Material = {
    ...material,
    ...updates,
    updatedAt: now.toISOString(), 
    history: newHistory,
    confirmed: false // Mark material as unconfirmed due to changes
  };
   // Add updatedBy if it exists in your Material type
   // updatedMaterial.updatedBy = userId;
  return updatedMaterial;
};

// Confirm changes to a material (Mock)
export const confirmChanges = (material: Material, userId: string): Material => {
  const now = new Date();
  
  // Mark all unconfirmed history items as confirmed
  const updatedHistory = (material.history || []).map(hist => 
    hist.confirmed ? 
      hist : 
      {
        ...hist,
        confirmed: true,
        confirmedBy: userId,
        confirmedAt: now.toISOString() 
      }
  );
  
  return {
    ...material,
    history: updatedHistory,
    confirmed: true // Mark the material itself as confirmed
  };
};

// Parse Excel data (simplified version - kept as is)
export const parseExcelData = (data: any[]): Partial<Material>[] => {
  return data.map(row => ({
    name: row.name || row.Name || row['Material Name'] || '',
    category: row.category || row.Category || row.Type || '',
    quantity: Number(row.quantity || row.Quantity || row.Amount || 0),
    unit: row.unit || row.Unit || row.UOM || '',
    price: Number(row.price || row.Price || row.Cost || 0),
    supplier: row.supplier || row.Supplier || row.Vendor || '',
    status: 'pending'
  }));
};

// Helper to get a summary of changes for a material (Mock)
export const getMaterialChangeSummary = (material: Material): string => {
  const unconfirmedChanges = (material.history || []).filter(h => !h.confirmed);
  if (unconfirmedChanges.length === 0) return 'No unconfirmed changes';
  
  return unconfirmedChanges
    .map(h => `${h.field}: ${h.oldValue} → ${h.newValue}`)
    .join(', ');
};


// Helper function to get project summary stats (Mock)
export const getProjectSummary = (project: Project): ProjectSummary => {
  const materials = project.materials || []; // Use default empty array
  const totalMaterials = materials.length;
  const pendingMaterials = materials.filter(m => m.status === 'pending').length;
  const orderedMaterials = materials.filter(m => m.status === 'ordered').length;
  const deliveredMaterials = materials.filter(m => m.status === 'delivered').length;
  // Use optional chaining for history and confirmed properties
  const recentChanges = materials.filter(m => !(m.confirmed ?? true)).length; 
  
  return {
    totalMaterials,
    pendingMaterials,
    orderedMaterials,
    deliveredMaterials,
    recentChanges
  };
};

// NOTE: generateMockProjects was moved to userUtils.ts and should be imported from there if needed.

// Mock data generation for MaterialHistory (Moved from MaterialHistory.tsx)
export const generateMockMaterialHistory = (projects: Project[]): MaterialHistory[] => {
  const history: MaterialHistory[] = [];
  const fields = ['quantity', 'price', 'status', 'supplier'];
  const users = ['user_1', 'user_2', 'user_3']; // Mock user IDs

  projects.forEach(project => {
    (project.materials || []).forEach(material => { // Add null check for materials
      const changeCount = Math.floor(Math.random() * 3); 
      let currentQty = material.quantity;
      let currentPrice = material.price;
      let currentStatus = material.status;

      for (let i = 0; i < changeCount; i++) {
        const field = fields[Math.floor(Math.random() * fields.length)];
        const changedAt = new Date(Date.parse(material.createdAt) + Math.random() * (Date.now() - Date.parse(material.createdAt))).toISOString();
        const changedBy = users[Math.floor(Math.random() * users.length)];
        let oldValue: any = null;
        let newValue: any = null;

        switch (field) {
          case 'quantity':
            oldValue = currentQty;
            newValue = Math.max(0, currentQty + Math.floor(Math.random() * 21) - 10); 
            currentQty = newValue;
            break;
          case 'price':
            oldValue = currentPrice;
            newValue = Math.max(0, currentPrice + (Math.random() * 20 - 10)); 
            currentPrice = newValue;
            break;
          case 'status':
            oldValue = currentStatus;
            const statuses: Material['status'][] = ['pending', 'ordered', 'delivered', 'cancelled'];
            newValue = statuses[Math.floor(Math.random() * statuses.length)];
            currentStatus = newValue;
            break;
           case 'supplier':
             oldValue = material.supplier; 
             newValue = `Supplier ${Math.floor(Math.random() * 5) + 1}`;
             break;
        }

        if (oldValue !== newValue) {
          history.push({
            id: `hist_${material.id}_${i}`,
            materialId: material.id,
            field: field,
            oldValue: oldValue,
            newValue: newValue,
            changedAt: changedAt,
            changedBy: changedBy,
            confirmed: Math.random() > 0.3, 
            // projectId: project.id // Add projectId if needed
          });
        }
      }
    });
  });
  return history.sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());
};
