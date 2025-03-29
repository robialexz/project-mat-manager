import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; 
import { Badge } from "@/components/ui/badge"; 
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; 
// Import necessary icons
import { Building, Package, Users, LayoutDashboard, ArrowRight, FileSpreadsheet, ShoppingBag, Zap, UsersRound, BarChart3, Boxes, Check, Lightbulb, Target } from "lucide-react"; 
import { useNavigate, Link } from "react-router-dom"; 
import { toast } from 'sonner'; 

const Index = () => {
  const { t } = useTranslation(); 
  const navigate = useNavigate();

  // Placeholder testimonial data
  const testimonials = [
    { name: t('homepage.testimonial1Name'), quote: t('homepage.testimonial1') },
    { name: t('homepage.testimonial2Name'), quote: t('homepage.testimonial2') },
    { name: t('homepage.testimonial3Name'), quote: t('homepage.testimonial3') },
    { name: "Sarah K., Architect", quote: "The visual project overview helps immensely in planning meetings." }, 
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar Placeholder */}
      {/* <Navbar /> */}

      <main className="flex-1">
        {/* Hero Section - Refined */}
        <section className="w-full pt-24 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32 xl:pt-52 xl:pb-40 bg-gradient-to-b from-background to-muted/40 dark:from-background dark:to-muted/20 overflow-hidden"> {/* Added overflow-hidden */}
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
              <div className="flex flex-col justify-center space-y-6 animate-fade-in-left"> {/* Added animation class */}
                <Badge variant="outline" className="w-fit text-primary border-primary py-1 px-3 animate-fade-in delay-100">{t('homepage.heroBadge')}</Badge>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in delay-200">
                  {t('homepage.heroTitle')}
                </h1>
                <p className="max-w-[650px] text-muted-foreground md:text-xl lg:text-lg xl:text-xl animate-fade-in delay-300">
                  {t('homepage.heroSubtitle')}
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row animate-fade-in delay-400">
                  <Button size="lg" onClick={() => navigate('/login')} className="transition-all duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-primary/40">
                     {t('homepage.startFreeTrial')}
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/about-us')} className="hover:bg-muted/50 transition-all duration-300 ease-in-out hover:scale-105"> 
                     {t('navbar.learnMore')} 
                  </Button>
                   <Button size="lg" variant="secondary" onClick={() => toast.info("Demo request feature coming soon!")} className="hover:brightness-110 transition-all duration-300 ease-in-out hover:scale-105">
                     {t('navbar.requestDemo')}
                   </Button>
                </div>
              </div>
              {/* Placeholder for Hero Image/Illustration - More prominent */}
              <div className="bg-gradient-to-tr from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl flex items-center justify-center aspect-square shadow-xl overflow-hidden p-8 animate-fade-in-right delay-200"> {/* Added animation class */}
                 <Boxes className="h-48 w-48 text-primary opacity-60 transition-transform duration-500 ease-out hover:scale-110 hover:opacity-80" /> 
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
           <div className="container px-4 md:px-6">
             <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-start"> {/* Changed items-center to items-start */}
                <div className="animate-fade-in delay-100"> {/* Added animation */}
                   <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-4">{t('homepage.problemTitle', { defaultValue: "The Challenge"})}</div>
                   <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">{t('homepage.problemHeadline', { defaultValue: "Tired of Construction Chaos?"})}</h2>
                   <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start">
                         <Check className="h-6 w-6 mr-3 mt-1 text-destructive flex-shrink-0"/>
                         <div>
                            <h4 className="font-semibold">Scattered Information</h4>
                            <span>{t('homepage.problem1', { defaultValue: "Juggling data across spreadsheets, emails, and notes leads to confusion and errors."})}</span>
                         </div>
                      </li>
                      <li className="flex items-start">
                         <Check className="h-6 w-6 mr-3 mt-1 text-destructive flex-shrink-0"/>
                         <div>
                            <h4 className="font-semibold">Lack of Visibility</h4>
                            <span>{t('homepage.problem2', { defaultValue: "No real-time overview of material status, orders, and project progress causes delays."})}</span>
                         </div>
                      </li>
                       <li className="flex items-start">
                         <Check className="h-6 w-6 mr-3 mt-1 text-destructive flex-shrink-0"/>
                         <div>
                            <h4 className="font-semibold">Inefficient Communication</h4>
                            <span>{t('homepage.problem3', { defaultValue: "Poor team and supplier communication results in misunderstandings and costly mistakes."})}</span>
                         </div>
                      </li>
                   </ul>
                </div>
                 <div className="animate-fade-in delay-200"> {/* Added animation */}
                   <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm mb-4">{t('homepage.solutionTitle', { defaultValue: "Our Solution"})}</div>
                   <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">{t('homepage.solutionHeadline', { defaultValue: "Centralize and Control"})}</h2>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start">
                         <Lightbulb className="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0"/>
                         <div>
                            <h4 className="font-semibold">Unified Platform</h4>
                            <span>{t('homepage.solution1', { defaultValue: "Manage projects, materials, suppliers, and team communication all in one place."})}</span>
                         </div>
                      </li>
                      <li className="flex items-start">
                         <Target className="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0"/>
                         <div>
                            <h4 className="font-semibold">Real-Time Tracking</h4>
                            <span>{t('homepage.solution2', { defaultValue: "Monitor progress, track materials, and make data-driven decisions instantly."})}</span>
                         </div>
                      </li>
                       <li className="flex items-start">
                         <UsersRound className="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0"/>
                         <div>
                            <h4 className="font-semibold">Seamless Collaboration</h4>
                            <span>{t('homepage.solution3', { defaultValue: "Keep everyone informed and aligned, reducing friction and improving workflow."})}</span>
                         </div>
                      </li>
                   </ul>
                </div>
             </div>
           </div>
        </section>

        {/* Feature Highlights Section - Alternating Layout */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6 space-y-20"> {/* Increased spacing */}
             <div className="flex flex-col items-center justify-center space-y-4 text-center">
               <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm shadow-sm">{t('homepage.featuresTitle')}</div>
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('homepage.featuresHeadline')}</h2>
                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                   {t('homepage.featuresDescription')}
                 </p>
               </div>
             </div>
             
             {/* Feature 1: Projects */}
             <div className="grid gap-10 md:grid-cols-2 items-center">
                <div className="order-2 md:order-1 space-y-4 animate-fade-in-left delay-100">
                   <div className="bg-primary/10 p-3 rounded-full mb-3 inline-block">
                      <FileSpreadsheet className="h-8 w-8 text-primary" />
                   </div>
                   <h3 className="text-2xl font-bold">{t('homepage.projects')}</h3>
                   <p className="text-muted-foreground">{t('homepage.projectsFeatureDescription')}</p>
                   <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Track milestones and deadlines.</li>
                      <li>Manage budgets and costs.</li>
                      <li>Assign tasks and team members.</li>
                   </ul>
                   <Button variant="link" className="text-primary px-0 font-semibold" onClick={() => navigate('/projects')}> 
                      {t('homepage.viewProjects')} <ArrowRight className="ml-1 h-4 w-4"/>
                   </Button>
                </div>
                 <div className="order-1 md:order-2 bg-muted rounded-lg aspect-video flex items-center justify-center p-6 shadow-sm overflow-hidden animate-fade-in-right delay-100">
                    <FileSpreadsheet className="h-28 w-28 text-muted-foreground opacity-30 transition-transform duration-500 hover:scale-105" />
                 </div>
             </div>

             {/* Feature 2: Materials */}
              <div className="grid gap-10 md:grid-cols-2 items-center">
                 <div className="bg-muted rounded-lg aspect-video flex items-center justify-center p-6 shadow-sm overflow-hidden animate-fade-in-left delay-200">
                     <Package className="h-28 w-28 text-muted-foreground opacity-30 transition-transform duration-500 hover:scale-105" />
                 </div>
                 <div className="space-y-4 animate-fade-in-right delay-200">
                   <div className="bg-blue-500/10 p-3 rounded-full mb-3 inline-block">
                      <Package className="h-8 w-8 text-blue-500" />
                   </div>
                   <h3 className="text-2xl font-bold">{t('homepage.materials')}</h3>
                   <p className="text-muted-foreground">{t('homepage.materialsFeatureDescription')}</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Detailed inventory tracking.</li>
                      <li>Manage stock levels and locations.</li>
                      <li>Track usage per project.</li>
                   </ul>
                   <Button variant="link" disabled className="text-muted-foreground px-0 font-semibold">
                      {t('homepage.viewMaterials')} (Soon)
                   </Button>
                </div>
             </div>

              {/* Feature 3: Suppliers */}
             <div className="grid gap-10 md:grid-cols-2 items-center">
                <div className="order-2 md:order-1 space-y-4 animate-fade-in-left delay-300">
                   <div className="bg-green-500/10 p-3 rounded-full mb-3 inline-block">
                      <Building className="h-8 w-8 text-green-500" />
                   </div>
                   <h3 className="text-2xl font-bold">{t('homepage.suppliers')}</h3>
                   <p className="text-muted-foreground">{t('homepage.suppliersFeatureDescription')}</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Centralized supplier database.</li>
                      <li>Manage contacts and documents.</li>
                      <li>Track orders and performance.</li>
                   </ul>
                   <Button variant="link" className="text-primary px-0 font-semibold" onClick={() => navigate('/suppliers')}> 
                      {t('homepage.viewSuppliers')} <ArrowRight className="ml-1 h-4 w-4"/>
                   </Button>
                </div>
                 <div className="order-1 md:order-2 bg-muted rounded-lg aspect-video flex items-center justify-center p-6 shadow-sm overflow-hidden animate-fade-in-right delay-300">
                    <Building className="h-28 w-28 text-muted-foreground opacity-30 transition-transform duration-500 hover:scale-105" />
                 </div>
             </div>

          </div>
        </section>

         {/* Testimonials Section - Using Carousel */}
         <section className="w-full py-16 md:py-24 lg:py-32">
           <div className="container px-4 md:px-6">
             <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-16">{t('homepage.testimonialsTitle')}</h2>
             <Carousel
               opts={{ align: "start", loop: true }}
               className="w-full max-w-4xl mx-auto"
             >
               <CarouselContent>
                 {testimonials.map((testimonial, index) => (
                   <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                     <div className="p-1 h-full">
                       <Card className="h-full flex flex-col justify-between border-l-4 border-primary/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                         <CardContent className="p-6 flex-grow">
                           <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                         </CardContent>
                         <CardFooter>
                            <p className="font-semibold text-sm">- {testimonial.name}</p>
                         </CardFooter>
                       </Card>
                     </div>
                   </CarouselItem>
                 ))}
               </CarouselContent>
               <CarouselPrevious className="hidden sm:flex transition-transform hover:scale-110"/>
               <CarouselNext className="hidden sm:flex transition-transform hover:scale-110"/>
             </Carousel>
           </div>
         </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-28 lg:py-36 border-t bg-gradient-to-tr from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
          <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6">
            <div className="space-y-4 animate-fade-in delay-100">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">{t('homepage.finalCtaTitle')}</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('homepage.finalCtaDesc')}
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2 mt-6 animate-fade-in delay-200">
               <Button size="lg" onClick={() => navigate('/login')} className="transition-transform hover:scale-105 shadow-lg hover:shadow-primary/30 duration-300">
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
          <Link className="text-xs hover:underline underline-offset-4" to="/terms"> 
            {t('footer.terms')}
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="/privacy">
             {t('footer.privacy')}
          </Link>
           <Link className="text-xs hover:underline underline-offset-4" to="/support">
             {t('footer.support')}
          </Link>
           <Link className="text-xs hover:underline underline-offset-4" to="/pricing">
             {t('footer.pricing')}
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Index;
