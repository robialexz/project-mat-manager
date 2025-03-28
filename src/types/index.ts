
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'purchaser' | 'viewer';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  status: 'active' | 'completed' | 'archived';
  materials: Material[];
}

export interface Material {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price?: number;
  supplier?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  status: 'pending' | 'ordered' | 'delivered';
  history: MaterialHistory[];
  confirmed: boolean;
}

export interface MaterialHistory {
  id: string;
  materialId: string;
  field: string;
  oldValue: string | number;
  newValue: string | number;
  changedAt: Date;
  changedBy: string;
  confirmed: boolean;
  confirmedBy?: string;
  confirmedAt?: Date;
}

export interface ProjectSummary {
  totalMaterials: number;
  pendingMaterials: number;
  orderedMaterials: number;
  deliveredMaterials: number;
  recentChanges: number;
}
