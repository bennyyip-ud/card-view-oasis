import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  zh: {
    // Common
    'back': '返回',
    'loading': '載入中...',
    'login': '登入',
    'logout': '登出',
    'password': '密碼',
    'email': '郵箱',
    'username': '用戶名',
    'submit': '提交',
    'cancel': '取消',
    'confirm': '確認',
    'close': '關閉',
    'save': '保存',
    'delete': '刪除',
    'edit': '編輯',
    'view': '查看',
    'search': '搜尋',
    'filter': '篩選',
    'sort': '排序',
    'export': '匯出',
    'print': '列印',
    'refresh': '刷新',
    'next': '下一頁',
    'previous': '上一頁',
    'total': '總計',
    'amount': '金額',
    'date': '日期',
    'time': '時間',
    'status': '狀態',
    'type': '類型',
    'description': '描述',
    'language': '語言',
    
    // Index page
    'platform.title': '會員卡務平台',
    'platform.subtitle': '安全便捷的銀行卡管理系統',
    'feature.security': '安全登入',
    'feature.security.desc': '多重驗證保護',
    'feature.cards': '卡片管理',
    'feature.cards.desc': '查看所有銀行卡',
    'feature.transactions': '消費記錄',
    'feature.transactions.desc': '詳細交易歷史',
    'feature.support': '客戶服務',
    'feature.support.desc': '24小時在線支援',
    'cta.title': '立即開始使用',
    'cta.description': '登入您的帳戶，管理您的銀行卡和消費記錄',
    'cta.button': '立即登入',
    
    // Login page
    'login.welcome': '歡迎！',
    'login.subtitle': '用戶名/郵箱登錄',
    'login.oldUser': '老用戶請輸入用戶名',
    'login.newUser': '新用戶請輸入郵箱進行登錄',
    'login.demo': '演示帳號：demo / 密碼：123456',
    'login.username.label': '用戶名/郵箱',
    'login.username.placeholder': '請輸入您的用戶名或郵箱',
    'login.password.label': '密碼',
    'login.password.placeholder': '請輸入您的密碼',
    'login.button': '登錄',
    'login.loading': '登錄中...',
    'login.forgotPassword': '忘記密碼？',
    'login.backToHome': '返回首頁',
    'login.error.empty': '請填寫完整資訊',
    'login.error.emptyDesc': '用戶名和密碼都是必填項目',
    'login.success': '登入成功',
    'login.success.desc': '歡迎回來！',
    'login.error.failed': '登入失敗',
    'login.error.failedDesc': '用戶名或密碼錯誤，請重試',
    
    // Forgot Password page
    'forgot.title': '忘記密碼？',
    'forgot.description': '請輸入您的郵箱地址，我們將發送重設密碼的鏈接給您',
    'forgot.email.label': '郵箱地址',
    'forgot.email.placeholder': '請輸入您的郵箱地址',
    'forgot.button': '發送重設郵件',
    'forgot.sending': '發送中...',
    'forgot.backToLogin': '返回登入',
    'forgot.success.title': '郵件已發送',
    'forgot.success.description': '我們已向 {email} 發送了重設密碼的郵件。請檢查您的收件箱並按照郵件中的指示操作。',
    'forgot.success.note': '沒有收到郵件？請檢查垃圾郵件資料夾，或者聯繫客服獲得幫助。',
    'forgot.resend': '重新發送郵件',
    'forgot.backToLoginPage': '返回登入頁面',
    'forgot.error.empty': '請輸入郵箱地址',
    'forgot.error.emptyDesc': '請提供您的郵箱以重設密碼',
    'forgot.error.invalid': '郵箱格式錯誤',
    'forgot.error.invalidDesc': '請輸入有效的郵箱地址',
    'forgot.success.toast': '重設郵件已發送',
    'forgot.success.toastDesc': '請檢查您的郵箱並按照指示重設密碼',
    
    // Dashboard page
    'dashboard.title': '會員中心',
    'dashboard.welcome': '歡迎回來，{username}！',
    'dashboard.personalInfo': '個人資訊',
    'dashboard.username': '用戶名',
    'dashboard.email': '郵箱',
    'dashboard.accountStatus': '帳戶狀態',
    'dashboard.verified': '已驗證',
    'dashboard.cardCount': '銀行卡數量',
    'dashboard.monthlyTransactions': '本月交易次數',
    'dashboard.monthlySpending': '本月消費總額',
    'dashboard.cardDetails': '銀行卡詳情',
    'dashboard.cardDetails.desc': '查看您的所有銀行卡信息',
    'dashboard.transactionHistory': '消費記錄',
    'dashboard.transactionHistory.desc': '查看詳細的交易歷史記錄',
    'dashboard.viewNow': '立即查看',
    
    // Card Details page
    'cards.title': '銀行卡詳情',
    'cards.subtitle': '管理您的所有銀行卡',
    'cards.noCards': '暫無銀行卡',
    'cards.noCards.desc': '您目前還沒有添加任何銀行卡',
    'cards.addCard': '添加銀行卡',
    'cards.cardNumber': '卡號',
    'cards.cardType': '卡片類型',
    'cards.bank': '發卡銀行',
    'cards.balance': '餘額',
    'cards.expiryDate': '到期日期',
    'cards.status': '狀態',
    'cards.active': '正常',
    'cards.blocked': '已凍結',
    'cards.expired': '已過期',
    'cards.debit': '借記卡',
    'cards.credit': '信用卡',
    'cards.actions': '操作',
    'cards.freeze': '凍結',
    'cards.unfreeze': '解凍',
    'cards.viewDetails': '查看詳情',
    'cards.transactionHistory': '交易記錄',
    
    // Transaction History page
    'transactions.title': '消費記錄',
    'transactions.subtitle': '查看您的所有交易記錄',
    'transactions.noTransactions': '暫無交易記錄',
    'transactions.noTransactions.desc': '您目前還沒有任何交易記錄',
    'transactions.merchant': '商戶',
    'transactions.category': '類別',
    'transactions.paymentMethod': '支付方式',
    'transactions.income': '收入',
    'transactions.expense': '支出',
    'transactions.transfer': '轉帳',
    'transactions.refund': '退款',
    'transactions.food': '餐飲',
    'transactions.shopping': '購物',
    'transactions.transport': '交通',
    'transactions.entertainment': '娛樂',
    'transactions.utilities': '水電費',
    'transactions.healthcare': '醫療',
    'transactions.education': '教育',
    'transactions.other': '其他',
    'transactions.filters': '篩選條件',
    'transactions.dateRange': '日期範圍',
    'transactions.amountRange': '金額範圍',
    'transactions.all': '全部',
    'transactions.lastWeek': '上週',
    'transactions.lastMonth': '上月',
    'transactions.last3Months': '近3個月',
    'transactions.thisYear': '今年',
    'transactions.reset': '重置',
    'transactions.apply': '應用',
    
    // Not Found page
    'notFound.title': '頁面未找到',
    'notFound.description': '抱歉，您訪問的頁面不存在',
    'notFound.backHome': '返回首頁',
  },
  en: {
    // Common
    'back': 'Back',
    'loading': 'Loading...',
    'login': 'Login',
    'logout': 'Logout',
    'password': 'Password',
    'email': 'Email',
    'username': 'Username',
    'submit': 'Submit',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'close': 'Close',
    'save': 'Save',
    'delete': 'Delete',
    'edit': 'Edit',
    'view': 'View',
    'search': 'Search',
    'filter': 'Filter',
    'sort': 'Sort',
    'export': 'Export',
    'print': 'Print',
    'refresh': 'Refresh',
    'next': 'Next',
    'previous': 'Previous',
    'total': 'Total',
    'amount': 'Amount',
    'date': 'Date',
    'time': 'Time',
    'status': 'Status',
    'type': 'Type',
    'description': 'Description',
    'language': 'Language',
    
    // Index page
    'platform.title': 'Member Card Platform',
    'platform.subtitle': 'Secure and convenient bank card management system',
    'feature.security': 'Secure Login',
    'feature.security.desc': 'Multi-factor authentication protection',
    'feature.cards': 'Card Management',
    'feature.cards.desc': 'View all your bank cards',
    'feature.transactions': 'Transaction Records',
    'feature.transactions.desc': 'Detailed transaction history',
    'feature.support': 'Customer Service',
    'feature.support.desc': '24/7 online support',
    'cta.title': 'Get Started Now',
    'cta.description': 'Login to your account to manage your bank cards and transaction records',
    'cta.button': 'Login Now',
    
    // Login page
    'login.welcome': 'Welcome!',
    'login.subtitle': 'Username/Email Login',
    'login.oldUser': 'Existing users please enter username',
    'login.newUser': 'New users please enter email to login',
    'login.demo': 'Demo Account: demo / Password: 123456',
    'login.username.label': 'Username/Email',
    'login.username.placeholder': 'Please enter your username or email',
    'login.password.label': 'Password',
    'login.password.placeholder': 'Please enter your password',
    'login.button': 'Login',
    'login.loading': 'Logging in...',
    'login.forgotPassword': 'Forgot Password?',
    'login.backToHome': 'Back to Home',
    'login.error.empty': 'Please fill in all information',
    'login.error.emptyDesc': 'Username and password are required',
    'login.success': 'Login Successful',
    'login.success.desc': 'Welcome back!',
    'login.error.failed': 'Login Failed',
    'login.error.failedDesc': 'Incorrect username or password, please try again',
    
    // Forgot Password page
    'forgot.title': 'Forgot Password?',
    'forgot.description': 'Please enter your email address and we will send you a password reset link',
    'forgot.email.label': 'Email Address',
    'forgot.email.placeholder': 'Please enter your email address',
    'forgot.button': 'Send Reset Email',
    'forgot.sending': 'Sending...',
    'forgot.backToLogin': 'Back to Login',
    'forgot.success.title': 'Email Sent',
    'forgot.success.description': 'We have sent a password reset email to {email}. Please check your inbox and follow the instructions in the email.',
    'forgot.success.note': "Didn't receive the email? Please check your spam folder or contact customer service for help.",
    'forgot.resend': 'Resend Email',
    'forgot.backToLoginPage': 'Back to Login Page',
    'forgot.error.empty': 'Please enter email address',
    'forgot.error.emptyDesc': 'Please provide your email to reset password',
    'forgot.error.invalid': 'Invalid email format',
    'forgot.error.invalidDesc': 'Please enter a valid email address',
    'forgot.success.toast': 'Reset email sent',
    'forgot.success.toastDesc': 'Please check your email and follow the instructions to reset your password',
    
    // Dashboard page
    'dashboard.title': 'Member Center',
    'dashboard.welcome': 'Welcome back, {username}!',
    'dashboard.personalInfo': 'Personal Information',
    'dashboard.username': 'Username',
    'dashboard.email': 'Email',
    'dashboard.accountStatus': 'Account Status',
    'dashboard.verified': 'Verified',
    'dashboard.cardCount': 'Number of Cards',
    'dashboard.monthlyTransactions': 'Monthly Transactions',
    'dashboard.monthlySpending': 'Monthly Spending',
    'dashboard.cardDetails': 'Card Details',
    'dashboard.cardDetails.desc': 'View information about all your bank cards',
    'dashboard.transactionHistory': 'Transaction History',
    'dashboard.transactionHistory.desc': 'View detailed transaction history records',
    'dashboard.viewNow': 'View Now',
    
    // Card Details page
    'cards.title': 'Bank Card Details',
    'cards.subtitle': 'Manage all your bank cards',
    'cards.noCards': 'No Bank Cards',
    'cards.noCards.desc': 'You have not added any bank cards yet',
    'cards.addCard': 'Add Bank Card',
    'cards.cardNumber': 'Card Number',
    'cards.cardType': 'Card Type',
    'cards.bank': 'Issuing Bank',
    'cards.balance': 'Balance',
    'cards.expiryDate': 'Expiry Date',
    'cards.status': 'Status',
    'cards.active': 'Active',
    'cards.blocked': 'Blocked',
    'cards.expired': 'Expired',
    'cards.debit': 'Debit Card',
    'cards.credit': 'Credit Card',
    'cards.actions': 'Actions',
    'cards.freeze': 'Freeze',
    'cards.unfreeze': 'Unfreeze',
    'cards.viewDetails': 'View Details',
    'cards.transactionHistory': 'Transaction History',
    
    // Transaction History page
    'transactions.title': 'Transaction History',
    'transactions.subtitle': 'View all your transaction records',
    'transactions.noTransactions': 'No Transaction Records',
    'transactions.noTransactions.desc': 'You have no transaction records yet',
    'transactions.merchant': 'Merchant',
    'transactions.category': 'Category',
    'transactions.paymentMethod': 'Payment Method',
    'transactions.income': 'Income',
    'transactions.expense': 'Expense',
    'transactions.transfer': 'Transfer',
    'transactions.refund': 'Refund',
    'transactions.food': 'Food & Dining',
    'transactions.shopping': 'Shopping',
    'transactions.transport': 'Transportation',
    'transactions.entertainment': 'Entertainment',
    'transactions.utilities': 'Utilities',
    'transactions.healthcare': 'Healthcare',
    'transactions.education': 'Education',
    'transactions.other': 'Other',
    'transactions.filters': 'Filters',
    'transactions.dateRange': 'Date Range',
    'transactions.amountRange': 'Amount Range',
    'transactions.all': 'All',
    'transactions.lastWeek': 'Last Week',
    'transactions.lastMonth': 'Last Month',
    'transactions.last3Months': 'Last 3 Months',
    'transactions.thisYear': 'This Year',
    'transactions.reset': 'Reset',
    'transactions.apply': 'Apply',
    
    // Not Found page
    'notFound.title': 'Page Not Found',
    'notFound.description': 'Sorry, the page you are looking for does not exist',
    'notFound.backHome': 'Back to Home',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (translation) {
      return translation;
    }
    // Fallback to Chinese if key not found in current language
    return translations.zh[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};