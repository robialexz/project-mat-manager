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
import MaterialHistoryPage from "./pages/MaterialHistory"; 
import CalendarPage from "./pages/Calendar"; 
import MessagesPage from "./pages/Messages"; 
import AboutUsPage from "./pages/AboutUs"; // Import new pages
import ResourcesPage from "./pages/Resources";
import SupportPage from "./pages/Support";
import PricingPage from "./pages/Pricing";
import TermsPage from "./pages/Terms";
import PrivacyPage from "./pages/Privacy";
import FeaturesPage from "./pages/Features"; // Import FeaturesPage
import { generateMockProjects, generateMockUsers, createUserMock } from "./utils/userUtils"; 
import AppLayout from "./components/AppLayout";
import { v4 as uuidv4 } from "uuid";
import { User } from "./types";
import { toast } from "sonner"; // Added toast import

const queryClient = new QueryClient();

// Initialize mock data in the window object for global access
// Ensure this runs only once
if (typeof window !== 'undefined' && !window.mockProjects) {
  window.mockProjects = generateMockProjects(6);
  window.mockUsers = generateMockUsers(8); // Generate users after projects if needed
  
  // Assign projects to mock users (example logic)
  window.mockUsers.forEach((user, index) => {
     if (user.role === 'admin') {
        user.projects = window.mockProjects?.map(p => p.id) || [];
     } else if (user.role === 'manager') {
         user.projects = window.mockProjects?.slice(index % 3, (index % 3) + 2).map(p => p.id) || [];
     } else {
         user.projects = window.mockProjects ? [window.mockProjects[index % window.mockProjects.length].id] : [];
     }
  });

  // Initialize other mock data if needed by utils
  // window.mockSuppliers = ...
  // window.mockInvitations = ...
  // window.mockTeams = ...
  // window.mockOrderStatuses = ...
}

// Create authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userId: string | null;
  userRole: User['role'] | null; // Use specific role type
  checkAuth: () => boolean;
  login: (email: string) => boolean; // Return true on success, false on fail
  logout: () => void;
  register: (email: string, name: string) => boolean; // Return true on success
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // Initialize with undefined

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { checkAuth } = useAuth();
  const location = useLocation();
  
  if (!checkAuth()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Main App component with auth provider
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<User['role'] | null>(null);
  
  // Check if user is authenticated on initial load
  useEffect(() => {
    // --- DEBUGGING: Force logout on refresh ---
    // localStorage.clear(); 
    // --- END DEBUGGING ---
    
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole') as User['role'] | null; // Cast role
    
    setIsAuthenticated(auth);
    setUserEmail(email);
    setUserId(id);
    setUserRole(role);
  }, []);
  
  // Auth functions
  const checkAuth = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };
  
  const login = (email: string): boolean => {
    const user = window.mockUsers?.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userRole', user.role);
      
      setIsAuthenticated(true);
      setUserEmail(user.email);
      setUserId(user.id);
      setUserRole(user.role);
      return true; // Login successful
    } else {
      // User not found during login attempt
      toast.error("Email not found. Please register first.");
      return false; // Login failed
    }
  };
  
  const register = (email: string, name: string): boolean => {
     // Check if user already exists
     if (window.mockUsers?.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        toast.error("Email already registered. Please log in.");
        return false; // Registration failed
     }

    // Use the mock function to create user
    const newUser = createUserMock(email, name, 'member'); // Default role 'member'
    
    // Login the new user immediately
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', newUser.email);
    localStorage.setItem('userId', newUser.id);
    localStorage.setItem('userRole', newUser.role);
    
    setIsAuthenticated(true);
    setUserEmail(newUser.email);
    setUserId(newUser.id);
    setUserRole(newUser.role);
    return true; // Registration successful
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
    // Optionally navigate to home or login after logout
    // navigate('/'); 
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
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/features" element={<FeaturesPage />} /> {/* Add route for Features */}
              
              {/* Protected routes */}
              <Route path="/privacy" element={<PrivacyPage />} />
              
              {/* Protected routes */}
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
                <Route path="/material-history" element={<MaterialHistoryPage />} /> 
                <Route path="/calendar" element={<CalendarPage />} /> 
                <Route path="/messages" element={<MessagesPage />} /> 
              </Route>
              
              {/* Fallback route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
