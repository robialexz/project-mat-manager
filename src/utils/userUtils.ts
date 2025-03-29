
import { User, TeamMember, Team, Project, Invitation } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

// Mock data for users (this would be replaced with real authentication)
export const generateMockUsers = (count: number = 5): User[] => {
  const roles = ['admin', 'manager', 'purchaser', 'viewer'];
  const users: User[] = [];
  
  for (let i = 0; i < count; i++) {
    users.push({
      id: `user_${i+1}`,
      name: `User ${i+1}`,
      email: `user${i+1}@example.com`,
      role: roles[i % roles.length] as 'admin' | 'manager' | 'purchaser' | 'viewer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    });
  }
  
  return users;
};

// Mock data for teams
export const generateMockTeams = (users: User[]): Team[] => {
  const teams: Team[] = [
    {
      id: 'team_1',
      name: 'Engineering Team',
      description: 'Main engineering team',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      createdBy: users[0].id,
    },
    {
      id: 'team_2',
      name: 'Procurement Team',
      description: 'Team responsible for procurement',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      createdBy: users[0].id,
    }
  ];
  
  return teams;
};

// Generate team memberships
export const generateMockTeamMembers = (users: User[], teams: Team[]): TeamMember[] => {
  const members: TeamMember[] = [];
  
  // Add all users to the first team
  users.forEach((user, index) => {
    members.push({
      id: `member_${user.id}_${teams[0].id}`,
      userId: user.id,
      teamId: teams[0].id,
      role: index === 0 ? 'admin' : (index === 1 ? 'manager' : 'member'),
      joinedAt: new Date(Date.now() - (50 - index) * 24 * 60 * 60 * 1000),
    });
    
    // Add some users to the second team
    if (index % 2 === 0) {
      members.push({
        id: `member_${user.id}_${teams[1].id}`,
        userId: user.id,
        teamId: teams[1].id,
        role: index === 0 ? 'admin' : 'member',
        joinedAt: new Date(Date.now() - (30 - index) * 24 * 60 * 60 * 1000),
      });
    }
  });
  
  return members;
};

// Generate mock invitations
export const generateMockInvitations = (): Invitation[] => {
  return [
    {
      id: 'inv_1',
      email: 'newuser@example.com',
      teamId: 'team_1',
      role: 'member',
      invitedBy: 'user_1',
      invitedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'pending',
      code: '123456',
    },
    {
      id: 'inv_2',
      email: 'another@example.com',
      teamId: 'team_2',
      role: 'member',
      invitedBy: 'user_1',
      invitedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'pending',
      code: '654321',
    }
  ];
};

// Function to create a new invitation
export const createInvitation = (email: string, teamId: string, role: 'admin' | 'manager' | 'member', invitedBy: string): Invitation => {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit code
  
  const invitation: Invitation = {
    id: `inv_${Date.now()}`,
    email,
    teamId,
    role,
    invitedBy,
    invitedAt: new Date(),
    status: 'pending',
    code,
  };
  
  // In a real application, this would send an email with the code
  console.log(`Invitation code for ${email}: ${code}`);
  toast(`Invitation sent to ${email}`);
  
  return invitation;
};

// Function to verify invitation code
export const verifyInvitationCode = (email: string, code: string, invitations: Invitation[]): Invitation | null => {
  const invitation = invitations.find(
    inv => inv.email === email && inv.code === code && inv.status === 'pending'
  );
  
  return invitation || null;
};

// Function to accept invitation and create user account
export const acceptInvitation = (
  invitation: Invitation, 
  name: string, 
  password: string, // In a real app, this would be securely hashed
  users: User[],
  teamMembers: TeamMember[]
): { user: User, teamMember: TeamMember } => {
  // Check if user already exists
  let user = users.find(u => u.email === invitation.email);
  
  if (!user) {
    // Create new user
    user = {
      id: `user_${Date.now()}`,
      name,
      email: invitation.email,
      role: 'viewer', // Default role in the system
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/\s/g, '')}`,
    };
  }
  
  // Create team membership
  const teamMember: TeamMember = {
    id: `member_${user.id}_${invitation.teamId}`,
    userId: user.id,
    teamId: invitation.teamId,
    role: invitation.role,
    joinedAt: new Date(),
  };
  
  // In a real app, we would update the invitation status to 'accepted'
  
  return { user, teamMember };
};

// Function to get team members with user details
export const getTeamMembersWithDetails = (
  teamId: string, 
  teamMembers: TeamMember[], 
  users: User[]
): (TeamMember & { user: User })[] => {
  return teamMembers
    .filter(member => member.teamId === teamId)
    .map(member => {
      const user = users.find(u => u.id === member.userId);
      return {
        ...member,
        user: user!
      };
    });
};

// Function to get teams for a user
export const getUserTeams = (
  userId: string,
  teamMembers: TeamMember[],
  teams: Team[]
): Team[] => {
  const userTeamIds = teamMembers
    .filter(member => member.userId === userId)
    .map(member => member.teamId);
  
  return teams.filter(team => userTeamIds.includes(team.id));
};

// Function to get projects for a team
export const getTeamProjects = (
  teamId: string,
  projects: Project[]
): Project[] => {
  // In a real app, projects would have a teamId field or a relation table
  // For this mock, we'll just return a subset of projects based on index
  const teamIndex = parseInt(teamId.split('_')[1]);
  return projects.filter((_, index) => index % 2 === teamIndex % 2);
};

// New functions for authentication
export const authenticateUser = (email: string, password: string): User | null => {
  // In a real app, this would verify credentials against a database
  // For this mock, we'll simulate authentication
  const users = generateMockUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  // Simulating password verification (in a real app this would be proper hashing)
  if (user && password.length >= 6) {
    return user;
  }
  
  return null;
};

export const getUserById = (userId: string): User | null => {
  const users = generateMockUsers();
  return users.find(u => u.id === userId) || null;
};

export const getUserByEmail = (email: string): User | null => {
  const users = generateMockUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
};

export const getUserProjects = (userId: string): Project[] => {
  // In a real app, this would query a database for projects the user is assigned to
  const users = generateMockUsers();
  const teams = generateMockTeams(users);
  const teamMembers = generateMockTeamMembers(users, teams);
  
  // Get teams the user is a member of
  const userTeams = getUserTeams(userId, teamMembers, teams);
  
  // Mock projects from materialUtils
  const allProjects = window.mockProjects || [];
  
  // Filter projects by team membership
  return userTeams.flatMap(team => 
    getTeamProjects(team.id, allProjects)
  );
};
