import { useState } from 'react';
import { useAuth } from '@/App'; // Use mock auth
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { User, Edit } from 'lucide-react';

const SettingsPage = () => {
  const { userEmail, userId, userRole } = useAuth(); // Get mock user info
  
  // Mock state for profile editing - functionality not implemented yet
  const [name, setName] = useState(userEmail?.split('@')[0] || 'User'); 
  const [email, setEmail] = useState(userEmail || '');
  const [avatarUrl, setAvatarUrl] = useState(''); // Placeholder

  const getInitials = () => {
    if (!name) return "?";
    return name.substring(0, 2).toUpperCase();
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Profile update functionality is not yet implemented.");
    // In a real app with Supabase:
    // Call an updateProfile function (e.g., from userUtils)
    // await updateProfile(userId, { name, avatar_url: avatarUrl });
    // toast.success("Profile updated!");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl || undefined} alt={name} />
                <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                 <Label htmlFor="avatar-url">Avatar URL (Optional)</Label>
                 <Input 
                   id="avatar-url" 
                   placeholder="https://example.com/avatar.png" 
                   value={avatarUrl}
                   onChange={(e) => setAvatarUrl(e.target.value)}
                 />
                 <p className="text-xs text-muted-foreground">Enter a URL for your profile picture.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} disabled /> {/* Email usually not editable */}
              </div>
            </div>
             <div className="space-y-1">
                <Label>Role</Label>
                <Input value={userRole || 'N/A'} disabled />
              </div>

            <Button type="submit">
              <Edit className="mr-2 h-4 w-4" /> Save Profile Changes (Mock)
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Placeholder for other settings sections */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Password change, notifications, etc. (Coming Soon)</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Configure application behavior.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Theme, language defaults, etc. (Coming Soon)</p>
        </CardContent>
      </Card>

    </div>
  );
};

export default SettingsPage;
