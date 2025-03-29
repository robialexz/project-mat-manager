import { useTranslation } from 'react-i18next';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Check, DollarSign } from 'lucide-react';

    const PricingPage = () => {
      const { t } = useTranslation();

      // Placeholder pricing tiers
      const tiers = [
        { name: "Free", price: "$0", features: ["1 Project", "50 Materials", "Basic Support"], cta: t('homepage.startFreeTrial') },
        { name: "Pro", price: "$49", features: ["10 Projects", "Unlimited Materials", "Priority Support", "Team Collaboration"], cta: "Choose Pro" },
        { name: "Enterprise", price: "Custom", features: ["Unlimited Projects", "Advanced Reporting", "Dedicated Support", "Custom Integrations"], cta: "Contact Sales" },
      ];

      return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-4">{t('pages.pricing')}</h1>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Choose the plan that best fits your construction management needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {tiers.map((tier) => (
                <Card key={tier.name} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-4xl font-bold mt-2">{tier.price}<span className="text-sm font-normal text-muted-foreground">/month</span></CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                     <Button className="w-full">{tier.cta}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    };

    export default PricingPage;
