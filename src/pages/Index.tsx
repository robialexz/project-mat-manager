
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileSpreadsheet, 
  Package, 
  ArrowRight, 
  FileUp, 
  Users, 
  Settings, 
  ChevronRight,
  Building,
  LayoutDashboard,
  Boxes,
  Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      {/* Nav Bar */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Boxes className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-bold">ConstruxHub</span>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => navigate('/login?signup=true')}
          >
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-16 pb-24 text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 animate-fade-in hover-lift">
            <Boxes className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in stagger-delay-1">
          <span className="text-primary">Construx</span>Hub
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in stagger-delay-2">
          Streamline your construction material tracking and procurement workflow
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in stagger-delay-3">
          <Button
            size="lg"
            className="gap-2 hover-lift"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 hover-lift"
            onClick={() => navigate('/login?signup=true')}
          >
            Create Account
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
          Smart Material Management
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-md hover-lift animate-fade-in stagger-delay-1">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Import from Excel</h3>
            <p className="text-muted-foreground">
              Easily import material lists from Excel or CSV files, or enter them manually into the system.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md hover-lift animate-fade-in stagger-delay-2">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Track Deliveries</h3>
            <p className="text-muted-foreground">
              Monitor all changes to materials with timestamps and notifications for purchasing staff.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md hover-lift animate-fade-in stagger-delay-3">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
            <p className="text-muted-foreground">
              Assign different roles to team members and collaborate efficiently on material procurement.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary/10 rounded-lg p-8 md:p-12 text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to optimize your material management?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Get started today and see how ConstruxHub can streamline your construction material workflow.
          </p>
          <Button
            size="lg"
            className="hover-lift"
            onClick={() => navigate('/dashboard')}
          >
            Get Started Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 py-10 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Boxes className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold">ConstruxHub</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Help
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ConstruxHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
