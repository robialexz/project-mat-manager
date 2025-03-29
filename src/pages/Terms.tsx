import { useTranslation } from 'react-i18next';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { FileText } from 'lucide-react';

    const TermsPage = () => {
      const { t } = useTranslation();

      return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-10">{t('pages.terms')}</h1>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Terms of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none"> 
                {/* Use prose for better text formatting */}
                <h2>1. Acceptance of Terms</h2>
                <p>
                  Placeholder text for Terms of Service. By accessing or using ConstruxHub ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
                </p>
                <h2>2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information or software) on ConstruxHub's website for personal, non-commercial transitory viewing only... (Content needs to be replaced with actual terms)
                </p>
                 <h2>3. Disclaimer</h2>
                 <p>
                   The materials on ConstruxHub's website are provided on an 'as is' basis... (Content needs to be replaced with actual terms)
                 </p>
                 {/* Add more sections as needed */}
              </CardContent>
            </Card>
          </div>
        </div>
      );
    };

    export default TermsPage;
