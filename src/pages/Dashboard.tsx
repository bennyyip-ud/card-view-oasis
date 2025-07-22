
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, History, LogOut, User, BarChart3, Shield } from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
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
      title: "銀行卡詳情",
      description: "查看您的所有銀行卡信息",
      icon: CreditCard,
      path: "/card-details",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "消費記錄",
      description: "查看詳細的交易歷史記錄",
      icon: History,
      path: "/transaction-history",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">會員中心</h1>
            <p className="text-white/90">歡迎回來，{user.username}！</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            登出
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <User className="w-5 h-5 mr-2" />
              個人資訊
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-white/70 text-sm">用戶名</p>
                <p className="font-semibold">{user.username}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">郵箱</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">帳戶狀態</p>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-green-400" />
                  <span className="font-semibold text-green-400">已驗證</span>
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
              <p className="text-white/80 text-sm">銀行卡數量</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="text-2xl font-bold mb-1">156</h3>
              <p className="text-white/80 text-sm">本月交易次數</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in">
            <CardContent className="p-6 text-center">
              <History className="w-8 h-8 mx-auto mb-3 text-white" />
              <h3 className="text-2xl font-bold mb-1">$12,345</h3>
              <p className="text-white/80 text-sm">本月消費總額</p>
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
                  立即查看
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
