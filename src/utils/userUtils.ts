import { v4 as uuidv4 } from 'uuid';
// Import types that likely existed at commit 7473f50
import { Project, User, TeamMember, Material } from '@/types'; 
// Removed Supabase client import as we are using mock functions now
// import { supabase } from '@/lib/supabaseClient'; 

// --- Mock Data Generators (Restored for Users.tsx compatibility) ---

// Mock data generator for Projects (Keep if needed by other mocks)
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
        ordered: Math.random() > 0.5,
        delivered: Math.random() > 0.3,
        status: Math.random() > 0.7 ? 'ordered' : (Math.random() > 0.5 ? 'delivered' : 'pending'),
        confirmed: true, 
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000).toISOString(),
        history: [], 
      });
    }
    
    projects.push({
      id: `proj_${i}`,
      name: `Project ${i+1}`,
      description: `This is a sample project ${i+1} with various materials.`,
      address: `${i+1}00 Mock St`, 
      startDate: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
      budget: Math.floor(Math.random() * 500000) + 50000,
      status: Math.random() > 0.7 ? 'completed' : 'active',
      progress: Math.floor(Math.random() * 100),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      materials, 
      team: [], // Initialize team
      updates: [], // Initialize updates
      tasks: [] // Initialize tasks
    });
  }
  
  return projects;
};

// Generate Mock Users
export const generateMockUsers = (count: number = 10): User[] => {
  const users: User[] = [];
  const roles: User['role'][] = ['admin', 'manager', 'member', 'client', 'supplier'];
  for (let i = 0; i < count; i++) {
    users.push({
      id: `user_${uuidv4()}`,
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
      role: roles[i % roles.length],
      avatar: `https://i.pravatar.cc/150?u=user${i + 1}`,
      projects: [], 
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), 
    });
  }
  if (!users.some(u => u.role === 'admin')) {
      if (users.length > 0) users[0].role = 'admin';
  }
  return users;
};

// Generate Mock Teams (Return type 'any' as Team type might not exist in older types/index.ts)
export const generateMockTeams = (projects: Project[], users: User[]): any[] => {
  const teams: any[] = []; 
  projects.forEach(project => {
    const teamMembers: TeamMember[] = [];
    const teamSize = Math.floor(Math.random() * 5) + 2; 
    const availableUsers = [...users]; 

    project.team?.forEach(existingMember => { 
        if (!teamMembers.some(tm => tm.userId === existingMember.userId)) {
            teamMembers.push(existingMember);
            const userIndex = availableUsers.findIndex(u => u.id === existingMember.userId);
            if (userIndex > -1) availableUsers.splice(userIndex, 1);
        }
    });

    for (let i = teamMembers.length; i < teamSize && availableUsers.length > 0; i++) {
      const randomUserIndex = Math.floor(Math.random() * availableUsers.length);
      const user = availableUsers.splice(randomUserIndex, 1)[0];

      if (!teamMembers.some(tm => tm.userId === user.id)) {
          const role = user.role === 'admin' || user.role === 'manager' ? user.role : (['member', 'client', 'supplier'] as const)[Math.floor(Math.random() * 3)];
          teamMembers.push({
            id: `team_member_${uuidv4()}`,
            userId: user.id,
            name: user.name,
            email: user.email,
            role: role,
            joinedAt: new Date(Date.parse(project.startDate) + Math.random() * (Date.now() - Date.parse(project.startDate))).toISOString(),
            avatar: user.avatar,
          });
          const mainUserIndex = users.findIndex(u => u.id === user.id);
          if (mainUserIndex > -1 && !users[mainUserIndex].projects.includes(project.id)) {
              users[mainUserIndex].projects.push(project.id);
          }
      }
    }
    
    // Assign generated members back to the project object if using window.mockProjects
     const projIndex = window.mockProjects?.findIndex(p => p.id === project.id);
     if (window.mockProjects && projIndex !== undefined && projIndex > -1) {
         window.mockProjects[projIndex].team = teamMembers;
     }

    teams.push({
      id: `team_${project.id}`, 
      name: `${project.name} Team`,
      projectId: project.id,
      members: teamMembers,
      description: `Team for ${project.name}`,
      createdBy: users.find(u => u.role === 'admin')?.id || users[0]?.id, 
      createdAt: new Date(Date.parse(project.createdAt) + Math.random() * (Date.now() - Date.parse(project.createdAt))).toISOString(),
    });
  });
  return teams;
};

