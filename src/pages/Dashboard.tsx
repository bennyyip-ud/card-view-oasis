
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, History, LogOut, User, BarChart3, Shield } from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const menuItems = [
    {
      title: t('dashboard.cardDetails'),
      description: t('dashboard.cardDetails.desc'),
      icon: CreditCard,
      path: "/card-details",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: t('dashboard.transactionHistory'),
      description: t('dashboard.transactionHistory.desc'),
      icon: History,
      path: "/transaction-history",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
      <div className="container mx-auto px-4 py-8">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h1>
            <p className="text-white/90">{t('dashboard.welcome').replace('{username}', user.username)}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t('logout')}
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <User className="w-5 h-5 mr-2" />
              {t('dashboard.personalInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-white/70 text-sm">{t('dashboard.username')}</p>
                <p className="font-semibold">{user.username}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">{t('dashboard.email')}</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">{t('dashboard.accountStatus')}</p>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-green-400" />
                  <span className="font-semibold text-green-400">{t('dashboard.verified')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in">
            <CardContent className="p-6 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="text-2xl font-bold mb-1">3</h3>
              <p className="text-white/80 text-sm">{t('dashboard.cardCount')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="text-2xl font-bold mb-1">156</h3>
              <p className="text-white/80 text-sm">{t('dashboard.monthlyTransactions')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in">
            <CardContent className="p-6 text-center">
              <History className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="text-2xl font-bold mb-1">$12,345</h3>
              <p className="text-white/80 text-sm">{t('dashboard.monthlySpending')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Menu */}
        <div className="grid md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <Card 
              key={index}
              className="bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Button className={`bg-gradient-to-r ${item.color} text-white hover:opacity-90 transition-all duration-300`}>
                  {t('dashboard.viewNow')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
