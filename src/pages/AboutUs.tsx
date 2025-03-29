import { useTranslation } from 'react-i18next';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Info } from 'lucide-react';

    const AboutUsPage = () => {
      const { t } = useTranslation();

      return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-10">{t('pages.aboutUs')}</h1>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Placeholder text for the About Us page. Our mission is to revolutionize construction management by providing intuitive, powerful tools that enhance efficiency and collaboration.
                </p>
                <p>
                  We believe in simplifying complex processes so that construction professionals can focus on what they do best: building.
                </p>
              </CardContent>
            </Card>
            
             <Card className="mt-8">
              <CardHeader>
                <CardTitle>Our Team (Placeholder)</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground">Information about the team behind ConstruxHub will go here.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    };

    export default AboutUsPage;
