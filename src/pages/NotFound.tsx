import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 flex items-center justify-center p-4">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">{t('notFound.title')}</h2>
        <p className="text-xl opacity-90 mb-8">{t('notFound.description')}</p>
        <Button 
          onClick={() => window.location.href = "/"}
          className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-8 py-3"
        >
          {t('notFound.backHome')}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;