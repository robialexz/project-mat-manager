
import { v4 as uuidv4 } from 'uuid';
import { Project, User, TeamMember } from '@/types';

// Get projects by user ID
export const getUserProjects = (userId: string): Project[] => {
  if (typeof window === 'undefined' || !window.mockProjects || !window.mockUsers) return [];
  
  // Find the user
  const user = window.mockUsers.find(u => u.id === userId);
  if (!user) return [];
  
  // If user is admin, return all projects
  if (user.role === 'admin') {
    return [...window.mockProjects];
  }
  
  // Filter projects based on user's project list
  return window.mockProjects.filter(project => 
    user.projects.includes(project.id) || 
    project.team.some(member => member.userId === userId)
  );
};

// Get project by ID
export const getProjectById = (projectId: string): Project | undefined => {
  if (typeof window === 'undefined' || !window.mockProjects) return undefined;
  return window.mockProjects.find(project => project.id === projectId);
};

// Get user by ID
export const getUserById = (userId: string): User | undefined => {
  if (typeof window === 'undefined' || !window.mockUsers) return undefined;
  return window.mockUsers.find(user => user.id === userId);
};

// Get user by email
export const getUserByEmail = (email: string): User | undefined => {
  if (typeof window === 'undefined' || !window.mockUsers) return undefined;
  return window.mockUsers.find(user => user.email === email);
};

// Get all users
export const getAllUsers = (): User[] => {
  if (typeof window === 'undefined' || !window.mockUsers) return [];
  return [...window.mockUsers];
};

// Create a new user
export const createUser = (
  email: string,
  name: string,
  role: User['role'] = 'member'
): User => {
  const newUser: User = {
    id: `user_${uuidv4()}`,
    email,
    name,
    role,
    projects: [],
    createdAt: new Date().toISOString()
  };
  
  if (typeof window !== 'undefined') {
    if (window.mockUsers) {
      window.mockUsers.push(newUser);
    } else {
      window.mockUsers = [newUser];
    }
  }
  
  return newUser;
};

// Update a user
export const updateUser = (userId: string, updates: Partial<User>): User | undefined => {
  if (typeof window === 'undefined' || !window.mockUsers) return undefined;
  
  const userIndex = window.mockUsers.findIndex(user => user.id === userId);
  if (userIndex === -1) return undefined;
  
  const updatedUser = {
    ...window.mockUsers[userIndex],
    ...updates
  };
  
  window.mockUsers[userIndex] = updatedUser;
  return updatedUser;
};

// Delete a user
export const deleteUser = (userId: string): boolean => {
  if (typeof window === 'undefined' || !window.mockUsers) return false;
  
  const initialLength = window.mockUsers.length;
  window.mockUsers = window.mockUsers.filter(user => user.id !== userId);
  
  return window.mockUsers.length < initialLength;
};

// Add user to project
export const addUserToProject = (
  userId: string,
  projectId: string,
  role: TeamMember['role'] = 'member'
): boolean => {
  if (typeof window === 'undefined' || !window.mockProjects || !window.mockUsers) return false;
  
  // Find the user
  const user = window.mockUsers.find(u => u.id === userId);
  if (!user) return false;
  
  // Find the project
  const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return false;
  
  // Check if user is already in the project
  const isUserInProject = window.mockProjects[projectIndex].team.some(
    member => member.userId === userId
  );
  
  if (!isUserInProject) {
    // Add user to project team
    const newTeamMember: TeamMember = {
      id: `team_${uuidv4()}`,
      userId,
      name: user.name,
      email: user.email,
      role,
      joinedAt: new Date().toISOString(),
      avatar: user.avatar
    };
    
    window.mockProjects[projectIndex].team.push(newTeamMember);
  }
  
  // Make sure project ID is in user's projects array
  if (!user.projects.includes(projectId)) {
    user.projects.push(projectId);
    
    // Update the user in mockUsers
    const userIndex = window.mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      window.mockUsers[userIndex] = user;
    }
  }
  
  return true;
};

// Remove user from project
export const removeUserFromProject = (userId: string, projectId: string): boolean => {
  if (typeof window === 'undefined' || !window.mockProjects || !window.mockUsers) return false;
  
  // Find the project
  const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return false;
  
  // Remove user from project team
  window.mockProjects[projectIndex].team = 
    window.mockProjects[projectIndex].team.filter(member => member.userId !== userId);
  
  // Find the user
  const userIndex = window.mockUsers.findIndex(u => u.id === userId);
  if (userIndex === -1) return false;
  
  // Remove project from user's projects array
  window.mockUsers[userIndex].projects = 
    window.mockUsers[userIndex].projects.filter(id => id !== projectId);
  
  return true;
};

