import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Instagram, Facebook, MessageCircle, TrendingUp, Calendar, Users, Heart, Share2, Eye, Plus, Settings, Bell, Search } from 'lucide-react';

const SocialMediaDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // 모의 데이터
  const platformData = [
    { name: '인스타그램', followers: 15420, posts: 89, engagement: 4.2, color: '#E4405F', icon: Instagram },
    { name: '페이스북', followers: 8930, posts: 45, engagement: 3.8, color: '#1877F2', icon: Facebook },
    { name: '카카오스토리', followers: 5240, posts: 32, engagement: 2.9, color: '#FFCD00', icon: MessageCircle }
  ];

  const engagementData = [
    { date: '09-15', instagram: 120, facebook: 85, kakao: 45 },
    { date: '09-16', instagram: 140, facebook: 92, kakao: 52 },
    { date: '09-17', instagram: 160, facebook: 78, kakao: 38 },
    { date: '09-18', instagram: 180, facebook: 105, kakao: 65 },
    { date: '09-19', instagram: 145, facebook: 88, kakao: 42 },
    { date: '09-20', instagram: 195, facebook: 112, kakao: 58 },
    { date: '09-21', instagram: 210, facebook: 95, kakao: 48 }
  ];

  const recentPosts = [
    { id: 1, platform: 'instagram', content: '새로운 버츄얼 아이돌 등장?! 🎉', likes: 245, comments: 32, shares: 18, time: '2시간 전' },
    { id: 2, platform: 'facebook', content: '리뷰 이벤트 당첨자 안내드립니다', likes: 156, comments: 28, shares: 42, time: '4시간 전' },
    { id: 3, platform: 'kakao', content: '고객 후기 모음집', likes: 89, comments: 15, shares: 8, time: '6시간 전' }
  ];

  const scheduledPosts = [
    { id: 1, platform: 'instagram', content: '월요일 모티베이션 포스트', scheduledTime: '2025-09-23 09:00', status: 'scheduled' },
    { id: 2, platform: 'facebook', content: '신제품 티저 영상', scheduledTime: '2025-09-23 14:00', status: 'scheduled' },
    { id: 3, platform: 'kakao', content: '주간 뉴스레터', scheduledTime: '2025-09-24 10:00', status: 'draft' }
  ];

  const comments = [
    { id: 1, platform: 'instagram', author: 'user123', content: '그래서 그 아이돌 이름이 ㅁㄷ?', post: '새로운 버츄얼 아이돌 등장?!', time: '1시간 전', replied: false },
    { id: 2, platform: 'facebook', author: 'customer456', content: '왜 나는 없냐?', post: '리뷰 이벤트 당첨자 안내드립니다', time: '3시간 전', replied: true },
    { id: 3, platform: 'kakao', author: 'member789', content: '가격 정보 알려주세요', post: '고객 후기 모음집', time: '5시간 전', replied: false }
  ];

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-500" />;
      case 'kakao': return <MessageCircle className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* 상단 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platformData.map((platform) => (
          <div key={platform.name} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${platform.color}20` }}>
                  <platform.icon className="w-6 h-6" style={{ color: platform.color }} />
                </div>
                <h3 className="font-semibold text-gray-800">{platform.name}</h3>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">팔로워</span>
                <span className="font-bold text-lg">{platform.followers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">게시글</span>
                <span className="font-semibold">{platform.posts}개</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">참여율</span>
                <span className="font-semibold text-green-600">{platform.engagement}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 참여도 트렌드 차트 */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
          주간 참여도 트렌드
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} />
            <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} />
            <Line type="monotone" dataKey="kakao" stroke="#FFCD00" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 최근 게시글 */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">최근 게시글 성과</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                {getPlatformIcon(post.platform)}
                <div>
                  <p className="font-medium">{post.content}</p>
                  <p className="text-sm text-gray-500">{post.time}</p>
                </div>
              </div>
              <div className="flex space-x-6 text-sm">
                <span className="flex items-center text-red-500">
                  <Heart className="w-4 h-4 mr-1" />
                  {post.likes}
                </span>
                <span className="flex items-center text-blue-500">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {post.comments}
                </span>
                <span className="flex items-center text-green-500">
                  <Share2 className="w-4 h-4 mr-1" />
                  {post.shares}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">콘텐츠 관리</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          새 게시글
        </button>
      </div>

      {/* 예약된 게시글 */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-500" />
          예약된 게시글
        </h3>
        <div className="space-y-4">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                {getPlatformIcon(post.platform)}
                <div>
                  <p className="font-medium">{post.content}</p>
                  <p className="text-sm text-gray-500">예정: {post.scheduledTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs ${post.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {post.status === 'scheduled' ? '예약됨' : '임시저장'}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 게시글 작성 폼 */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">새 게시글 작성</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">플랫폼 선택</label>
            <div className="flex space-x-4">
              {['instagram', 'facebook', 'kakao'].map((platform) => (
                <label key={platform} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  {getPlatformIcon(platform)}
                  <span className="capitalize">{platform}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="게시글 내용을 입력하세요..."
            />
          </div>
          <div className="flex justify-between">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              임시저장
            </button>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                예약 포스팅
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                즉시 게시
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">댓글 관리</h2>
        <div className="flex space-x-2">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="all">전체 플랫폼</option>
            <option value="instagram">인스타그램</option>
            <option value="facebook">페이스북</option>
            <option value="kakao">카카오스토리</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">최근 댓글</h3>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getPlatformIcon(comment.platform)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-1">게시글: {comment.post}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {comment.replied ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">답변완료</span>
                  ) : (
                    <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                      답변하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">통계 분석</h2>

      {/* 플랫폼별 성과 비교 */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">플랫폼별 팔로워 현황</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={platformData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="followers" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 참여도 분포 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">참여도 분포</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="followers"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">주요 지표</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span>총 팔로워 수</span>
              <span className="font-bold text-xl text-blue-600">
                {platformData.reduce((sum, p) => sum + p.followers, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span>총 게시글 수</span>
              <span className="font-bold text-xl text-green-600">
                {platformData.reduce((sum, p) => sum + p.posts, 0)}개
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span>평균 참여율</span>
              <span className="font-bold text-xl text-purple-600">
                {(platformData.reduce((sum, p) => sum + p.engagement, 0) / platformData.length).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                <h1 className="text-xl font-bold text-gray-900">소셜 미디어 통합 대시보드</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-6">
          {/* 사이드바 */}
          <aside className="w-64 bg-white rounded-xl shadow-lg p-4 h-fit border border-gray-100">
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: '대시보드', icon: TrendingUp },
                { id: 'content', label: '콘텐츠 관리', icon: Plus },
                { id: 'comments', label: '댓글 관리', icon: MessageCircle },
                { id: 'analytics', label: '통계 분석', icon: BarChart }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* 로그인 정보 */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">로그인 창 및 설정창 기타 등등</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>연결된 계정</span>
                  <span className="font-medium">3개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>마지막 동기화</span>
                  <span>10분 전</span>
                </div>
              </div>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'content' && renderContentManagement()}
            {activeTab === 'comments' && renderCommentManagement()}
            {activeTab === 'analytics' && renderAnalytics()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard; 2