import { useTranslation } from 'react-i18next';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { ShieldCheck } from 'lucide-react';

    const PrivacyPage = () => {
      const { t } = useTranslation();

      return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-10">{t('pages.privacy')}</h1>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none"> 
                {/* Use prose for better text formatting */}
                <h2>1. Information We Collect</h2>
                <p>
                  Placeholder text for Privacy Policy. We collect information you provide directly to us, such as when you create an account, update your profile, use the Service, or communicate with us... (Content needs to be replaced with actual policy)
                </p>
                <h2>2. How We Use Information</h2>
                <p>
                  We use the information we collect to provide, maintain, and improve our services... (Content needs to be replaced with actual policy)
                </p>
                 <h2>3. Information Sharing</h2>
                 <p>
                   We do not share your personal information with third parties except as described in this Privacy Policy... (Content needs to be replaced with actual policy)
                 </p>
                 {/* Add more sections as needed */}
              </CardContent>
            </Card>
          </div>
        </div>
      );
    };

    export default PrivacyPage;
