
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Eye, EyeOff, Copy, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const CardDetails = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCardNumbers, setShowCardNumbers] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const cards = [
    {
      id: '1',
      bankName: '中國銀行',
      cardType: '信用卡',
      cardNumber: '4532 1234 5678 9012',
      balance: 25678.50,
      status: 'active',
      expiryDate: '12/26',
      cardHolder: 'DEMO USER',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: '2',
      bankName: '工商銀行',
      cardType: '借記卡',
      cardNumber: '5432 9876 5432 1098',
      balance: 12345.75,
      status: 'active',
      expiryDate: '08/25',
      cardHolder: 'DEMO USER',
      color: 'from-red-600 to-red-800'
    },
    {
      id: '3',
      bankName: '建設銀行',
      cardType: '信用卡',
      cardNumber: '4111 1111 1111 1111',
      balance: 8765.25,
      status: 'frozen',
      expiryDate: '03/27',
      cardHolder: 'DEMO USER',
      color: 'from-green-600 to-green-800'
    }
  ];

  const toggleCardNumber = (cardId: string) => {
    setShowCardNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const copyCardNumber = (cardNumber: string) => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
    toast({
      title: "已複製",
      description: "卡號已複製到剪貼板",
    });
  };

  const formatCardNumber = (cardNumber: string, show: boolean) => {
    if (show) {
      return cardNumber;
    }
    return cardNumber.replace(/\d(?=\d{4})/g, '*');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'frozen':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '正常';
      case 'frozen':
        return '凍結';
      default:
        return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/20 mr-4 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-1">銀行卡詳情</h1>
            <p className="text-white/90">管理您的所有銀行卡</p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="animate-fade-in">
              {/* Credit Card Visual */}
              <div className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white mb-4 relative overflow-hidden shadow-2xl`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-white/80 text-sm">{card.bankName}</p>
                      <p className="text-white/60 text-xs">{card.cardType}</p>
                    </div>
                    <Badge className={`${getStatusColor(card.status)} border-0`}>
                      {getStatusText(card.status)}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-mono tracking-wider">
                        {formatCardNumber(card.cardNumber, showCardNumbers[card.id])}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCardNumber(card.id)}
                          className="text-white hover:bg-white/20 p-1"
                        >
                          {showCardNumbers[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCardNumber(card.cardNumber)}
                          className="text-white hover:bg-white/20 p-1"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/60 text-xs">持卡人</p>
                      <p className="font-semibold">{card.cardHolder}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">有效期</p>
                      <p className="font-semibold">{card.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      卡片資訊
                    </span>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">餘額</p>
                      <p className="text-2xl font-bold text-gray-800">
                        ${card.balance.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">卡片狀態</p>
                      <Badge className={`${getStatusColor(card.status)} mt-1`}>
                        {getStatusText(card.status)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">銀行</p>
                      <p className="font-semibold text-gray-800">{card.bankName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">卡片類型</p>
                      <p className="font-semibold text-gray-800">{card.cardType}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      onClick={() => navigate('/transaction-history')}
                    >
                      查看交易記錄
                    </Button>
                    <Button variant="outline" className="flex-1">
                      卡片設定
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
