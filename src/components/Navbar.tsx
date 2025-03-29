import { Link, NavLink } from 'react-router-dom';
import { Boxes, LayoutDashboard, Building, Users, LogIn, LogOut, Languages, Upload, History, Settings } from 'lucide-react'; // Added missing icons
import { Button } from '@/components/ui/button';
import { useAuth } from '@/App';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { isAuthenticated, userEmail, logout } = useAuth(); // Use mock auth
  const { t, i18n } = useTranslation(); // Initialize translation

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ro', name: 'Română' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' },
  ];

   // Get initials for avatar
  const getInitials = () => {
    if (!userEmail) return "?";
    return userEmail.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-card border-b shadow-sm sticky top-0 z-50"> {/* Added sticky and z-index */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2 text-lg font-semibold">
            <Boxes className="h-6 w-6 text-primary" />
            <span>{t('navbar.title')}</span> {/* Use translation */}
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {t('navbar.dashboard')}
                </NavLink>
                <NavLink 
                  to="/projects" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                  <Boxes className="mr-2 h-4 w-4" />
                  {t('navbar.projects')}
                </NavLink>
                <NavLink 
                  to="/suppliers" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                  <Building className="mr-2 h-4 w-4" />
                  {t('navbar.suppliers')}
                </NavLink>
                 <NavLink 
                  to="/users" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                  <Users className="mr-2 h-4 w-4" />
                  {t('navbar.users')}
                </NavLink>
                {/* Add Import and History links back */}
                <NavLink 
                  to="/import-materials" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {t('navbar.import')}
                </NavLink>
                 <NavLink 
                  to="/material-history" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                  <History className="mr-2 h-4 w-4" />
                  {t('navbar.history')}
                </NavLink>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code} 
                    onClick={() => changeLanguage(lang.code)}
                    disabled={i18n.resolvedLanguage === lang.code}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu / Auth Button */}
            {isAuthenticated ? (
              <DropdownMenu>
                 {/* Use asChild and ensure Button is the single direct child */}
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={userEmail || 'User'} /> {/* Placeholder */}
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button> 
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userEmail} 
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Ensure Settings link is present */}
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
            ) : (
              <Button asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t('navbar.login')} 
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