// Generate Mock Team Members 
export const generateMockTeamMembers = (teams: any[], users: User[]): TeamMember[] => {
    const allMembers: TeamMember[] = [];
    teams.forEach(team => {
        if (team.members) { 
           allMembers.push(...team.members);
        }
    });
    return allMembers; 
};

// Generate Mock Invitations (Return type 'any' as Invitation type might not exist)
export const generateMockInvitations = (count: number = 5): any[] => {
  const invitations: any[] = []; 
  const roles: User['role'][] = ['manager', 'member', 'client', 'supplier']; 
  const statuses = ['pending', 'accepted', 'expired']; 
  for (let i = 0; i < count; i++) {
    const createdAt = new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000); 
    const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000); 
    invitations.push({
      id: `invitation_${uuidv4()}`,
      email: `invitee${i + 1}@example.com`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      invitedBy: `user_${i % 3 + 1}`, 
      teamId: `team_proj_${i % 2}`, 
    });
  }
  return invitations;
};

// Create Invitation (Mock - Return type 'any')
// Adjusted signature to match Users.tsx call (email, teamId, role, invitedBy)
export const createInvitation = (
  email: string,
  teamId: string, 
  role: User['role'], 
  invitedBy: string 
): any => { 
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000); 

  const newInvitation: any = { 
    id: `invitation_${uuidv4()}`,
    email,
    role,
    status: 'pending',
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    teamId, 
    invitedBy, 
  };

  // Removed interaction with window.mockInvitations
  console.log(`Mock Invitation created for ${email}`, newInvitation); 
  return newInvitation;
};

// Verify Invitation Code (Mock - using ID as code, return type 'any')
// Adjusted signature to match Users.tsx call (email, code, invitations list)
export const verifyInvitationCode = (email: string, code: string, invitations: any[]): any | null => { 
    console.log("Verifying mock invitation code:", code, "for email:", email);
    
    const invitation = invitations.find(inv => inv.id === code && inv.email.toLowerCase() === email.toLowerCase());
    console.log("Found mock invitation:", invitation);

    if (!invitation) {
        console.log("Invitation not found or email mismatch");
        return null; 
    }

    if (invitation.status !== 'pending') {
        console.log("Invitation status not pending:", invitation.status);
        return null; 
    }

    const now = new Date();
    const expiresAt = new Date(invitation.expiresAt);

    if (now > expiresAt) {
        console.log("Invitation expired");
        return null; 
    }

    console.log("Invitation verified successfully");
    return invitation; 
};


// --- Original Mock-based CRUD Functions ---
// These functions operate on the window.mock* arrays

export const getUserProjectsMock = (userId: string): Project[] => {
  if (typeof window === 'undefined' || !window.mockProjects || !window.mockUsers) return [];
  const user = window.mockUsers.find(u => u.id === userId);
  if (!user) return [];
  if (user.role === 'admin') return [...window.mockProjects];
  return window.mockProjects.filter(project => 
    user.projects.includes(project.id) || 
    project.team?.some(member => member.userId === userId) 
  );
};

export const getProjectByIdMock = (projectId: string): Project | undefined => {
  if (typeof window === 'undefined' || !window.mockProjects) return undefined;
  return window.mockProjects.find(project => project.id === projectId);
};

export const getUserByIdMock = (userId: string): User | undefined => {
  if (typeof window === 'undefined' || !window.mockUsers) return undefined;
  return window.mockUsers.find(user => user.id === userId);
};

export const getUserByEmailMock = (email: string): User | undefined => {
  if (typeof window === 'undefined' || !window.mockUsers) return undefined;
  return window.mockUsers.find(user => user.email === email);
};

export const getAllUsersMock = (): User[] => {
  if (typeof window === 'undefined' || !window.mockUsers) return [];
  return [...window.mockUsers];
};

