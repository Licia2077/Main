import React, { useState, useEffect } from 'react';
import { Calculator, Clock, FileText, BookOpen, Save, Plus, Trash2 } from 'lucide-react';

const MultiDiaryApp = () => {
  const [activeTab, setActiveTab] = useState('memo');
  const [memos, setMemos] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [calculator, setCalculator] = useState({
    display: '0',
    previousValue: null,
    operator: null,
    waitingForOperand: false
  });

  // 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 메모 추가
  const addMemo = () => {
    const newMemo = {
      id: Date.now(),
      title: '새 메모',
      content: '',
      date: new Date().toLocaleDateString('ko-KR')
    };
    setMemos([...memos, newMemo]);
  };

  // 메모 업데이트
  const updateMemo = (id, field, value) => {
    setMemos(memos.map(memo => 
      memo.id === id ? { ...memo, [field]: value } : memo
    ));
  };

  // 메모 삭제
  const deleteMemo = (id) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  // 일기 추가
  const addDiary = () => {
    const newDiary = {
      id: Date.now(),
      date: new Date().toLocaleDateString('ko-KR'),
      mood: '😊',
      weather: '☀️',
      content: '',
      createdAt: new Date().toLocaleString('ko-KR')
    };
    setDiaries([...diaries, newDiary]);
  };

  // 일기 업데이트
  const updateDiary = (id, field, value) => {
    setDiaries(diaries.map(diary => 
      diary.id === id ? { ...diary, [field]: value } : diary
    ));
  };

  // 일기 삭제
  const deleteDiary = (id) => {
    setDiaries(diaries.filter(diary => diary.id !== id));
  };

  // 계산기 함수들
  const inputDigit = (digit) => {
    if (calculator.waitingForOperand) {
      setCalculator({
        ...calculator,
        display: String(digit),
        waitingForOperand: false
      });
    } else {
      setCalculator({
        ...calculator,
        display: calculator.display === '0' ? String(digit) : calculator.display + digit
      });
    }
  };

  const inputOperator = (nextOperator) => {
    const inputValue = parseFloat(calculator.display);

    if (calculator.previousValue === null) {
      setCalculator({
        ...calculator,
        previousValue: inputValue,
        operator: nextOperator,
        waitingForOperand: true
      });
    } else if (calculator.operator) {
      const currentValue = calculator.previousValue || 0;
      const newValue = calculate(currentValue, inputValue, calculator.operator);

      setCalculator({
        ...calculator,
        display: String(newValue),
        previousValue: newValue,
        operator: nextOperator,
        waitingForOperand: true
      });
    }
  };

  const calculate = (firstValue, secondValue, operator) => {
    switch (operator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(calculator.display);

    if (calculator.previousValue !== null && calculator.operator) {
      const newValue = calculate(calculator.previousValue, inputValue, calculator.operator);

      setCalculator({
        ...calculator,
        display: String(newValue),
        previousValue: null,
        operator: null,
        waitingForOperand: true
      });
    }
  };

  const clearCalculator = () => {
    setCalculator({
      display: '0',
      previousValue: null,
      operator: null,
      waitingForOperand: false
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'memo':
        return (
          <div className="h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">📝 메모</h2>
              <button
                onClick={addMemo}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
              >
                <Plus size={16} />
                새 메모
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {memos.map(memo => (
                <div key={memo.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <input
                      type="text"
                      value={memo.title}
                      onChange={(e) => updateMemo(memo.id, 'title', e.target.value)}
                      className="font-semibold text-lg border-none outline-none bg-transparent"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{memo.date}</span>
                      <button
                        onClick={() => deleteMemo(memo.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={memo.content}
                    onChange={(e) => updateMemo(memo.id, 'content', e.target.value)}
                    placeholder="메모 내용을 입력하세요..."
                    className="w-full h-32 p-2 border rounded resize-none"
                  />
                </div>
              ))}
              {memos.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  메모가 없습니다. 새 메모를 추가해보세요!
                </div>
              )}
            </div>
          </div>
        );

      case 'calculator':
        return (
          <div className="h-full">
            <h2 className="text-xl font-bold mb-4">🔢 계산기</h2>
            <div className="bg-white rounded-lg p-4 shadow-sm max-w-xs mx-auto">
              <div className="bg-black text-white text-right text-2xl p-4 rounded mb-4 font-mono">
                {calculator.display}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={clearCalculator}
                  className="col-span-2 bg-red-500 text-white p-4 rounded hover:bg-red-600"
                >
                  Clear
                </button>
                <button
                  onClick={() => inputOperator('÷')}
                  className="bg-orange-500 text-white p-4 rounded hover:bg-orange-600"
                >
                  ÷
                </button>
                <button
                  onClick={() => inputOperator('×')}
                  className="bg-orange-500 text-white p-4 rounded hover:bg-orange-600"
                >
                  ×
                </button>
                {[7, 8, 9].map(num => (
                  <button
                    key={num}
                    onClick={() => inputDigit(num)}
                    className="bg-gray-200 p-4 rounded hover:bg-gray-300"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => inputOperator('-')}
                  className="bg-orange-500 text-white p-4 rounded hover:bg-orange-600"
                >
                  -
                </button>
                {[4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => inputDigit(num)}
                    className="bg-gray-200 p-4 rounded hover:bg-gray-300"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => inputOperator('+')}
                  className="bg-orange-500 text-white p-4 rounded hover:bg-orange-600"
                >
                  +
                </button>
                {[1, 2, 3].map(num => (
                  <button
                    key={num}
                    onClick={() => inputDigit(num)}
                    className="bg-gray-200 p-4 rounded hover:bg-gray-300"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={performCalculation}
                  className="row-span-2 bg-orange-500 text-white p-4 rounded hover:bg-orange-600"
                >
                  =
                </button>
                <button
                  onClick={() => inputDigit(0)}
                  className="col-span-2 bg-gray-200 p-4 rounded hover:bg-gray-300"
                >
                  0
                </button>
                <button
                  onClick={() => inputDigit('.')}
                  className="bg-gray-200 p-4 rounded hover:bg-gray-300"
                >
                  .
                </button>
              </div>
            </div>
          </div>
        );

      case 'clock':
        return (
          <div className="h-full">
            <h2 className="text-xl font-bold mb-4">⏰ 시계</h2>
            <div className="text-center">
              <div className="bg-white rounded-lg p-8 shadow-sm max-w-md mx-auto">
                <div className="text-6xl font-mono font-bold text-blue-600 mb-4">
                  {currentTime.toLocaleTimeString('ko-KR', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
                <div className="text-2xl text-gray-600 mb-2">
                  {currentTime.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-lg text-gray-500">
                  {currentTime.toLocaleDateString('ko-KR', {
                    weekday: 'long'
                  })}
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">오전 시간</div>
                  <div className="text-xl font-bold">
                    {currentTime.toLocaleTimeString('ko-KR', {
                      hour12: true,
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">24시간 형식</div>
                  <div className="text-xl font-bold">
                    {currentTime.getHours()}:{String(currentTime.getMinutes()).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'diary':
        return (
          <div className="h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">📖 일기</h2>
              <button
                onClick={addDiary}
                className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
              >
                <Plus size={16} />
                새 일기
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {diaries.map(diary => (
                <div key={diary.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={diary.date}
                        onChange={(e) => updateDiary(diary.id, 'date', e.target.value)}
                        className="font-semibold text-lg border-none outline-none bg-transparent"
                      />
                      <select
                        value={diary.mood}
                        onChange={(e) => updateDiary(diary.id, 'mood', e.target.value)}
                        className="text-2xl border-none outline-none bg-transparent"
                      >
                        <option value="😊">😊</option>
                        <option value="😢">😢</option>
                        <option value="😡">😡</option>
                        <option value="😴">😴</option>
                        <option value="🤔">🤔</option>
                        <option value="😍">😍</option>
                      </select>
                      <select
                        value={diary.weather}
                        onChange={(e) => updateDiary(diary.id, 'weather', e.target.value)}
                        className="text-xl border-none outline-none bg-transparent"
                      >
                        <option value="☀️">☀️</option>
                        <option value="☁️">☁️</option>
                        <option value="🌧️">🌧️</option>
                        <option value="❄️">❄️</option>
                        <option value="🌤️">🌤️</option>
                        <option value="⛈️">⛈️</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{diary.createdAt}</span>
                      <button
                        onClick={() => deleteDiary(diary.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={diary.content}
                    onChange={(e) => updateDiary(diary.id, 'content', e.target.value)}
                    placeholder="오늘 하루는 어떠셨나요? 일기를 써보세요..."
                    className="w-full h-40 p-3 border rounded resize-none"
                  />
                </div>
              ))}
              {diaries.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  일기가 없습니다. 오늘의 일기를 써보세요!
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">멀티 다이어리 📱</h1>
          <p className="text-gray-600 mt-1">메모, 계산기, 시계, 일기를 한 곳에서!</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-screen">
          {/* Left Sidebar - Navigation */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-4">메뉴</h3>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('memo')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeTab === 'memo' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText size={20} />
                메모
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeTab === 'calculator' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calculator size={20} />
                계산기
              </button>
              <button
                onClick={() => setActiveTab('clock')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeTab === 'clock' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Clock size={20} />
                시계
              </button>
              <button
                onClick={() => setActiveTab('diary')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeTab === 'diary' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen size={20} />
                일기
              </button>
            </nav>

            {/* Current Time Display in Sidebar */}
            <div className="mt-8 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">현재 시간</div>
              <div className="font-mono font-bold text-lg">
                {currentTime.toLocaleTimeString('ko-KR', {
                  hour12: false
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6 bg-white rounded-lg shadow-sm p-6">
            {renderTabContent()}
          </div>

          {/* Right Sidebar - Quick Info */}
          <div className="col-span-3 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-3">오늘</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-500">날짜:</span>
                  <span className="ml-2">{currentTime.toLocaleDateString('ko-KR')}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">요일:</span>
                  <span className="ml-2">{currentTime.toLocaleDateString('ko-KR', { weekday: 'long' })}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">시간:</span>
                  <span className="ml-2">{currentTime.toLocaleTimeString('ko-KR')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-3">통계</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">메모</span>
                  <span className="font-semibold">{memos.length}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">일기</span>
                  <span className="font-semibold">{diaries.length}개</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-3">빠른 메모</h3>
              <textarea 
                placeholder="간단한 메모를 적어보세요..."
                className="w-full h-20 p-2 text-sm border rounded resize-none"
              />
              <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600">
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiDiaryApp;