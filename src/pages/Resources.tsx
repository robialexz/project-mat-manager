import { useTranslation } from 'react-i18next';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { BookOpen } from 'lucide-react';

    const ResourcesPage = () => {
      const { t } = useTranslation();

      return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-10">{t('pages.resources')}</h1>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Helpful Resources
                </CardTitle>
                 <CardDescription>Guides, tutorials, and best practices.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Placeholder text for the Resources page. Here you will find helpful guides, tutorials, case studies, and best practices related to construction management and using ConstruxHub effectively.
                </p>
                 {/* Add links or resource cards later */}
                 <div className="text-center py-8">
                    (Resource content coming soon)
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    };

    export default ResourcesPage;
