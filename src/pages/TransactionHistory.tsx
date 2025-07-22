
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Filter, Download, ArrowUpRight, ArrowDownLeft, ShoppingCart, Coffee, Car, Phone } from "lucide-react";
import { useState, useEffect } from "react";

const TransactionHistory = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const transactions = [
    {
      id: '1',
      type: 'expense',
      amount: 1250.00,
      description: '超市購物',
      merchant: '家樂福超市',
      date: '2024-01-22',
      time: '14:32',
      category: 'shopping',
      status: 'completed',
      cardLast4: '9012'
    },
    {
      id: '2',
      type: 'expense',
      amount: 45.80,
      description: '咖啡廳消費',
      merchant: '星巴克咖啡',
      date: '2024-01-22',
      time: '09:15',
      category: 'food',
      status: 'completed',
      cardLast4: '1098'
    },
    {
      id: '3',
      type: 'income',
      amount: 5000.00,
      description: '薪水轉帳',
      merchant: 'ABC公司',
      date: '2024-01-21',
      time: '10:00',
      category: 'salary',
      status: 'completed',
      cardLast4: '9012'
    },
    {
      id: '4',
      type: 'expense',
      amount: 280.50,
      description: '加油站',
      merchant: '中石油加油站',
      date: '2024-01-20',
      time: '18:45',
      category: 'transport',
      status: 'completed',
      cardLast4: '1111'
    },
    {
      id: '5',
      type: 'expense',
      amount: 99.99,
      description: '手機充值',
      merchant: '中國移動',
      date: '2024-01-19',
      time: '16:20',
      category: 'utilities',
      status: 'pending',
      cardLast4: '9012'
    },
    {
      id: '6',
      type: 'expense',
      amount: 2500.00,
      description: '線上購物',
      merchant: '淘寶商城',
      date: '2024-01-18',
      time: '21:33',
      category: 'shopping',
      status: 'completed',
      cardLast4: '1098'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'shopping':
        return ShoppingCart;
      case 'food':
        return Coffee;
      case 'transport':
        return Car;
      case 'utilities':
        return Phone;
      default:
        return ShoppingCart;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'pending':
        return '處理中';
      case 'failed':
        return '失敗';
      default:
        return '未知';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

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
            <h1 className="text-3xl font-bold mb-1">消費記錄</h1>
            <p className="text-white/90">查看您的所有交易歷史</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">總支出</p>
                  <p className="text-2xl font-bold text-red-300">-${totalExpense.toLocaleString()}</p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-red-300" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">總收入</p>
                  <p className="text-2xl font-bold text-green-300">+${totalIncome.toLocaleString()}</p>
                </div>
                <ArrowDownLeft className="w-8 h-8 text-green-300" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">交易筆數</p>
                  <p className="text-2xl font-bold">{transactions.length}</p>
                </div>
                <Filter className="w-8 h-8 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white/95 backdrop-blur-sm mb-6 animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>篩選和搜索</span>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                匯出記錄
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="搜索交易記錄..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="選擇類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有交易</SelectItem>
                  <SelectItem value="income">收入</SelectItem>
                  <SelectItem value="expense">支出</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="bg-white/95 backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle>交易記錄</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => {
                const CategoryIcon = getCategoryIcon(transaction.category);
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <CategoryIcon className={`w-6 h-6 ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{transaction.description}</h3>
                        <p className="text-sm text-gray-500">{transaction.merchant}</p>
                        <p className="text-xs text-gray-400">
                          {transaction.date} {transaction.time} • 卡號尾號 {transaction.cardLast4}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </p>
                      <Badge className={`${getStatusColor(transaction.status)} mt-1`}>
                        {getStatusText(transaction.status)}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">沒有找到符合條件的交易記錄</p>
                <p className="text-gray-400 text-sm mt-2">請嘗試調整搜索條件</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionHistory;
