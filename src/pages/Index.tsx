
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, LineChart, Clock, Users, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/App";

export default function Index() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-background/50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  Transform Your Construction Material Management
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  Streamline coordination between teams, track materials, and increase project efficiency with our all-in-one platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">Reduce material waste by up to 30%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">Improve project timelines by 25%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">Save up to 20% on procurement costs</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" onClick={handleGetStarted}>
                    Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Schedule a Demo
                  </Button>
                </div>
              </div>
              <div className="relative lg:ml-10 hidden lg:block">
                <div className="relative overflow-hidden rounded-lg border border-border shadow-xl bg-background">
                  <div className="bg-primary/20 py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 bg-destructive rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="bg-muted h-[400px] rounded-md flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="flex justify-center">
                          <div className="relative w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-lg mb-6">
                            <div className="absolute w-full h-full rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center">
                              <div className="text-2xl font-bold text-primary">30%</div>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Efficiency Increase</h3>
                        <p className="text-muted-foreground">
                          Average improvement in material tracking and management
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-accent/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Construction Teams Choose Us</h2>
              <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                Our platform delivers industry-leading features that transform how construction teams manage materials.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Gain real-time insights into material usage, costs, and project progress with customizable dashboards.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Streamlined Workflows</h3>
                <p className="text-muted-foreground">
                  Automate procurement processes, approvals, and notifications to keep projects moving forward.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Connect field teams, project managers, and procurement staff on a single platform for seamless coordination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">30%</div>
                <p className="text-muted-foreground">Reduction in Material Waste</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">25%</div>
                <p className="text-muted-foreground">Faster Project Completion</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">20%</div>
                <p className="text-muted-foreground">Lower Procurement Costs</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">95%</div>
                <p className="text-muted-foreground">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5 border-t border-b border-border">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-[800px] mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Construction Material Management?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of construction professionals who have improved their project efficiency with our platform.
              </p>
              <Button size="lg" onClick={handleGetStarted}>
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 md:py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="font-semibold mb-3">Product</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Integrations</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Resources</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">Guides</a></li>
                <li><a href="#" className="hover:text-foreground">Support</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Company</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Legal</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ConstruxHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
