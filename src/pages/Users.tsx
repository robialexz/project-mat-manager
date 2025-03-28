
import React, { useState } from 'react';
import { User, Team, TeamMember, Invitation } from '@/types';
import { generateMockUsers, generateMockTeams, generateMockTeamMembers, generateMockInvitations, createInvitation, verifyInvitationCode } from '@/utils/userUtils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { UserPlus, Mail, Users, UserCheck, Building, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();
  const [users] = useState<User[]>(generateMockUsers(8));
  const [teams] = useState<Team[]>(generateMockTeams(users));
  const [teamMembers] = useState<TeamMember[]>(generateMockTeamMembers(users, teams));
  const [invitations, setInvitations] = useState<Invitation[]>(generateMockInvitations());
  
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'manager' | 'member'>('member');
  
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  
  const [activeTab, setActiveTab] = useState('users');
  
  const handleSendInvite = () => {
    if (!inviteEmail || !selectedTeam) {
      toast.error('Please enter email and select team');
      return;
    }
    
    const newInvitation = createInvitation(
      inviteEmail, 
      selectedTeam, 
      selectedRole, 
      users[0].id // Using first user as current user
    );
    
    setInvitations([...invitations, newInvitation]);
    setInviteEmail('');
    toast.success(`Invitation sent to ${inviteEmail}`);
  };
  
  const handleVerifyCode = () => {
    const invitation = verifyInvitationCode(verifyEmail, verifyCode, invitations);
    
    if (invitation) {
      toast.success('Code verified! You can now create your account.');
      // In a real app, this would redirect to account creation
    } else {
      toast.error('Invalid code or email');
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> 
                Invite User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a New User</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    placeholder="user@example.com" 
                    value={inviteEmail} 
                    onChange={(e) => setInviteEmail(e.target.value)} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="team">Team</Label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(team => (
                        <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={selectedRole} 
                    onValueChange={(value) => setSelectedRole(value as 'admin' | 'manager' | 'member')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSendInvite}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Join a Team</CardTitle>
            <CardDescription>
              Enter your invitation code to join a team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="verify-email">Your Email</Label>
                <Input 
                  id="verify-email" 
                  placeholder="user@example.com" 
                  value={verifyEmail} 
                  onChange={(e) => setVerifyEmail(e.target.value)} 
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="verify-code">Invitation Code</Label>
                <Input 
                  id="verify-code" 
                  placeholder="Enter 6-digit code" 
                  value={verifyCode} 
                  onChange={(e) => setVerifyCode(e.target.value)} 
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleVerifyCode}>
              <UserCheck className="mr-2 h-4 w-4" />
              Verify & Join
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="teams">
            <Building className="mr-2 h-4 w-4" />
            Teams
          </TabsTrigger>
          <TabsTrigger value="invitations">
            <Mail className="mr-2 h-4 w-4" />
            Invitations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <Card key={user.id}>
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant={
                    user.role === 'admin' ? 'default' : 
                    user.role === 'manager' ? 'secondary' : 
                    user.role === 'purchaser' ? 'outline' : 'destructive'
                  }>
                    {user.role}
                  </Badge>
                  <div className="mt-2 text-sm text-gray-500">
                    Teams: {teamMembers.filter(m => m.userId === user.id).length}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">View Profile</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="teams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map(team => {
              const members = teamMembers.filter(m => m.teamId === team.id);
              const admin = users.find(u => 
                members.some(m => m.userId === u.id && m.role === 'admin')
              );
              
              return (
                <Card key={team.id}>
                  <CardHeader>
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>{team.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm">
                        Created {team.createdAt.toLocaleDateString()} by {
                          users.find(u => u.id === team.createdBy)?.name || 'Unknown'
                        }
                      </div>
                      <div className="text-sm">Admin: {admin?.name || 'None'}</div>
                      <div className="flex -space-x-2 overflow-hidden mt-2">
                        {members.slice(0, 5).map(member => {
                          const user = users.find(u => u.id === member.userId);
                          return (
                            <Avatar key={member.id} className="border-2 border-background inline-block h-8 w-8">
                              <AvatarImage src={user?.avatar} />
                              <AvatarFallback>
                                {user?.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          );
                        })}
                        {members.length > 5 && (
                          <Avatar className="border-2 border-background inline-block h-8 w-8">
                            <AvatarFallback>
                              +{members.length - 5}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">View Team</Button>
                  </CardFooter>
                </Card>
              );
            })}
            <Card>
              <CardHeader>
                <CardTitle>Create a New Team</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-40">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="invitations">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>
                Invitations waiting to be accepted
              </CardDescription>
            </CardHeader>
            <CardContent>
              {invitations.length > 0 ? (
                <div className="space-y-4">
                  {invitations.map(invitation => {
                    const team = teams.find(t => t.id === invitation.teamId);
                    const inviter = users.find(u => u.id === invitation.invitedBy);
                    
                    return (
                      <div key={invitation.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <div className="font-medium">{invitation.email}</div>
                          <div className="text-sm text-gray-500">
                            Team: {team?.name}, Role: {invitation.role}
                          </div>
                          <div className="text-xs text-gray-400">
                            Invited by {inviter?.name} on {invitation.invitedAt.toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>
                            {invitation.status}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => {
                            toast.success(`Reminder sent to ${invitation.email}`);
                          }}>
                            Resend
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No pending invitations
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersPage;
