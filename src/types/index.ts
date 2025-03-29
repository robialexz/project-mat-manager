
export interface Project {
  id: string;
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'active' | 'completed' | 'archived';
  progress: number;
  image?: string;
  materials: Material[];
  team: TeamMember[];
  updates: ProjectUpdate[];
  tasks: ProjectTask[];
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  assignedTo: string; // userId
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface ProjectUpdate {
  id: string;
  message: string;
  createdBy: string; // userId
  createdAt: string;
  attachments?: string[];
}

export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member' | 'client' | 'supplier';
  joinedAt: string;
  avatar?: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  supplier?: string;
  ordered: boolean;
  delivered: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'member' | 'client' | 'supplier';
  avatar?: string;
  projects: string[]; // Array of project IDs
  createdAt: string;
}
