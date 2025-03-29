
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import Users from "./pages/Users";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { generateMockProjects } from "./utils/materialUtils";

const queryClient = new QueryClient();

// Initialize mock projects in the window object for global access
if (typeof window !== 'undefined') {
  window.mockProjects = generateMockProjects(6);
}

// Create authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  checkAuth: () => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  checkAuth: () => false,
  logout: () => {},
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
  
  // Check if user is authenticated on initial load
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail');
    
    setIsAuthenticated(auth);
    setUserEmail(email);
  }, []);
  
  // Auth functions
  const checkAuth = () => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    return auth;
  };
  
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail(null);
  };
  
  const authContextValue: AuthContextType = {
    isAuthenticated,
    userEmail,
    checkAuth,
    logout,
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
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/projects/:projectId" 
                element={
                  <ProtectedRoute>
                    <ProjectDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/users" 
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
