import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; // Added CardFooter
import { Badge } from "@/components/ui/badge"; 
// Import necessary icons
import { Building, Package, Users, LayoutDashboard, ArrowRight, FileSpreadsheet, ShoppingBag, Zap, UsersRound, BarChart3, Boxes } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
// Removed recharts imports as they are not used in this version

const Index = () => {
  const { t } = useTranslation(); 
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Placeholder - Assuming Navbar is rendered elsewhere */}
      {/* <Navbar /> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                   <Badge variant="outline" className="text-primary border-primary">{t('homepage.heroBadge', { defaultValue: "Construction Management Simplified"})}</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {t('homepage.heroTitle', { defaultValue: "Build Smarter, Not Harder with ConstruxHub"})}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t('homepage.heroSubtitle', { defaultValue: "Stop juggling spreadsheets and emails. Centralize project data, track materials, manage suppliers, and collaborate seamlessly. Get started for free!"})}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" onClick={() => navigate('/login')}>
                     {t('homepage.startFreeTrial', { defaultValue: "Start Free Trial"})}
                  </Button>
                  {/* Changed to a "Learn More" button or similar */}
                  <Button size="lg" variant="outline" onClick={() => {/* Scroll to features or open modal */}}> 
                     {t('homepage.learnMore', { defaultValue: "Learn More"})} 
                  </Button>
                </div>
              </div>
              {/* Placeholder for Hero Image/Illustration */}
              <div className="bg-muted rounded-lg flex items-center justify-center aspect-video lg:aspect-square"> {/* Changed aspect ratio */}
                 <Boxes className="h-32 w-32 text-muted-foreground opacity-30" /> 
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{t('homepage.benefitsTitle', { defaultValue: "Why Choose ConstruxHub?"})}</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('homepage.benefitsHeadline', { defaultValue: "Streamline Your Construction Workflow"})}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('homepage.benefitsDescription', { defaultValue: "Our platform provides the tools you need to manage projects efficiently, reduce errors, and improve collaboration from site to office."})}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
              <div className="grid gap-1 text-center md:text-left">
                 <div className="flex justify-center md:justify-start"><Zap className="h-8 w-8 text-primary mb-2" /></div>
                <h3 className="text-lg font-bold">{t('homepage.benefit1Title', { defaultValue: "Increased Efficiency"})}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('homepage.benefit1Desc', { defaultValue: "Centralize all project information, reducing time spent searching for data and minimizing delays."})}
                </p>
              </div>
              <div className="grid gap-1 text-center md:text-left">
                 <div className="flex justify-center md:justify-start"><UsersRound className="h-8 w-8 text-primary mb-2" /></div>
                <h3 className="text-lg font-bold">{t('homepage.benefit2Title', { defaultValue: "Improved Collaboration"})}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('homepage.benefit2Desc', { defaultValue: "Keep your entire team, including suppliers and clients, on the same page with real-time updates."})}
                </p>
              </div>
              <div className="grid gap-1 text-center md:text-left">
                 <div className="flex justify-center md:justify-start"><BarChart3 className="h-8 w-8 text-primary mb-2" /></div>
                <h3 className="text-lg font-bold">{t('homepage.benefit3Title', { defaultValue: "Better Control"})}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('homepage.benefit3Desc', { defaultValue: "Gain clear visibility into material status, supplier performance, and project progress."})}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-12">
             <div className="flex flex-col items-center justify-center space-y-4 text-center">
               <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{t('homepage.featuresTitle', { defaultValue: "Core Features"})}</div>
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('homepage.featuresHeadline', { defaultValue: "Everything You Need in One Place"})}</h2>
                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                   {t('homepage.featuresDescription', { defaultValue: "Explore the key functionalities designed to simplify your construction management tasks."})}
                 </p>
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Feature Card: Projects */}
                <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col"> {/* Added flex flex-col */}
                   <CardHeader className="items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-3 inline-block">
                         <FileSpreadsheet className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle>{t('homepage.projects', { defaultValue: "Projects"})}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow"> {/* Added flex-grow */}
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.projectsFeatureDescription', { defaultValue: "Organize, track progress, and manage all aspects of your construction projects efficiently."})}</p>
                   </CardContent>
                   <CardFooter className="justify-center"> {/* Added CardFooter */}
                      <Button variant="link" className="text-primary" onClick={() => navigate('/projects')}> 
                         {t('homepage.viewProjects', { defaultValue: "View Projects"})} <ArrowRight className="ml-1 h-4 w-4"/>
                      </Button>
                   </CardFooter>
                </Card>
                 {/* Feature Card: Materials */}
                 <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                   <CardHeader className="items-center text-center">
                      <div className="bg-blue-500/10 p-3 rounded-full mb-3 inline-block">
                         <Package className="h-8 w-8 text-blue-500" />
                      </div>
                      <CardTitle>{t('homepage.materials', { defaultValue: "Materials"})}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow">
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.materialsFeatureDescription', { defaultValue: "Keep a detailed inventory of materials, manage stock levels, and track usage across projects."})}</p>
                   </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="link" disabled className="text-muted-foreground">
                         {t('homepage.viewMaterials', { defaultValue: "View Materials"})} (Soon)
                      </Button>
                   </CardFooter>
                 </Card>
                 {/* Feature Card: Suppliers */}
                 <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                   <CardHeader className="items-center text-center">
                      <div className="bg-green-500/10 p-3 rounded-full mb-3 inline-block">
                         <Building className="h-8 w-8 text-green-500" />
                      </div>
                      <CardTitle>{t('homepage.suppliers', { defaultValue: "Suppliers"})}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow">
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.suppliersFeatureDescription', { defaultValue: "Maintain a database of your suppliers, manage contacts, and track performance."})}</p>
                   </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="link" className="text-primary" onClick={() => navigate('/suppliers')}>
                         {t('homepage.viewSuppliers', { defaultValue: "View Suppliers"})} <ArrowRight className="ml-1 h-4 w-4"/>
                      </Button>
                   </CardFooter>
                 </Card>
                 {/* Feature Card: Users */}
                 <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                   <CardHeader className="items-center text-center">
                      <div className="bg-purple-500/10 p-3 rounded-full mb-3 inline-block">
                         <Users className="h-8 w-8 text-purple-500" />
                      </div>
                      <CardTitle>{t('homepage.users', { defaultValue: "Users"})}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow">
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.usersFeatureDescription', { defaultValue: "Manage user accounts, roles, and permissions within the application."})}</p>
                   </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="link" className="text-primary" onClick={() => navigate('/users')}>
                         {t('homepage.viewUsers', { defaultValue: "View Users"})} <ArrowRight className="ml-1 h-4 w-4"/>
                      </Button>
                   </CardFooter>
                 </Card>
             </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t('homepage.howItWorksTitle', { defaultValue: "Get Started in Minutes"})}</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('homepage.howItWorksDesc', { defaultValue: "Our intuitive platform makes managing your construction projects straightforward."})}
              </p>
            </div>
            <div className="mx-auto w-full max-w-lg grid sm:grid-cols-3 gap-4 mt-8">
               {/* Step 1 */}
               <div className="flex flex-col items-center gap-2 p-4">
                  <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">1</div>
                  <p className="text-sm font-medium mt-2">{t('homepage.step1', { defaultValue: "Sign up for free"})}</p>
               </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center gap-2 p-4">
                  <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">2</div>
                  <p className="text-sm font-medium mt-2">{t('homepage.step2', { defaultValue: "Create your project"})}</p>
               </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center gap-2 p-4">
                  <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">3</div>
                  <p className="text-sm font-medium mt-2">{t('homepage.step3', { defaultValue: "Start managing!"})}</p>
               </div>
            </div>
          </div>
        </section>

         {/* Testimonials Section */}
         <section className="w-full py-12 md:py-24 lg:py-32">
           <div className="container px-4 md:px-6">
             <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">{t('homepage.testimonialsTitle', { defaultValue: "Trusted by Builders Like You"})}</h2>
             <div className="grid gap-6 md:grid-cols-3">
               <Card>
                 <CardContent className="p-6">
                   <p className="text-muted-foreground italic">"{t('homepage.testimonial1', { defaultValue: "ConstruxHub has revolutionized how we manage materials on site. Huge time saver!"})}"</p>
                   <p className="mt-4 font-semibold">- {t('homepage.testimonial1Name', { defaultValue: "Alex G., Site Manager"})}</p>
                 </CardContent>
               </Card>
               <Card>
                 <CardContent className="p-6">
                   <p className="text-muted-foreground italic">"{t('homepage.testimonial2', { defaultValue: "Finally, a simple tool to track suppliers and orders without complex spreadsheets."})}"</p>
                   <p className="mt-4 font-semibold">- {t('homepage.testimonial2Name', { defaultValue: "Maria P., Project Coordinator"})}</p>
                 </CardContent>
               </Card>
               <Card>
                 <CardContent className="p-6">
                   <p className="text-muted-foreground italic">"{t('homepage.testimonial3', { defaultValue: "The collaboration features are fantastic for keeping the whole team updated."})}"</p>
                   <p className="mt-4 font-semibold">- {t('homepage.testimonial3Name', { defaultValue: "David R., Construction Lead"})}</p>
                 </CardContent>
               </Card>
             </div>
           </div>
         </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-gradient-to-tr from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t('homepage.finalCtaTitle', { defaultValue: "Ready to Simplify Your Workflow?"})}</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('homepage.finalCtaDesc', { defaultValue: "Sign up today and experience the difference. No credit card required for the free trial."})}
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button size="lg" onClick={() => navigate('/login')}>
                  {t('homepage.startFreeTrial', { defaultValue: "Start Your Free Trial Now"})}
               </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} ConstruxHub. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          {/* Use simple anchor tags for external/placeholder links */}
          <a className="text-xs hover:underline underline-offset-4" href="#"> {/* Removed Link component */}
            {t('footer.terms', { defaultValue: "Terms of Service"})}
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#"> {/* Removed Link component */}
             {t('footer.privacy', { defaultValue: "Privacy Policy"})}
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Index;
