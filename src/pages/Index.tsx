
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, BarChart3, Shield, Users } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
      <div className="container mx-auto px-4 py-8">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        
        {/* Header */}
        <div className="text-center text-white mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            {t('platform.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 animate-fade-in">
            {t('platform.subtitle')}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Shield, title: t('feature.security'), desc: t('feature.security.desc') },
            { icon: CreditCard, title: t('feature.cards'), desc: t('feature.cards.desc') },
            { icon: BarChart3, title: t('feature.transactions'), desc: t('feature.transactions.desc') },
            { icon: Users, title: t('feature.support'), desc: t('feature.support.desc') }
          ].map((feature, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-white/95 backdrop-blur-sm max-w-md mx-auto animate-scale-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('cta.description')}
              </p>
              <Button 
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                {t('cta.button')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