// Create a new project
export const createProject = (
  name: string,
  description: string,
  ownerId: string
): Project => {
  const newProject: Project = {
    id: `project_${uuidv4()}`,
    name,
    description,
    address: '',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
    budget: 0,
    status: 'active',
    progress: 0,
    materials: [],
    team: [],
    updates: [],
    tasks: []
  };
  
  if (typeof window !== 'undefined') {
    // Add owner to project team
    const owner = window.mockUsers?.find(u => u.id === ownerId);
    if (owner) {
      const ownerMember: TeamMember = {
        id: `team_${uuidv4()}`,
        userId: owner.id,
        name: owner.name,
        email: owner.email,
        role: 'admin', // Project creator is admin
        joinedAt: new Date().toISOString(),
        avatar: owner.avatar
      };
      
      newProject.team.push(ownerMember);
      
      // Add project to owner's projects
      const ownerIndex = window.mockUsers?.findIndex(u => u.id === ownerId);
      if (ownerIndex !== -1 && window.mockUsers) {
        window.mockUsers[ownerIndex].projects.push(newProject.id);
      }
    }
    
    // Add to mock projects
    if (window.mockProjects) {
      window.mockProjects.push(newProject);
    } else {
      window.mockProjects = [newProject];
    }
  }
  
  return newProject;
};

// Update a project
export const updateProject = (projectId: string, updates: Partial<Project>): Project | undefined => {
  if (typeof window === 'undefined' || !window.mockProjects) return undefined;
  
  const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return undefined;
  
  const updatedProject = {
    ...window.mockProjects[projectIndex],
    ...updates
  };
  
  window.mockProjects[projectIndex] = updatedProject;
  return updatedProject;
};

// Delete a project
export const deleteProject = (projectId: string): boolean => {
  if (typeof window === 'undefined' || !window.mockProjects) return false;
  
  const initialLength = window.mockProjects.length;
  window.mockProjects = window.mockProjects.filter(p => p.id !== projectId);
  
  // Remove project from all users
  if (window.mockUsers) {
    window.mockUsers = window.mockUsers.map(user => ({
      ...user,
      projects: user.projects.filter(id => id !== projectId)
    }));
  }
  
  return window.mockProjects.length < initialLength;
};

// Update user role in a project
export const updateUserRoleInProject = (
  projectId: string,
  userId: string,
  newRole: TeamMember['role']
): boolean => {
  if (typeof window === 'undefined' || !window.mockProjects) return false;
  
  const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return false;
  
  const teamMemberIndex = window.mockProjects[projectIndex].team.findIndex(
    member => member.userId === userId
  );
  
  if (teamMemberIndex === -1) return false;
  
  window.mockProjects[projectIndex].team[teamMemberIndex].role = newRole;
  return true;
};

// Add a project update
export const addProjectUpdate = (
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
  
  const update = {
    id: `update_${uuidv4()}`,
    message,
    createdBy: userId,
    createdAt: new Date().toISOString(),
    attachments
  };
  
  window.mockProjects[projectIndex].updates.push(update);
  return true;
};

// Add a project task
export const addProjectTask = (
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
  
  const task = {
    id: `task_${uuidv4()}`,
    title,
    description,
    status: 'todo' as const,
    assignedTo,
    dueDate,
    priority,
    createdAt: new Date().toISOString()
  };
  
  window.mockProjects[projectIndex].tasks.push(task);
  return true;
};

// Update a task status
export const updateTaskStatus = (
  projectId: string,
  taskId: string,
  status: 'todo' | 'in-progress' | 'completed'
): boolean => {
  if (typeof window === 'undefined' || !window.mockProjects) return false;
  
  const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return false;
  
  const taskIndex = window.mockProjects[projectIndex].tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return false;
  
  window.mockProjects[projectIndex].tasks[taskIndex].status = status;
  
  // Update project progress
  updateProjectProgress(projectId);
  
  return true;
};

// Update project progress based on completed tasks
export const updateProjectProgress = (projectId: string): number => {
  if (typeof window === 'undefined' || !window.mockProjects) return 0;
  
  const projectIndex = window.mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex === -1) return 0;
  
  const tasks = window.mockProjects[projectIndex].tasks;
  if (tasks.length === 0) return 0;
  
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progress = Math.round((completedTasks / tasks.length) * 100);
  
  window.mockProjects[projectIndex].progress = progress;
  return progress;
};

// Check if user can modify project
export const canUserModifyProject = (userId: string, projectId: string): boolean => {
  if (typeof window === 'undefined' || !window.mockProjects || !window.mockUsers) return false;
  
  // Find the user
  const user = window.mockUsers.find(u => u.id === userId);
  if (!user) return false;
  
  // Find the project
  const project = window.mockProjects.find(p => p.id === projectId);
  if (!project) return false;
  
  // Admin users can modify any project
  if (user.role === 'admin') return true;
  
  // Check if user is in project team with appropriate role
  const teamMember = project.team.find(member => member.userId === userId);
  if (!teamMember) return false;
  
  // Only admin or manager roles can modify
  return ['admin', 'manager'].includes(teamMember.role);
};