export const createUserMock = (
  email: string,
  name: string,
  role: User['role'] = 'member'
): User => {
  const newUser: User = {
    id: `user_${uuidv4()}`, email, name, role, projects: [], createdAt: new Date().toISOString()
  };
  if (typeof window !== 'undefined') {
    if (!window.mockUsers) window.mockUsers = [];
    window.mockUsers.push(newUser);
  }
  return newUser;
};

export const updateUserMock = (userId: string, updates: Partial<User>): User | undefined => {
  if (typeof window === 'undefined' || !window.mockUsers) return undefined;
  const userIndex = window.mockUsers.findIndex(user => user.id === userId);
  if (userIndex === -1) return undefined;
  const updatedUser = { ...window.mockUsers[userIndex], ...updates };
  window.mockUsers[userIndex] = updatedUser;
  return updatedUser;
};

export const deleteUserMock = (userId: string): boolean => {
  if (typeof window === 'undefined' || !window.mockUsers) return false;
  const initialLength = window.mockUsers.length;
  window.mockUsers = window.mockUsers.filter(user => user.id !== userId);
  return window.mockUsers.length < initialLength;
};

export const addUserToProjectMock = (
  userId: string,
  projectId: string,
  role: TeamMember['role'] = 'member'
): boolean => {
   if (typeof window === 'undefined' || !window.mockProjects || !window.mockUsers) return false;
   const user = window.mockUsers.find(u => u.id === userId);
   if (!user) return false;
   const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
   if (projectIndex === -1) return false;
   if (!window.mockProjects[projectIndex].team) window.mockProjects[projectIndex].team = []; 
   const isUserInProject = window.mockProjects[projectIndex].team.some(member => member.userId === userId);
   if (!isUserInProject) {
     const newTeamMember: TeamMember = {
       id: `team_${uuidv4()}`, userId, name: user.name, email: user.email, role, joinedAt: new Date().toISOString(), avatar: user.avatar
     };
     window.mockProjects[projectIndex].team.push(newTeamMember);
   }
   if (!user.projects.includes(projectId)) {
     user.projects.push(projectId);
     const userIndex = window.mockUsers.findIndex(u => u.id === userId);
     if (userIndex !== -1) window.mockUsers[userIndex] = user;
   }
   return true;
};

export const removeUserFromProjectMock = (userId: string, projectId: string): boolean => {
   if (typeof window === 'undefined' || !window.mockProjects || !window.mockUsers) return false;
   const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
   if (projectIndex === -1) return false;
   if (window.mockProjects[projectIndex].team) {
      window.mockProjects[projectIndex].team = window.mockProjects[projectIndex].team.filter(member => member.userId !== userId);
   }
   const userIndex = window.mockUsers.findIndex(u => u.id === userId);
   if (userIndex === -1) return false;
   window.mockUsers[userIndex].projects = window.mockUsers[userIndex].projects.filter(id => id !== projectId);
   return true;
};

export const createProjectMock = (
  name: string,
  description: string,
  ownerId: string
): Project => {
  const newProject: Project = {
    id: `project_${uuidv4()}`, name, description, address: '', startDate: new Date().toISOString(), endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), budget: 0, status: 'active', progress: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), materials: [], team: [], updates: [], tasks: []
  };
  if (typeof window !== 'undefined') {
    const owner = window.mockUsers?.find(u => u.id === ownerId);
    if (owner) {
      const ownerMember: TeamMember = {
        id: `team_${uuidv4()}`, userId: owner.id, name: owner.name, email: owner.email, role: 'admin', joinedAt: new Date().toISOString(), avatar: owner.avatar
      };
      newProject.team.push(ownerMember);
      const ownerIndex = window.mockUsers?.findIndex(u => u.id === ownerId);
      if (ownerIndex !== -1 && window.mockUsers) window.mockUsers[ownerIndex].projects.push(newProject.id);
    }
    if (!window.mockProjects) window.mockProjects = [];
    window.mockProjects.push(newProject);
  }
  return newProject;
};

export const updateProjectMock = (projectId: string, updates: Partial<Project>): Project | undefined => {
  if (typeof window === 'undefined' || !window.mockProjects) return undefined;
  const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return undefined;
  const updatedProject = { ...window.mockProjects[projectIndex], ...updates, updatedAt: new Date().toISOString() }; 
  window.mockProjects[projectIndex] = updatedProject;
  return updatedProject;
};

