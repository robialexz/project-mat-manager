import { Material, Project, ProjectSummary } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Create a new material
export const createMaterial = (material: Omit<Material, 'id' | 'createdAt' | 'updatedAt' | 'history'>, userId: string): Material => {
  const now = new Date();
  return {
    ...material,
    id: `mat_${Date.now()}`,
    createdAt: now,
    updatedAt: now,
    createdBy: userId,
    updatedBy: userId,
    history: [],
    confirmed: false
  };
};

// Update a material and track changes
export const updateMaterial = (
  material: Material,
  updates: Partial<Omit<Material, 'id' | 'createdAt' | 'updatedAt' | 'history'>>,
  userId: string
): Material => {
  const now = new Date();
  const newHistory: MaterialHistory[] = [...material.history];
  
  // Track changes for each updated field
  Object.entries(updates).forEach(([key, newValue]) => {
    const oldValue = material[key as keyof Material];
    if (oldValue !== newValue && key !== 'updatedAt' && key !== 'updatedBy') {
      newHistory.push({
        id: `hist_${Date.now()}_${key}`,
        materialId: material.id,
        field: key,
        oldValue: oldValue as string | number,
        newValue: newValue as string | number,
        changedAt: now,
        changedBy: userId,
        confirmed: false
      });
    }
  });
  
  return {
    ...material,
    ...updates,
    updatedAt: now,
    updatedBy: userId,
    history: newHistory,
    confirmed: false
  };
};

// Confirm changes to a material
export const confirmChanges = (material: Material, userId: string): Material => {
  const now = new Date();
  
  // Mark all unconfirmed history items as confirmed
  const updatedHistory = material.history.map(hist => 
    hist.confirmed ? 
      hist : 
      {
        ...hist,
        confirmed: true,
        confirmedBy: userId,
        confirmedAt: now
      }
  );
  
  return {
    ...material,
    history: updatedHistory,
    confirmed: true
  };
};

// Parse Excel data (simplified version)
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

// Helper to get a summary of changes for a material
export const getMaterialChangeSummary = (material: Material): string => {
  const unconfirmedChanges = material.history.filter(h => !h.confirmed);
  if (unconfirmedChanges.length === 0) return '';
  
  return unconfirmedChanges
    .map(h => `${h.field}: ${h.oldValue} → ${h.newValue}`)
    .join(', ');
};

// Mock data generator
export const generateMockProjects = (count: number = 3): Project[] => {
  const projects: Project[] = [];
  const categories = ['Structural', 'Electrical', 'Plumbing', 'Finish', 'HVAC'];
  const units = ['pcs', 'kg', 'm', 'm²', 'm³', 'roll', 'pack'];
  const names = [
    'Concrete', 'Rebar', 'Timber', 'Drywall', 'Paint', 'Cables', 
    'Conduit', 'Pipes', 'Fixtures', 'Insulation', 'Bricks', 'Tiles'
  ];
  
  for (let i = 0; i < count; i++) {
    const materialCount = 5 + Math.floor(Math.random() * 10);
    const materials: Material[] = [];
    
    for (let j = 0; j < materialCount; j++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const unit = units[Math.floor(Math.random() * units.length)];
      
      materials.push({
        id: `mat_${i}_${j}`,
        name: `${name} ${j+1}`,
        category,
        quantity: Math.floor(Math.random() * 100) + 1,
        unit,
        price: Math.floor(Math.random() * 1000) + 1,
        supplier: `Supplier ${j % 5 + 1}`,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000),
        createdBy: 'user_1',
        updatedBy: 'user_1',
        status: Math.random() > 0.7 ? 'ordered' : (Math.random() > 0.5 ? 'delivered' : 'pending'),
        history: [],
        confirmed: true
      });
    }
    
    // Add some changes to make it interesting
    if (materials.length > 0) {
      const randMaterial = materials[Math.floor(Math.random() * materials.length)];
      const oldQuantity = randMaterial.quantity;
      randMaterial.quantity = oldQuantity + 10;
      randMaterial.updatedAt = new Date();
      randMaterial.confirmed = false;
      randMaterial.history.push({
        id: `hist_${i}_change_1`,
        materialId: randMaterial.id,
        field: 'quantity',
        oldValue: oldQuantity,
        newValue: randMaterial.quantity,
        changedAt: new Date(),
        changedBy: 'user_1',
        confirmed: false
      });
    }
    
    projects.push({
      id: `proj_${i}`,
      name: `Project ${i+1}`,
      description: `This is a sample project ${i+1} with various materials.`,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      createdBy: 'user_1',
      status: Math.random() > 0.7 ? 'completed' : 'active',
      materials
    });
  }
  
  return projects;
};

// Helper function to get project summary stats
export const getProjectSummary = (project: Project): ProjectSummary => {
  const totalMaterials = project.materials.length;
  const pendingMaterials = project.materials.filter(m => m.status === 'pending').length;
  const orderedMaterials = project.materials.filter(m => m.status === 'ordered').length;
  const deliveredMaterials = project.materials.filter(m => m.status === 'delivered').length;
  const recentChanges = project.materials.filter(m => !m.confirmed).length;
  
  return {
    totalMaterials,
    pendingMaterials,
    orderedMaterials,
    deliveredMaterials,
    recentChanges
  };
};
