import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, TrendingDown, DollarSign, Wallet, Calendar, BarChart3, Globe, Cloud, Newspaper, Activity, Settings } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: '지출', amount: 15000, category: '식비', description: '점심식사', date: '2024-09-19', currency: 'KRW' },
    { id: 2, type: '수입', amount: 50000, category: '용돈', description: '주간 용돈', date: '2024-09-17', currency: 'KRW' },
    { id: 3, type: '지출', amount: 25000, category: '교통', description: '지하철카드 충전', date: '2024-09-16', currency: 'KRW' }
  ]);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newTransaction, setNewTransaction] = useState({
    type: '지출',
    amount: '',
    category: '',
    description: '',
    currency: 'KRW'
  });

  const [exchangeRates, setExchangeRates] = useState({
    USD: { rate: 1340.5, country: '미국' },
    EUR: { rate: 1490.2, country: '유럽연합' },
    JPY: { rate: 9.1, country: '일본' },
    CNY: { rate: 188.3, country: '중국' },
    GBP: { rate: 1695.8, country: '영국' }
  });

  const [weatherData, setWeatherData] = useState({
    city: '서울',
    temp: 23,
    condition: '맑음',
    humidity: 65
  });

  const [newsData, setNewsData] = useState([
    { title: '경제 뉴스: 환율 변동 소식', time: '2시간 전' },
    { title: '금융 시장 동향 분석', time: '4시간 전' },
    { title: '소비 트렌드 리포트', time: '6시간 전' }
  ]);

  const [stockData, setStockData] = useState([
    { name: 'KOSPI', value: 2485.3, change: '+1.2%', color: 'text-green-600' },
    { name: 'KOSDAQ', value: 745.8, change: '-0.5%', color: 'text-red-600' },
    { name: 'USD/KRW', value: 1340.5, change: '+0.3%', color: 'text-green-600' }
  ]);

  const categories = ['식비', '교통', '쇼핑', '교육', '의료', '오락', '기타'];
  const currencies = ['KRW', 'USD', 'EUR', 'JPY', 'CNY', 'GBP'];

  // 환율 변환 함수
  const convertCurrency = (amount, fromCurrency, toCurrency = 'KRW') => {
    if (fromCurrency === toCurrency) return amount;
    if (fromCurrency === 'KRW') return amount / (exchangeRates[toCurrency]?.rate || 1);
    if (toCurrency === 'KRW') return amount * (exchangeRates[fromCurrency]?.rate || 1);
    return (amount * (exchangeRates[fromCurrency]?.rate || 1)) / (exchangeRates[toCurrency]?.rate || 1);
  };

  // 통계 계산
  const calculateStats = () => {
    const totalIncome = transactions
      .filter(t => t.type === '수입')
      .reduce((sum, t) => sum + convertCurrency(t.amount, t.currency), 0);
    
    const totalExpense = transactions
      .filter(t => t.type === '지출')
      .reduce((sum, t) => sum + convertCurrency(t.amount, t.currency), 0);
    
    const balance = totalIncome - totalExpense;

    const categoryStats = categories.map(category => {
      const categoryExpense = transactions
        .filter(t => t.type === '지출' && t.category === category)
        .reduce((sum, t) => sum + convertCurrency(t.amount, t.currency), 0);
      return { name: category, value: categoryExpense };
    }).filter(item => item.value > 0);

    return { totalIncome, totalExpense, balance, categoryStats };
  };

  const stats = calculateStats();

  // 새 거래 추가
  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category) return;
    
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date: new Date().toISOString().split('T')[0]
    };
    
    setTransactions([transaction, ...transactions]);
    setNewTransaction({
      type: '지출',
      amount: '',
      category: '',
      description: '',
      currency: 'KRW'
    });
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff7f', '#ff1493', '#00ced1'];

  const formatCurrency = (amount, currency = 'KRW') => {
    const symbols = { KRW: '₩', USD: '$', EUR: '€', JPY: '¥', CNY: '¥', GBP: '£' };
    return `${symbols[currency]}${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* 헤더 */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wallet className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">스마트 가계부</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">현재 잔액</div>
                <div className={`text-xl font-bold ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(stats.balance)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', label: '대시보드', icon: BarChart3 },
                  { id: 'add', label: '거래 추가', icon: PlusCircle },
                  { id: 'exchange', label: '환율 정보', icon: Globe },
                  { id: 'weather', label: '날씨', icon: Cloud },
                  { id: 'news', label: '뉴스', icon: Newspaper },
                  { id: 'stocks', label: '주식/경제', icon: Activity }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-purple-100 text-purple-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* 요약 통계 */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">이번 달 요약</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">수입</span>
                  </div>
                  <span className="font-medium text-green-600">{formatCurrency(stats.totalIncome)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-gray-600">지출</span>
                  </div>
                  <span className="font-medium text-red-600">{formatCurrency(stats.totalExpense)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 차트 영역 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">카테고리별 지출</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={stats.categoryStats}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {stats.categoryStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">카테고리별 상세</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={stats.categoryStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 최근 거래 목록 */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">최근 거래</h3>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map(transaction => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            transaction.type === '수입' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {transaction.type === '수입' ? 
                              <TrendingUp className="h-4 w-4 text-green-600" /> : 
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            }
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-gray-600">{transaction.category} • {transaction.date}</div>
                          </div>
                        </div>
                        <div className={`font-medium ${
                          transaction.type === '수입' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === '수입' ? '+' : '-'}{formatCurrency(convertCurrency(transaction.amount, transaction.currency), 'KRW')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'add' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">새 거래 추가</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">거래 유형</label>
                    <select 
                      value={newTransaction.type}
                      onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="지출">지출</option>
                      <option value="수입">수입</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                    <select 
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">카테고리 선택</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">금액</label>
                    <input 
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="금액 입력"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">통화</label>
                    <select 
                      value={newTransaction.currency}
                      onChange={(e) => setNewTransaction({...newTransaction, currency: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency} {exchangeRates[currency] ? `(${exchangeRates[currency].country})` : currency === 'KRW' ? '(한국)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                    <input 
                      type="text"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="거래 설명"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button 
                      onClick={addTransaction}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      거래 추가
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'exchange' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">실시간 환율 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(exchangeRates).map(([currency, data]) => (
                    <div key={currency} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-semibold">{currency}/KRW ({data.country})</div>
                          <div className="text-sm text-gray-600">1 {currency} = {data.rate.toLocaleString()} 원</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">₩{data.rate.toLocaleString()}</div>
                          <div className="text-sm text-green-600">+0.2%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 환율 계산기 */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h4 className="text-md font-semibold mb-4">환율 계산기</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      type="number" 
                      placeholder="금액"
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                    <select className="p-3 border border-gray-300 rounded-lg">
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency} {exchangeRates[currency] ? `(${exchangeRates[currency].country})` : currency === 'KRW' ? '(한국)' : ''}
                        </option>
                      ))}
                    </select>
                    <div className="p-3 bg-white border border-gray-300 rounded-lg">
                      <div className="text-sm text-gray-600">변환 결과</div>
                      <div className="font-semibold">₩ 0</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'weather' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">날씨 정보</h3>
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-2xl font-bold mb-2">{weatherData.city}</div>
                      <div className="text-lg">{weatherData.condition}</div>
                      <div className="text-sm opacity-90">습도: {weatherData.humidity}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">{weatherData.temp}°C</div>
                      <Cloud className="h-12 w-12 mt-2 opacity-80" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['내일', '모레', '3일 후', '4일 후'].map((day, index) => (
                    <div key={day} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">{day}</div>
                      <Cloud className="h-8 w-8 mx-auto my-2 text-gray-400" />
                      <div className="text-lg font-semibold">{22 + index}°C</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">경제 뉴스</h3>
                <div className="space-y-4">
                  {newsData.map((news, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{news.title}</h4>
                          <div className="text-sm text-gray-600">{news.time}</div>
                        </div>
                        <Newspaper className="h-5 w-5 text-gray-400 ml-4" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 오늘의 경제 팁</h4>
                  <p className="text-sm text-blue-800">환율 변동이 클 때는 해외 결제를 피하고, 필요한 경우 환전 타이밍을 잘 선택하세요.</p>
                </div>
              </div>
            )}

            {activeTab === 'stocks' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">주식 & 경제 지표</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {stockData.map((stock, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{stock.name}</div>
                          <div className="text-2xl font-bold">{stock.value}</div>
                        </div>
                        <div className={`text-sm font-medium ${stock.color}`}>
                          {stock.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 모의 차트 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-4">KOSPI 일간 차트</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={[
                      { time: '09:00', value: 2480 },
                      { time: '11:00', value: 2475 },
                      { time: '13:00', value: 2485 },
                      { time: '15:00', value: 2490 },
                      { time: '16:00', value: 2485 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;