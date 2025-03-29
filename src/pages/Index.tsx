import { useTranslation } from 'react-i18next'; // Keep i18n import for future use
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
    // Import necessary icons (adjust if some were added later)
    import { Building, Package, Users, LayoutDashboard, ListChecks, AlertTriangle, BarChart as BarChartIcon, ArrowRight, FileSpreadsheet, ShoppingBag, Calendar, MessageCircle } from "lucide-react"; 
    import { Link, useNavigate } from "react-router-dom"; // Use Link/navigate for mock navigation
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

    // Mock data for the chart (as per commit 7473f50 state)
    const projectStatusData = [
      { name: 'Active', count: 5, fill: 'hsl(var(--primary))' },
      { name: 'Completed', count: 8, fill: 'hsl(var(--success))' }, 
      { name: 'Archived', count: 2, fill: 'hsl(var(--muted))' },
    ];

    const Index = () => {
      // Use placeholder 't' function for now until i18n is re-implemented
      const t = (key: string, options?: any) => {
         // Simple placeholder logic
         const keyParts = key.split('.');
         let text = keyParts[keyParts.length - 1];
         // Capitalize first letter and replace camelCase/underscores
         text = text.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
         text = text.charAt(0).toUpperCase() + text.slice(1);
         // Handle simple interpolation if needed
         if (options && options.count) {
            text = text.replace('{count}', options.count);
         }
         return text;
      };
      const navigate = useNavigate();

      return (
        <div className="container mx-auto px-4 py-8 md:py-12 space-y-16 md:space-y-20">
          
          {/* Hero Section - Enhanced */}
          <section className="text-center py-16 md:py-24 px-6 rounded-lg shadow-sm relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
             <div className="relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
                  {t('homepage.welcomeTitle', { defaultValue: "Welcome to the Material Manager"})}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                  {t('homepage.welcomeSubtitle', { defaultValue: "Manage your projects, materials, and suppliers in one place."})}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {/* Use onClick for navigation */}
                  <Button size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow duration-300" onClick={() => navigate('/login')}>
                    {t('homepage.startFreeTrial', { defaultValue: "Start Free Trial"})} 
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
                    {t('homepage.viewDashboard', { defaultValue: "View Dashboard"})}
                  </Button>
                </div>
             </div>
          </section>

           {/* Quick Stats/Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-primary">
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                 <CardTitle className="text-sm font-medium">{t('homepage.totalProjects', { defaultValue: "Total Projects"})}</CardTitle>
                 <FileSpreadsheet className="h-4 w-4 text-muted-foreground" /> {/* Changed icon */}
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">15</div> {/* Placeholder data */}
                 <p className="text-xs text-muted-foreground">{t('homepage.projectsSinceLastMonth', { count: 2, defaultValue: "+2 since last month" })}</p> 
               </CardContent>
             </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                 <CardTitle className="text-sm font-medium">{t('homepage.pendingTasks', { defaultValue: "Pending Tasks"})}</CardTitle>
                 <ListChecks className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">23</div> {/* Placeholder data */}
                 <p className="text-xs text-muted-foreground">{t('homepage.tasksAcrossProjects', { count: 5, defaultValue: "Across 5 projects" })}</p> 
               </CardContent>
             </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-destructive">
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                 <CardTitle className="text-sm font-medium">{t('homepage.overdueMaterials', { defaultValue: "Overdue Materials"})}</CardTitle>
                 <AlertTriangle className="h-4 w-4 text-destructive" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold">3 Orders</div> {/* Placeholder data */}
                 <p className="text-xs text-muted-foreground">{t('homepage.checkSupplierUpdates', { defaultValue: "Check supplier updates"})}</p> 
               </CardContent>
             </Card>
          </section>

           {/* Chart Section */}
          <section>
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center">
                    <BarChartIcon className="mr-2 h-5 w-5 text-primary"/> 
                    {t('homepage.projectStatusOverview', { defaultValue: "Project Status Overview"})}
                 </CardTitle>
                 <CardDescription>{t('homepage.projectStatusDescription', { defaultValue: "Distribution of projects by their current status."})}</CardDescription>
               </CardHeader>
               <CardContent className="h-[300px] w-full pl-0 pr-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectStatusData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} width={30}/>
                      <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)',
                          fontSize: '12px' 
                        }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
               </CardContent>
             </Card>
          </section>

          {/* Feature Highlights Section */}
          <section className="space-y-8">
             <h2 className="text-3xl font-bold text-center">Core Features</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Feature Card: Projects */}
                <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300">
                   <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <FileSpreadsheet className="h-8 w-8 text-primary" />
                   </div>
                   <h3 className="text-xl font-semibold mb-2">{t('homepage.projects', { defaultValue: "Projects"})}</h3>
                   <p className="text-muted-foreground text-sm mb-4 flex-grow">{t('homepage.projectsFeatureDescription', { defaultValue: "Organize, track progress, and manage all aspects of your construction projects efficiently."})}</p>
                   <Button variant="link" className="text-primary mt-auto" onClick={() => navigate('/projects')}> 
                      {t('homepage.viewProjects', { defaultValue: "View Projects"})} <ArrowRight className="ml-1 h-4 w-4"/>
                   </Button>
                </div>

                {/* Feature Card: Materials */}
                 <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300">
                   <div className="bg-blue-500/10 p-3 rounded-full mb-4">
                      <Package className="h-8 w-8 text-blue-500" />
                   </div>
                   <h3 className="text-xl font-semibold mb-2">{t('homepage.materials', { defaultValue: "Materials"})}</h3>
                   <p className="text-muted-foreground text-sm mb-4 flex-grow">{t('homepage.materialsFeatureDescription', { defaultValue: "Keep a detailed inventory of materials, manage stock levels, and track usage across projects."})}</p>
                   <Button variant="link" disabled className="text-muted-foreground mt-auto">
                      {t('homepage.viewMaterials', { defaultValue: "View Materials"})} (Soon)
                   </Button>
                </div>

                {/* Feature Card: Suppliers */}
                 <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300">
                   <div className="bg-green-500/10 p-3 rounded-full mb-4">
                      <Building className="h-8 w-8 text-green-500" />
                   </div>
                   <h3 className="text-xl font-semibold mb-2">{t('homepage.suppliers', { defaultValue: "Suppliers"})}</h3>
                   <p className="text-muted-foreground text-sm mb-4 flex-grow">{t('homepage.suppliersFeatureDescription', { defaultValue: "Maintain a database of your suppliers, manage contacts, and track performance."})}</p>
                   <Button variant="link" className="text-primary mt-auto" onClick={() => navigate('/suppliers')}>
                      {t('homepage.viewSuppliers', { defaultValue: "View Suppliers"})} <ArrowRight className="ml-1 h-4 w-4"/>
                   </Button>
                </div>

                {/* Feature Card: Users */}
                 <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300">
                   <div className="bg-purple-500/10 p-3 rounded-full mb-4">
                      <Users className="h-8 w-8 text-purple-500" />
                   </div>
                   <h3 className="text-xl font-semibold mb-2">{t('homepage.users', { defaultValue: "Users"})}</h3>
                   <p className="text-muted-foreground text-sm mb-4 flex-grow">{t('homepage.usersFeatureDescription', { defaultValue: "Manage user accounts, roles, and permissions within the application."})}</p>
                   <Button variant="link" className="text-primary mt-auto" onClick={() => navigate('/users')}>
                      {t('homepage.viewUsers', { defaultValue: "View Users"})} <ArrowRight className="ml-1 h-4 w-4"/>
                   </Button>
                </div>
             </div>
          </section>
        </div>
      );
    };

    export default Index;
