'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Target,
  Users,
  Heart,
  TrendingUp,
  Award,
  Calendar,
  CheckCircle,
  Star,
  Trophy,
  Brain,
  Apple,
  Moon,
  MessageCircle,
  ThumbsUp
} from 'lucide-react'

type TabType = 'dashboard' | 'action-plan' | 'community'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  // Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">대시보드</h1>
        <p className="text-gray-600 text-lg">나의 저속노화 여정을 한눈에 확인하세요</p>
      </motion.div>

      {/* 생체 나이 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Heart className="mr-2 text-primary-500" />
          나의 생체 나이
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">32세</div>
            <div className="text-sm text-gray-600">생체 나이</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">-2세</div>
            <div className="text-sm text-gray-600">실제 나이와의 차이</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">85점</div>
            <div className="text-sm text-gray-600">건강 점수</div>
          </div>
        </div>
      </motion.div>

      {/* 주간 진행 상황 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-primary-500" />
          이번 주 활동
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">12</div>
            <div className="text-sm text-gray-600">완료한 미션</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">7일</div>
            <div className="text-sm text-gray-600">연속 달성</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">240점</div>
            <div className="text-sm text-gray-600">획득 포인트</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">Lv.3</div>
            <div className="text-sm text-gray-600">현재 레벨</div>
          </div>
        </div>
      </motion.div>

      {/* 최근 성과 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Award className="mr-2 text-yellow-500" />
          최근 성과
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="font-semibold">7일 연속 미션 달성</span>
            </div>
            <span className="text-sm text-gray-500">오늘</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-blue-600" />
              <span className="font-semibold">레벨 3 달성</span>
            </div>
            <span className="text-sm text-gray-500">어제</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-purple-600" />
              <span className="font-semibold">100포인트 달성</span>
            </div>
            <span className="text-sm text-gray-500">2일 전</span>
          </div>
        </div>
      </motion.div>
    </div>
  )

  // Action Plan Content
  const ActionPlanContent = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">실천 계획</h1>
        <p className="text-gray-600 text-lg">오늘의 저속노화 미션을 완수하세요</p>
      </motion.div>

      {/* 오늘의 미션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Target className="mr-2 text-primary-500" />
          오늘의 추천 미션
        </h2>
        <div className="space-y-4">
          {[
            {
              icon: <Apple className="w-6 h-6" />,
              title: 'MIND 식단 1끼',
              category: '영양',
              points: 20,
              duration: '30분',
              color: 'bg-orange-100 text-orange-800'
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: '30분 걷기',
              category: '운동',
              points: 20,
              duration: '30분',
              color: 'bg-green-100 text-green-800'
            },
            {
              icon: <Moon className="w-6 h-6" />,
              title: '11시 전 취침',
              category: '수면',
              points: 20,
              duration: '5분',
              color: 'bg-blue-100 text-blue-800'
            },
            {
              icon: <Brain className="w-6 h-6" />,
              title: '5분 명상',
              category: '마음챙김',
              points: 10,
              duration: '5분',
              color: 'bg-purple-100 text-purple-800'
            }
          ].map((mission, index) => (
            <div key={index} className="mission-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-primary-500">{mission.icon}</div>
                  <div>
                    <h3 className="font-semibold">{mission.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${mission.color}`}>
                      {mission.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-500 flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-semibold">{mission.points}</span>
                  </div>
                  <span className="text-xs text-gray-500">{mission.duration}</span>
                </div>
              </div>
              <button className="w-full btn-primary text-sm py-2">
                미션 시작
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 이번 주 진행률 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Calendar className="mr-2 text-primary-500" />
          이번 주 진행률
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">영양</span>
              <span className="text-sm text-gray-600">5/7 완료</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '71%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">운동</span>
              <span className="text-sm text-gray-600">4/7 완료</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '57%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">수면</span>
              <span className="text-sm text-gray-600">6/7 완료</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '86%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">마음챙김</span>
              <span className="text-sm text-gray-600">3/7 완료</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '43%' }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )

  // Community Content
  const CommunityContent = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">커뮤니티</h1>
        <p className="text-gray-600 text-lg">함께 성장하는 저속노화 실천자들</p>
      </motion.div>

      {/* 커뮤니티 통계 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-primary-600 mb-1">2,547</div>
          <div className="text-xs text-gray-600">활성 사용자</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">1,234</div>
          <div className="text-xs text-gray-600">성공 스토리</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">5,678</div>
          <div className="text-xs text-gray-600">공유된 팁</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">89</div>
          <div className="text-xs text-gray-600">진행 중 챌린지</div>
        </div>
      </motion.div>

      {/* 인기 게시글 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Users className="mr-2 text-primary-500" />
          인기 게시글
        </h2>
        <div className="space-y-4">
          {[
            {
              author: '김저속',
              avatar: '👨‍💼',
              title: '3개월 만에 생체 나이 3세 젊어졌어요!',
              excerpt: '정희원 교수님의 저속노화 식단을 꾸준히 실천한 결과입니다...',
              likes: 127,
              comments: 23,
              category: '성공스토리'
            },
            {
              author: '건강한영희',
              avatar: '👩‍⚕️',
              title: '명상 초보자를 위한 팁',
              excerpt: '처음 명상을 시작할 때는 5분부터 시작하세요...',
              likes: 89,
              comments: 12,
              category: '팁&노하우'
            },
            {
              author: '운동마니아',
              avatar: '💪',
              title: '7일 연속 운동 챌린지 참여하세요!',
              excerpt: '함께 운동해요! 매일 30분씩 걷기 챌린지...',
              likes: 156,
              comments: 45,
              category: '챌린지'
            }
          ].map((post, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold">{post.author}</h4>
                    <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 참여 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <button className="btn-primary">
          전체 커뮤니티 보러가기
        </button>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-24">
      {/* 헤더 */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-green-600">SlowAge Journey</span>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardContent />
            </motion.div>
          )}
          {activeTab === 'action-plan' && (
            <motion.div
              key="action-plan"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ActionPlanContent />
            </motion.div>
          )}
          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CommunityContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-3 gap-2 py-3">
            {/* Dashboard 탭 */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-6 h-6 mb-1" />
              <span className="text-xs font-semibold">Dashboard</span>
            </button>

            {/* Action Plan 탭 */}
            <button
              onClick={() => setActiveTab('action-plan')}
              className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                activeTab === 'action-plan'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Target className="w-6 h-6 mb-1" />
              <span className="text-xs font-semibold">Action Plan</span>
            </button>

            {/* Community 탭 */}
            <button
              onClick={() => setActiveTab('community')}
              className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
                activeTab === 'community'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-6 h-6 mb-1" />
              <span className="text-xs font-semibold">Community</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
