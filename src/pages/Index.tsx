
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, Package, ArrowRight, FileUp, Users, Settings } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-16 pb-24 text-center">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-primary rounded-lg flex items-center justify-center mb-6">
            <Package className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Mat<span className="text-primary">Manager</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Streamline your construction material tracking and procurement workflow
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="gap-2"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => navigate('/projects')}
          >
            Browse Projects
            <FileSpreadsheet className="h-4 w-4" />
          </Button>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Simplify Your Material Management
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Import from Excel</h3>
            <p className="text-muted-foreground">
              Easily import material lists from Excel or CSV files, or enter them manually into the system.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Track Changes</h3>
            <p className="text-muted-foreground">
              Monitor all changes to materials with timestamps and notifications for purchasing staff.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
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
        <div className="bg-primary/10 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to optimize your material management?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Get started today and see how MatManager can streamline your construction material workflow.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
          >
            Get Started Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 py-10 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Package className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold">MatManager</span>
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
            &copy; 2023 MatManager. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
