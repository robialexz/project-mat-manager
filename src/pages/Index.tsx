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
                     {t('homepage.startFreeTrial')}
                  </Button>
                  {/* Use translation for Learn More */}
                  <Button size="lg" variant="outline" onClick={() => {/* Scroll to features or open modal */}}> 
                     {t('navbar.learnMore')} 
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
                <h3 className="text-lg font-bold">{t('homepage.benefit1Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('homepage.benefit1Desc')}
                </p>
              </div>
              <div className="grid gap-1 text-center md:text-left">
                 <div className="flex justify-center md:justify-start"><UsersRound className="h-8 w-8 text-primary mb-2" /></div>
                <h3 className="text-lg font-bold">{t('homepage.benefit2Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('homepage.benefit2Desc')}
                </p>
              </div>
              <div className="grid gap-1 text-center md:text-left">
                 <div className="flex justify-center md:justify-start"><BarChart3 className="h-8 w-8 text-primary mb-2" /></div>
                <h3 className="text-lg font-bold">{t('homepage.benefit3Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('homepage.benefit3Desc')}
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
                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{t('homepage.featuresTitle')}</div>
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('homepage.featuresHeadline')}</h2>
                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                   {t('homepage.featuresDescription')}
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
                      <CardTitle>{t('homepage.projects')}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow"> 
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.projectsFeatureDescription')}</p>
                   </CardContent>
                   <CardFooter className="justify-center"> 
                      <Button variant="link" className="text-primary" onClick={() => navigate('/projects')}> 
                         {t('homepage.viewProjects')} <ArrowRight className="ml-1 h-4 w-4"/>
                      </Button>
                   </CardFooter>
                </Card>
                 {/* Feature Card: Materials */}
                 <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                   <CardHeader className="items-center text-center">
                      <div className="bg-blue-500/10 p-3 rounded-full mb-3 inline-block">
                         <Package className="h-8 w-8 text-blue-500" />
                      </div>
                      <CardTitle>{t('homepage.materials')}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow">
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.materialsFeatureDescription')}</p>
                   </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="link" disabled className="text-muted-foreground">
                         {t('homepage.viewMaterials')} (Soon)
                      </Button>
                   </CardFooter>
                 </Card>
                 {/* Feature Card: Suppliers */}
                 <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                   <CardHeader className="items-center text-center">
                      <div className="bg-green-500/10 p-3 rounded-full mb-3 inline-block">
                         <Building className="h-8 w-8 text-green-500" />
                      </div>
                      <CardTitle>{t('homepage.suppliers')}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow">
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.suppliersFeatureDescription')}</p>
                   </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="link" className="text-primary" onClick={() => navigate('/suppliers')}>
                         {t('homepage.viewSuppliers')} <ArrowRight className="ml-1 h-4 w-4"/>
                      </Button>
                   </CardFooter>
                 </Card>
                 {/* Feature Card: Users */}
                 <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                   <CardHeader className="items-center text-center">
                      <div className="bg-purple-500/10 p-3 rounded-full mb-3 inline-block">
                         <Users className="h-8 w-8 text-purple-500" />
                      </div>
                      <CardTitle>{t('homepage.users')}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow">
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.usersFeatureDescription')}</p>
                   </CardContent>
                    <CardFooter className="justify-center">
                      <Button variant="link" className="text-primary" onClick={() => navigate('/users')}>
                         {t('homepage.viewUsers')} <ArrowRight className="ml-1 h-4 w-4"/>
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
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t('homepage.howItWorksTitle')}</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('homepage.howItWorksDesc')}
              </p>
            </div>
            <div className="mx-auto w-full max-w-lg grid sm:grid-cols-3 gap-4 mt-8">
               {/* Step 1 */}
               <div className="flex flex-col items-center gap-2 p-4">
                  <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">1</div>
                  <p className="text-sm font-medium mt-2">{t('homepage.step1')}</p>
               </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center gap-2 p-4">
                  <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">2</div>
                  <p className="text-sm font-medium mt-2">{t('homepage.step2')}</p>
               </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center gap-2 p-4">
                  <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">3</div>
                  <p className="text-sm font-medium mt-2">{t('homepage.step3')}</p>
               </div>
            </div>
          </div>
        </section>

         {/* Testimonials Section */}
         <section className="w-full py-12 md:py-24 lg:py-32">
           <div className="container px-4 md:px-6">
             <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">{t('homepage.testimonialsTitle')}</h2>
             <div className="grid gap-6 md:grid-cols-3">
               <Card>
                 <CardContent className="p-6">
                   <p className="text-muted-foreground italic">"{t('homepage.testimonial1')}"</p>
                   <p className="mt-4 font-semibold">- {t('homepage.testimonial1Name')}</p>
                 </CardContent>
               </Card>
               <Card>
                 <CardContent className="p-6">
                   <p className="text-muted-foreground italic">"{t('homepage.testimonial2')}"</p>
                   <p className="mt-4 font-semibold">- {t('homepage.testimonial2Name')}</p>
                 </CardContent>
               </Card>
               <Card>
                 <CardContent className="p-6">
                   <p className="text-muted-foreground italic">"{t('homepage.testimonial3')}"</p>
                   <p className="mt-4 font-semibold">- {t('homepage.testimonial3Name')}</p>
                 </CardContent>
               </Card>
             </div>
           </div>
         </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-gradient-to-tr from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t('homepage.finalCtaTitle')}</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('homepage.finalCtaDesc')}
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button size="lg" onClick={() => navigate('/login')}>
                  {t('homepage.startFreeTrial')}
               </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} ConstruxHub. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#"> 
            {t('footer.terms')}
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
             {t('footer.privacy')}
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Index;
