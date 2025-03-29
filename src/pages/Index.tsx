import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; 
import { Badge } from "@/components/ui/badge"; 
// Import necessary icons
import { Building, Package, Users, LayoutDashboard, ArrowRight, FileSpreadsheet, ShoppingBag, Zap, UsersRound, BarChart3, Boxes } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
import { toast } from 'sonner'; 

const Index = () => {
  const { t } = useTranslation(); 
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar Placeholder */}
      {/* <Navbar /> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-28 lg:py-36 xl:py-52 bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_450px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                   <Badge variant="outline" className="text-primary border-primary py-1 px-3">{t('homepage.heroBadge')}</Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none">
                    {t('homepage.heroTitle')}
                  </h1>
                  <p className="max-w-[650px] text-muted-foreground md:text-xl">
                    {t('homepage.heroSubtitle')}
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button size="lg" onClick={() => navigate('/login')} className="transition-transform hover:scale-105 shadow-md">
                     {t('homepage.startFreeTrial')}
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => {/* Scroll to features */}} className="hover:bg-muted/50 transition-colors hover:scale-105"> 
                     {t('navbar.learnMore')} 
                  </Button>
                   <Button size="lg" variant="secondary" onClick={() => toast.info("Demo request feature coming soon!")} className="hover:brightness-110 transition-all hover:scale-105">
                     {t('navbar.requestDemo')}
                   </Button>
                </div>
              </div>
              {/* Placeholder for Hero Image/Illustration */}
              <div className="bg-muted rounded-xl flex items-center justify-center aspect-video lg:aspect-square shadow-md overflow-hidden"> 
                 <Boxes className="h-36 w-36 text-muted-foreground opacity-20 transition-transform hover:scale-110 duration-500" /> 
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm shadow-sm">{t('homepage.benefitsTitle')}</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('homepage.benefitsHeadline')}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('homepage.benefitsDescription')}
                </p>
              </div>
            </div>
             <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Added group hover effect and subtle border */}
              <div className="group grid gap-2 text-center md:text-left p-6 rounded-lg hover:bg-card transition-all duration-300 hover:shadow-xl hover:scale-105 border border-transparent hover:border-primary/20">
                 <div className="flex justify-center md:justify-start"><Zap className="h-8 w-8 text-primary mb-2 transition-transform group-hover:scale-110" /></div>
                <h3 className="text-lg font-bold">{t('homepage.benefit1Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('homepage.benefit1Desc')}
                </p>
              </div>
              {/* Added group hover effect and subtle border */}
              <div className="group grid gap-2 text-center md:text-left p-6 rounded-lg hover:bg-card transition-all duration-300 hover:shadow-xl hover:scale-105 border border-transparent hover:border-primary/20">
                 <div className="flex justify-center md:justify-start"><UsersRound className="h-8 w-8 text-primary mb-2 transition-transform group-hover:scale-110" /></div>
                <h3 className="text-lg font-bold">{t('homepage.benefit2Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('homepage.benefit2Desc')}
                </p>
              </div>
              {/* Added group hover effect and subtle border */}
              <div className="group grid gap-2 text-center md:text-left p-6 rounded-lg hover:bg-card transition-all duration-300 hover:shadow-xl hover:scale-105 border border-transparent hover:border-primary/20">
                 <div className="flex justify-center md:justify-start"><BarChart3 className="h-8 w-8 text-primary mb-2 transition-transform group-hover:scale-110" /></div>
                <h3 className="text-lg font-bold">{t('homepage.benefit3Title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('homepage.benefit3Desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-16">
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
                <Card className="group hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex flex-col overflow-hidden border"> 
                   <CardHeader className="items-center text-center p-6">
                      <div className="bg-primary/10 p-4 rounded-full mb-4 inline-block transition-transform group-hover:scale-110 duration-300">
                         <FileSpreadsheet className="h-10 w-10 text-primary" />
                      </div>
                      <CardTitle>{t('homepage.projects')}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow px-6 pb-4"> 
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.projectsFeatureDescription')}</p>
                   </CardContent>
                   <CardFooter className="justify-center pb-6"> 
                      <Button variant="link" className="text-primary font-semibold group-hover:underline" onClick={() => navigate('/projects')}> 
                         {t('homepage.viewProjects')} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                      </Button>
                   </CardFooter>
                </Card>
                 {/* Feature Card: Materials */}
                 <Card className="group hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex flex-col overflow-hidden border">
                   <CardHeader className="items-center text-center p-6">
                      <div className="bg-blue-500/10 p-4 rounded-full mb-4 inline-block transition-transform group-hover:scale-110 duration-300">
                         <Package className="h-10 w-10 text-blue-500" />
                      </div>
                      <CardTitle>{t('homepage.materials')}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow px-6 pb-4">
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.materialsFeatureDescription')}</p>
                   </CardContent>
                    <CardFooter className="justify-center pb-6">
                      <Button variant="link" disabled className="text-muted-foreground font-semibold">
                         {t('homepage.viewMaterials')} (Soon)
                      </Button>
                   </CardFooter>
                 </Card>
                 {/* Feature Card: Suppliers */}
                 <Card className="group hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex flex-col overflow-hidden border">
                   <CardHeader className="items-center text-center p-6">
                      <div className="bg-green-500/10 p-4 rounded-full mb-4 inline-block transition-transform group-hover:scale-110 duration-300">
                         <Building className="h-10 w-10 text-green-500" />
                      </div>
                      <CardTitle>{t('homepage.suppliers')}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow px-6 pb-4">
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.suppliersFeatureDescription')}</p>
                   </CardContent>
                    <CardFooter className="justify-center pb-6">
                      <Button variant="link" className="text-primary font-semibold group-hover:underline" onClick={() => navigate('/suppliers')}>
                         {t('homepage.viewSuppliers')} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                      </Button>
                   </CardFooter>
                 </Card>
                 {/* Feature Card: Users */}
                 <Card className="group hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex flex-col overflow-hidden border">
                   <CardHeader className="items-center text-center p-6">
                      <div className="bg-purple-500/10 p-4 rounded-full mb-4 inline-block transition-transform group-hover:scale-110 duration-300">
                         <Users className="h-10 w-10 text-purple-500" />
                      </div>
                      <CardTitle>{t('homepage.users')}</CardTitle>
                   </CardHeader>
                   <CardContent className="text-center flex-grow px-6 pb-4">
                      <p className="text-muted-foreground text-sm mb-4">{t('homepage.usersFeatureDescription')}</p>
                   </CardContent>
                    <CardFooter className="justify-center pb-6">
                      <Button variant="link" className="text-primary font-semibold group-hover:underline" onClick={() => navigate('/users')}>
                         {t('homepage.viewUsers')} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                      </Button>
                   </CardFooter>
                 </Card>
             </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/40">
          <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t('homepage.howItWorksTitle')}</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('homepage.howItWorksDesc')}
              </p>
            </div>
             <div className="mx-auto w-full max-w-2xl grid sm:grid-cols-3 gap-6 mt-10">
               {/* Step 1 */}
               <div className="group flex flex-col items-center gap-3 p-6 border border-transparent rounded-lg hover:border-primary/20 hover:bg-card transition-all duration-300 hover:shadow-md">
                  <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110">1</div>
                  <p className="text-sm font-medium mt-2">{t('homepage.step1')}</p>
               </div>
                {/* Step 2 */}
                <div className="group flex flex-col items-center gap-3 p-6 border border-transparent rounded-lg hover:border-primary/20 hover:bg-card transition-all duration-300 hover:shadow-md">
                  <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110">2</div>
                  <p className="text-sm font-medium mt-2">{t('homepage.step2')}</p>
               </div>
                {/* Step 3 */}
                <div className="group flex flex-col items-center gap-3 p-6 border border-transparent rounded-lg hover:border-primary/20 hover:bg-card transition-all duration-300 hover:shadow-md">
                  <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110">3</div>
                  <p className="text-sm font-medium mt-2">{t('homepage.step3')}</p>
               </div>
            </div>
          </div>
        </section>

         {/* Testimonials Section */}
         <section className="w-full py-16 md:py-24 lg:py-32">
           <div className="container px-4 md:px-6">
             <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">{t('homepage.testimonialsTitle')}</h2>
             <div className="grid gap-8 md:grid-cols-3">
               <Card className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary/50">
                 <CardContent className="p-6">
                   <p className="text-muted-foreground italic mb-4">"{t('homepage.testimonial1')}"</p>
                   <p className="font-semibold text-right">- {t('homepage.testimonial1Name')}</p>
                 </CardContent>
               </Card>
               <Card className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary/50">
                 <CardContent className="p-6">
                   <p className="text-muted-foreground italic mb-4">"{t('homepage.testimonial2')}"</p>
                   <p className="font-semibold text-right">- {t('homepage.testimonial2Name')}</p>
                 </CardContent>
               </Card>
               <Card className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary/50">
                 <CardContent className="p-6">
                   <p className="text-muted-foreground italic mb-4">"{t('homepage.testimonial3')}"</p>
                   <p className="font-semibold text-right">- {t('homepage.testimonial3Name')}</p>
                 </CardContent>
               </Card>
             </div>
           </div>
         </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-28 lg:py-36 border-t bg-gradient-to-tr from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">{t('homepage.finalCtaTitle')}</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('homepage.finalCtaDesc')}
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2 mt-6">
               <Button size="lg" onClick={() => navigate('/login')} className="transition-transform hover:scale-105 shadow-lg">
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
