
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, Home, Package, Users, FileSpreadsheet, Settings } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const closeMenu = () => setMobileMenuOpen(false);
  
  return (
    <nav className="border-b bg-background sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Package className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Mat Manager</span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/dashboard" className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
              <Link to="/projects" className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Projects
              </Link>
              <Link to="/users" className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <Users className="h-4 w-4 mr-1" />
                Users
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Avatar className="ml-4">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">AM</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex md:hidden items-center">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="py-6 px-4 space-y-6">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-accent"
                    onClick={closeMenu}
                  >
                    <Home className="mr-4 h-6 w-6 text-primary" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/projects" 
                    className="flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-accent"
                    onClick={closeMenu}
                  >
                    <FileSpreadsheet className="mr-4 h-6 w-6 text-primary" />
                    Projects
                  </Link>
                  <Link 
                    to="/users" 
                    className="flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-accent"
                    onClick={closeMenu}
                  >
                    <Users className="mr-4 h-6 w-6 text-primary" />
                    Users
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-accent"
                    onClick={closeMenu}
                  >
                    <Settings className="mr-4 h-6 w-6 text-primary" />
                    Settings
                  </Link>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground">AM</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="text-base font-medium">Admin User</p>
                        <p className="text-sm text-gray-500">admin@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
