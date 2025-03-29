import { Link, NavLink } from 'react-router-dom';
// Added BookOpen, Info, UserPlus icons
import { Boxes, LayoutDashboard, Building, Users, LogIn, LogOut, Languages, Upload, History, Settings, BookOpen, Info, UserPlus } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import { useAuth } from '@/App';
import { useTranslation } from 'react-i18next'; 
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
  const { isAuthenticated, userEmail, logout } = useAuth(); 
  const { t, i18n } = useTranslation(); 

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
    <nav className="bg-card border-b shadow-sm sticky top-0 z-50"> 
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2 text-lg font-semibold">
            <Boxes className="h-6 w-6 text-primary" />
            <span>{t('navbar.title')}</span> 
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              // Authenticated Links
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
            ) : (
              // Unauthenticated Links
              <>
                 <NavLink 
                  to="/resources" // Correct path
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                  <BookOpen className="mr-2 h-4 w-4" /> 
                  {t('navbar.resources')}
                </NavLink>
                 <NavLink 
                  to="/about-us" // Correct path
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                   <Info className="mr-2 h-4 w-4" /> 
                  {t('navbar.aboutUs')}
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
            ) : (
              // Login and Register Buttons for Unauthenticated Users
              <div className="flex items-center space-x-2">
                 <Button variant="ghost" asChild>
                   <Link to="/login">
                     <LogIn className="mr-2 h-4 w-4" />
                     {t('navbar.login')} 
                   </Link>
                 </Button>
                 <Button asChild>
                   <Link to="/login"> {/* Point Register to Login for now */}
                     <UserPlus className="mr-2 h-4 w-4" /> 
                     {t('navbar.register')} 
                   </Link>
                 </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
