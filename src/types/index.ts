// Define ProjectTask and ProjectUpdate first as they are used in Project
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

// Define TeamMember as it's used in Project and Team
export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member' | 'client' | 'supplier';
  joinedAt: string;
  avatar?: string;
}

// Define MaterialHistory as it's used in Material
export interface MaterialHistory {
  id: string;
  materialId: string; 
  field: string; 
  oldValue: string | number | boolean; 
  newValue: string | number | boolean; 
  changedAt: string; // ISO string
  changedBy: string; // userId
  confirmed: boolean; 
  confirmedBy?: string; // userId (optional)
  confirmedAt?: string; // ISO string (optional)
}

// Define Material
export interface Material {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  supplier?: string; // supplierId or name? Keep consistent with usage
  ordered: boolean;
  delivered: boolean;
  status: 'pending' | 'ordered' | 'delivered' | 'cancelled'; 
  confirmed: boolean; 
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  history: MaterialHistory[]; 
  // projectId?: string; // Add if materials can exist outside projects or need explicit link
}

// Define Project
export interface Project {
  id: string;
  name: string;
  description: string;
  address: string;
  startDate: string; // ISO string or Date? Be consistent
  endDate: string;   // ISO string or Date?
  budget: number;
  status: 'active' | 'completed' | 'archived';
  progress: number;
  image?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  materials: Material[];
  team: TeamMember[];
  updates: ProjectUpdate[];
  tasks: ProjectTask[];
  // owner_id?: string; // Add if needed
}

// Define Team 
export interface Team {
  id: string;
  name: string;
  projectId: string; // Link to project
  members: TeamMember[];
  // Add other fields if used (description, createdBy, createdAt)
  description?: string;
  createdBy?: string; // userId
  createdAt?: string; // ISO string
}

// Define Invitation
export interface Invitation {
  id: string;
  email: string;
  teamId?: string; 
  projectId?: string; 
  role: 'admin' | 'manager' | 'member' | 'client' | 'supplier';
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: string; // ISO string
  expiresAt: string; // ISO string
  invitedBy?: string; // userId (optional)
}

// Define ProjectSummary
export interface ProjectSummary {
  totalMaterials: number; 
  pendingMaterials: number; 
  orderedMaterials: number; 
  deliveredMaterials: number; 
  recentChanges: number; 
}

// Define User (Profile)
export interface User {
  id: string; // Corresponds to Supabase auth.users.id and profiles.id
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'member' | 'client' | 'supplier';
  avatar?: string; // Corresponds to profiles.avatar_url
  projects: string[]; // Array of project IDs (needs separate logic/table like project_team_members)
  createdAt: string; // Corresponds to profiles.created_at
}
