
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Suppliers from "./pages/Suppliers";
import SupplierDetails from "./pages/SupplierDetails";
import Users from "./pages/Users";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/Settings"; 
import ImportMaterialsPage from "./pages/ImportMaterials"; 
import MaterialHistoryPage from "./pages/MaterialHistory"; // Import MaterialHistoryPage
import { generateMockProjects } from "./utils/userUtils"; 
import AppLayout from "./components/AppLayout";
import { v4 as uuidv4 } from "uuid";
import { User } from "./types";

const queryClient = new QueryClient();

// Initialize mock data in the window object for global access
if (typeof window !== 'undefined') {
  // Initialize mock projects
  window.mockProjects = generateMockProjects(6);
  
  // Initialize mock users
  const mockUsers: User[] = [
    {
      id: "user_1",
      email: "john@example.com",
      name: "John Doe",
      role: "admin",
      projects: window.mockProjects.map(p => p.id),
      createdAt: "2023-01-15T08:00:00Z"
    },
    {
      id: "user_2",
      email: "sarah@example.com",
      name: "Sarah Johnson",
      role: "manager",
      projects: [window.mockProjects[0].id, window.mockProjects[1].id],
      createdAt: "2023-02-10T09:15:00Z"
    },
    {
      id: "user_3",
      email: "mike@example.com",
      name: "Mike Wilson",
      role: "member",
      projects: [window.mockProjects[0].id],
      createdAt: "2023-03-05T10:30:00Z"
    },
    {
      id: "user_4",
      email: "client@example.com",
      name: "Client User",
      role: "client",
      projects: [window.mockProjects[0].id, window.mockProjects[2].id],
      createdAt: "2023-04-01T11:45:00Z"
    }
  ];
  
  window.mockUsers = mockUsers;
}

// Create authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userId: string | null;
  userRole: string | null;
  checkAuth: () => boolean;
  login: (email: string) => void;
  logout: () => void;
  register: (email: string, name: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  userId: null,
  userRole: null,
  checkAuth: () => false,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { checkAuth } = useAuth();
  const location = useLocation();
  
  if (!checkAuth()) {
    // Redirect to login page but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Main App component with auth provider
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // Check if user is authenticated on initial load
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
    
    setIsAuthenticated(auth);
    setUserEmail(email);
    setUserId(id);
    setUserRole(role);
  }, []);
  
  // Auth functions
  const checkAuth = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };
  
  const login = (email: string) => {
    // Find user by email
    const user = window.mockUsers?.find(u => u.email === email);
    
    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userRole', user.role);
      
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserId(user.id);
      setUserRole(user.role);
    } else {
      // If user doesn't exist, create a new one
      register(email, email.split('@')[0]);
    }
  };
  
  const register = (email: string, name: string) => {
    // Create a new user if it doesn't exist
    const newUser: User = {
      id: `user_${uuidv4()}`,
      email,
      name,
      role: 'member', // Default role
      projects: [],
      createdAt: new Date().toISOString()
    };
    
    if (window.mockUsers) {
      window.mockUsers.push(newUser);
    } else {
      window.mockUsers = [newUser];
    }
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userId', newUser.id);
    localStorage.setItem('userRole', newUser.role);
    
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserId(newUser.id);
    setUserRole(newUser.role);
  };
  
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserId(null);
    setUserRole(null);
  };
  
  const authContextValue: AuthContextType = {
    isAuthenticated,
    userEmail,
    userId,
    userRole,
    checkAuth,
    login,
    logout,
    register,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authContextValue}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes with shared layout */}
              <Route element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/suppliers/:id" element={<SupplierDetails />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<SettingsPage />} /> 
                <Route path="/import-materials" element={<ImportMaterialsPage />} /> 
                {/* Add route for MaterialHistoryPage */}
                <Route path="/material-history" element={<MaterialHistoryPage />} /> 
                {/* Keep placeholders for other routes */}
                <Route path="/calendar" element={<div className="container mx-auto p-8"><h1 className="text-3xl font-bold">Calendar (Coming Soon)</h1></div>} />
                <Route path="/messages" element={<div className="container mx-auto p-8"><h1 className="text-3xl font-bold">Messages (Coming Soon)</h1></div>} />
                 {/* Removed old placeholder settings route */}
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