export const deleteProjectMock = (projectId: string): boolean => {
  if (typeof window === 'undefined' || !window.mockProjects) return false;
  const initialLength = window.mockProjects.length;
  window.mockProjects = window.mockProjects.filter(p => p.id !== projectId);
  if (window.mockUsers) {
    window.mockUsers = window.mockUsers.map(user => ({ ...user, projects: user.projects.filter(id => id !== projectId) }));
  }
  return window.mockProjects.length < initialLength;
};

export const updateUserRoleInProjectMock = (
  projectId: string,
  userId: string,
  newRole: TeamMember['role']
): boolean => {
   if (typeof window === 'undefined' || !window.mockProjects) return false;
   const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
   if (projectIndex === -1 || !window.mockProjects[projectIndex].team) return false;
   const teamMemberIndex = window.mockProjects[projectIndex].team.findIndex(member => member.userId === userId);
   if (teamMemberIndex === -1) return false;
   window.mockProjects[projectIndex].team[teamMemberIndex].role = newRole;
   return true;
};

export const addProjectUpdateMock = (
  projectId: string,
  userId: string,
  message: string,
  attachments: string[] = []
): boolean => {
   if (typeof window === 'undefined' || !window.mockProjects) return false;
   const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
   if (projectIndex === -1) return false;
   const user = window.mockUsers?.find(u => u.id === userId);
   if (!user) return false; 
   if (!window.mockProjects[projectIndex].updates) window.mockProjects[projectIndex].updates = []; 
   const update = { id: `update_${uuidv4()}`, message, createdBy: userId, createdAt: new Date().toISOString(), attachments };
   window.mockProjects[projectIndex].updates.push(update);
   return true;
};

export const addProjectTaskMock = (
  projectId: string,
  title: string,
  description: string,
  assignedTo: string,
  dueDate: string,
  priority: 'low' | 'medium' | 'high' = 'medium'
): boolean => {
   if (typeof window === 'undefined' || !window.mockProjects) return false;
   const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
   if (projectIndex === -1) return false;
   if (!window.mockProjects[projectIndex].tasks) window.mockProjects[projectIndex].tasks = []; 
   const task = { id: `task_${uuidv4()}`, title, description, status: 'todo' as const, assignedTo, dueDate, priority, createdAt: new Date().toISOString() };
   window.mockProjects[projectIndex].tasks.push(task);
   return true;
};

export const updateTaskStatusMock = (
  projectId: string,
  taskId: string,
  status: 'todo' | 'in-progress' | 'completed'
): boolean => {
   if (typeof window === 'undefined' || !window.mockProjects) return false;
   const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
   if (projectIndex === -1 || !window.mockProjects[projectIndex].tasks) return false;
   const taskIndex = window.mockProjects[projectIndex].tasks.findIndex(t => t.id === taskId);
   if (taskIndex === -1) return false;
   window.mockProjects[projectIndex].tasks[taskIndex].status = status;
   updateProjectProgressMock(projectId); 
   return true;
};

export const updateProjectProgressMock = (projectId: string): number => {
  if (typeof window === 'undefined' || !window.mockProjects) return 0;
  const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex === -1 || !window.mockProjects[projectIndex].tasks) return 0;
  const tasks = window.mockProjects[projectIndex].tasks;
  if (tasks.length === 0) {
     window.mockProjects[projectIndex].progress = 0;
     return 0;
  }
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progress = Math.round((completedTasks / tasks.length) * 100);
  window.mockProjects[projectIndex].progress = progress;
  return progress;
};

export const canUserModifyProjectMock = (userId: string, projectId: string): boolean => {
  if (typeof window === 'undefined' || !window.mockProjects || !window.mockUsers) return false;
  const user = window.mockUsers.find(u => u.id === userId);
  if (!user) return false;
  const project = window.mockProjects.find(p => p.id === projectId);
  if (!project || !project.team) return false; 
  if (user.role === 'admin') return true;
  const teamMember = project.team.find(member => member.userId === userId);
  if (!teamMember) return false;
  return ['admin', 'manager'].includes(teamMember.role);
};

// Extend Window interface for mock data (if not already done elsewhere)
// Ensure this matches the one in vite-env.d.ts or remove if defined there
// Removed duplicate declare global block
