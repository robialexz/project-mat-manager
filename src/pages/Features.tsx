import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ListChecks } from 'lucide-react'; // Example icon

const FeaturesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto">
        {/* Use a key from the 'pages' namespace if defined, otherwise fallback */}
        <h1 className="text-4xl font-bold tracking-tight text-center mb-10">{t('pages.features', { defaultValue: 'Features'})}</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" />
              Core Functionality
            </CardTitle>
             <CardDescription>Explore the key features of ConstruxHub.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Placeholder text for the Features page. This page will detail the core functionalities like project management, material tracking, supplier database, team collaboration, reporting, etc.
            </p>
             {/* Add feature details later */}
             <div className="text-center py-8">
                (Detailed feature descriptions coming soon)
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeaturesPage;
