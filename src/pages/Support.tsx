import { useTranslation } from 'react-i18next';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { LifeBuoy } from 'lucide-react'; // Use LifeBuoy icon

    const SupportPage = () => {
      const { t } = useTranslation();

      return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-10">{t('pages.support')}</h1>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="h-5 w-5 text-primary" />
                  Contact Support
                </CardTitle>
                 <CardDescription>Get help with using ConstruxHub.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Placeholder text for the Support page. If you need assistance, please reach out to our support team via the contact methods below.
                </p>
                 {/* Add contact form or details later */}
                 <div className="text-center py-8">
                    (Support contact information coming soon)
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    };

    export default SupportPage;
