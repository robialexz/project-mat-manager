import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'; // Added useLocation and Link
import { useAuth } from '@/App';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
// Import DropdownMenu components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  FileSpreadsheet,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Boxes,
  Bell,
  Calendar,
  MessageCircle,
  Upload, // Added Upload icon
  History // Added History icon
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const AppLayout = () => {
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get location for isActive check
  const { t } = useTranslation(); // Initialize translation

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out successfully");
    navigate("/");
  };

  // Get initials for avatar
  const getInitials = () => {
    if (!userEmail) return "?";
    return userEmail.substring(0, 2).toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4">
              <Boxes className="h-6 w-6 text-primary" />
              {/* Use translation for title if available, otherwise fallback */}
              <span className="text-xl font-bold">{t('navbar.title', { defaultValue: 'ConstruxHub' })}</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {/* Use onClick for navigation, remove asChild and <a> */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip={t('navbar.dashboard')} 
                  onClick={() => navigate('/dashboard')}
                  isActive={location.pathname === '/dashboard'} 
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>{t('navbar.dashboard')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip={t('navbar.projects')} 
                  onClick={() => navigate('/projects')}
                  isActive={location.pathname.startsWith('/projects')}
                >
                  <FileSpreadsheet className="h-5 w-5" />
                  <span>{t('navbar.projects')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip={t('navbar.suppliers')} 
                  onClick={() => navigate('/suppliers')}
                  isActive={location.pathname.startsWith('/suppliers')}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>{t('navbar.suppliers')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip={t('navbar.users')} 
                  onClick={() => navigate('/users')}
                  isActive={location.pathname === '/users'}
                >
                  <Users className="h-5 w-5" />
                  <span>{t('navbar.users')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Added Import and History links */}
               <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip={t('navbar.import')} 
                  onClick={() => navigate('/import-materials')}
                  isActive={location.pathname === '/import-materials'}
                >
                  <Upload className="h-5 w-5" /> 
                  <span>{t('navbar.import')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip={t('navbar.history')} 
                  onClick={() => navigate('/material-history')}
                  isActive={location.pathname === '/material-history'}
                >
                  <History className="h-5 w-5" /> 
                  <span>{t('navbar.history')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Placeholder links */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Calendar" // Placeholder - add translation key later
                  onClick={() => navigate('/calendar')}
                  isActive={location.pathname === '/calendar'}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Calendar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Messages" // Placeholder - add translation key later
                  onClick={() => navigate('/messages')}
                  isActive={location.pathname === '/messages'}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Messages</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="px-3 py-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip={t('navbar.settings')} 
                    onClick={() => navigate('/settings')}
                    isActive={location.pathname === '/settings'}
                  >
                    <Settings className="h-5 w-5" />
                    <span>{t('navbar.settings')}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} tooltip={t('navbar.logout')}>
                    <LogOut className="h-5 w-5" />
                    <span>{t('navbar.logout')}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>

            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">{getInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{userEmail}</p>
                  {/* Placeholder role */}
                  <p className="text-xs text-muted-foreground">Project Manager</p> 
                </div>
              </div>
            </div>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <SidebarInset className="p-0 flex flex-col">
          <div className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="h-5 w-5" />
                {/* Placeholder notification count */}
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">3</span> 
              </Button>

              {/* User Avatar in top bar (matches Navbar) */}
              <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <Avatar className="h-8 w-8">
                       <AvatarImage src="" alt={userEmail || 'User'} /> 
                       <AvatarFallback>{getInitials()}</AvatarFallback>
                     </Avatar>
                   </Button> 
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-56" align="end" forceMount>
                   <DropdownMenuLabel className="font-normal">
                     <div className="flex flex-col space-y-1">
                       <p className="text-sm font-medium leading-none">{userEmail}</p>
                       <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                     </div>
                   </DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t('navbar.settings')}</span> 
                      </Link>
                   </DropdownMenuItem>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={logout}>
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>{t('navbar.logout')}</span>
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
            </div>
          </div>

          <main className="flex-1 overflow-auto p-4 sm:p-6">
            {/* Removed Card wrapping Outlet for more flexibility per page */}
            <Outlet /> 
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
