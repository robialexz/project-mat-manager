import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ChevronRight,
  Boxes,
  CheckCircle,
  BarChart3,
  Clock,
  Users,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/login');
  };

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
          The future of construction material management is here
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in stagger-delay-3">
          <Button
            size="lg"
            className="gap-2 hover-lift"
            onClick={handleGetStarted}
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
      
      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-20 bg-accent/5 rounded-3xl my-10">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
          Transform Your Construction Management
        </h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-card p-8 rounded-xl shadow-lg hover-lift animate-fade-in stagger-delay-1">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold ml-4">30%</h3>
            </div>
            <p className="text-muted-foreground">
              Faster material procurement process compared to traditional methods
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-xl shadow-lg hover-lift animate-fade-in stagger-delay-2">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold ml-4">25%</h3>
            </div>
            <p className="text-muted-foreground">
              Reduction in material waste through accurate tracking and forecasting
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-xl shadow-lg hover-lift animate-fade-in stagger-delay-3">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold ml-4">40%</h3>
            </div>
            <p className="text-muted-foreground">
              Time saved on administrative tasks and material management
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
          Enterprise-Grade Material Management
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Custom Categories & Workflows</h3>
                <p className="text-muted-foreground">
                  Define your own material categories and customize workflows to match your specific project requirements.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Advanced Timeline Visualization</h3>
                <p className="text-muted-foreground">
                  Track material delivery schedules with interactive timelines that provide immediate visibility into procurement status.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Real-time Collaboration</h3>
                <p className="text-muted-foreground">
                  Work seamlessly with team members across locations with instant updates and notifications.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Comprehensive Analytics</h3>
                <p className="text-muted-foreground">
                  Make data-driven decisions with powerful analytics dashboards that provide insights into material costs and usage patterns.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Secure Team Management</h3>
                <p className="text-muted-foreground">
                  Control access with role-based permissions and secure team invitations to ensure data integrity.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">Automated Notifications</h3>
                <p className="text-muted-foreground">
                  Stay informed with customizable email notifications about material deliveries and project milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 bg-accent/5 rounded-3xl my-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted by Industry Leaders
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-md hover-lift">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Project Manager, ABC Construction</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "ConstruxHub has revolutionized how we manage materials. We've cut procurement time by 35% and virtually eliminated delivery-related delays."
              </p>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-xl shadow-md hover-lift">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Jane Smith</h4>
                  <p className="text-sm text-muted-foreground">Operations Director, XYZ Builders</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The custom categories and workflow features allow us to adapt the system perfectly to our specialized industrial projects."
              </p>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-xl shadow-md hover-lift">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">CEO, Johnson Contracting</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The timeline visualization gives us unprecedented clarity on our material deliveries. We can now plan our workforce with much greater precision."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary/10 rounded-lg p-8 md:p-12 text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to transform your material management?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of construction professionals who have streamlined their operations with ConstruxHub.
          </p>
          <Button
            size="lg"
            className="hover-lift"
            onClick={() => navigate('/login')}
          >
            Start Your Free Trial
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
