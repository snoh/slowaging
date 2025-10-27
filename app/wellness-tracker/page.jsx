'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Activity,
  Moon,
  Droplets,
  Apple,
  Brain,
  TrendingUp,
  Target,
  Calendar,
  Check,
  Plus,
  ChevronRight
} from 'lucide-react'

export default function WellnessTracker() {
  // 날짜 관련 상태
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedTab, setSelectedTab] = useState('dashboard') // dashboard, activity, sleep, nutrition, mindfulness

  // 일일 건강 데이터 상태
  const [dailyData, setDailyData] = useState({
    steps: 0,
    targetSteps: 10000,
    waterIntake: 0,
    targetWater: 8,
    sleepHours: 0,
    targetSleep: 8,
    meals: 0,
    targetMeals: 3,
    meditation: 0,
    targetMeditation: 10,
    exercise: 0,
    targetExercise: 30
  })

  // 주간 데이터
  const [weeklyData, setWeeklyData] = useState([
    { day: '월', score: 75 },
    { day: '화', score: 82 },
    { day: '수', score: 68 },
    { day: '목', score: 90 },
    { day: '금', score: 85 },
    { day: '토', score: 78 },
    { day: '일', score: 88 }
  ])

  // 목표 및 성취도
  const [achievements, setAchievements] = useState([
    { id: 1, title: '연속 7일 운동', completed: false, progress: 5, target: 7 },
    { id: 2, title: '하루 물 8잔 마시기', completed: false, progress: 6, target: 8 },
    { id: 3, title: '숙면 5일 연속', completed: false, progress: 3, target: 5 },
    { id: 4, title: '명상 10일 챌린지', completed: false, progress: 7, target: 10 }
  ])

  // 전체 건강 점수 계산
  const calculateHealthScore = () => {
    const stepsScore = Math.min((dailyData.steps / dailyData.targetSteps) * 100, 100)
    const waterScore = Math.min((dailyData.waterIntake / dailyData.targetWater) * 100, 100)
    const sleepScore = Math.min((dailyData.sleepHours / dailyData.targetSleep) * 100, 100)
    const mealScore = Math.min((dailyData.meals / dailyData.targetMeals) * 100, 100)
    const meditationScore = Math.min((dailyData.meditation / dailyData.targetMeditation) * 100, 100)
    const exerciseScore = Math.min((dailyData.exercise / dailyData.targetExercise) * 100, 100)

    return Math.round((stepsScore + waterScore + sleepScore + mealScore + meditationScore + exerciseScore) / 6)
  }

  // 탭 메뉴 데이터
  const tabs = [
    { id: 'dashboard', label: '대시보드', icon: Heart },
    { id: 'activity', label: '활동', icon: Activity },
    { id: 'sleep', label: '수면', icon: Moon },
    { id: 'nutrition', label: '영양', icon: Apple },
    { id: 'mindfulness', label: '마음챙김', icon: Brain }
  ]

  // 데이터 업데이트 함수
  const updateData = (field, increment) => {
    setDailyData(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] + increment)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-50 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Slow-Age Wellness</h1>
                <p className="text-sm text-gray-300">당신의 건강 여정을 추적하세요</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">{calculateHealthScore()}</div>
              <div className="text-xs text-gray-300">건강 점수</div>
            </div>
          </div>
        </div>
      </header>

      {/* 탭 네비게이션 - 모바일 스크롤 가능 */}
      <nav className="bg-white border-b border-gray-200 sticky top-[88px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-3 space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedTab === tab.id
                      ? 'bg-gray-800 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* 대시보드 탭 */}
          {selectedTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* 오늘의 날짜 */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">오늘의 날짜</p>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {currentDate.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                      })}
                    </h2>
                  </div>
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
              </div>

              {/* 일일 목표 카드 그리드 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* 걸음 수 */}
                <div className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <Activity className="w-6 h-6 text-blue-400" />
                    <span className="text-xs font-semibold text-gray-500">걸음 수</span>
                  </div>
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-gray-800">{dailyData.steps.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">목표: {dailyData.targetSteps.toLocaleString()}</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((dailyData.steps / dailyData.targetSteps) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* 물 섭취 */}
                <div className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <Droplets className="w-6 h-6 text-cyan-400" />
                    <span className="text-xs font-semibold text-gray-500">물 섭취</span>
                  </div>
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-gray-800">{dailyData.waterIntake}</div>
                    <div className="text-xs text-gray-500">목표: {dailyData.targetWater}잔</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((dailyData.waterIntake / dailyData.targetWater) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* 수면 */}
                <div className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <Moon className="w-6 h-6 text-indigo-400" />
                    <span className="text-xs font-semibold text-gray-500">수면</span>
                  </div>
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-gray-800">{dailyData.sleepHours}h</div>
                    <div className="text-xs text-gray-500">목표: {dailyData.targetSleep}시간</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((dailyData.sleepHours / dailyData.targetSleep) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* 식사 */}
                <div className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <Apple className="w-6 h-6 text-green-400" />
                    <span className="text-xs font-semibold text-gray-500">식사</span>
                  </div>
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-gray-800">{dailyData.meals}</div>
                    <div className="text-xs text-gray-500">목표: {dailyData.targetMeals}끼</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((dailyData.meals / dailyData.targetMeals) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* 명상 */}
                <div className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <Brain className="w-6 h-6 text-purple-400" />
                    <span className="text-xs font-semibold text-gray-500">명상</span>
                  </div>
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-gray-800">{dailyData.meditation}분</div>
                    <div className="text-xs text-gray-500">목표: {dailyData.targetMeditation}분</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((dailyData.meditation / dailyData.targetMeditation) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* 운동 */}
                <div className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                    <span className="text-xs font-semibold text-gray-500">운동</span>
                  </div>
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-gray-800">{dailyData.exercise}분</div>
                    <div className="text-xs text-gray-500">목표: {dailyData.targetExercise}분</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((dailyData.exercise / dailyData.targetExercise) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* 주간 진행 상황 */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-700" />
                  주간 건강 점수
                </h3>
                <div className="flex items-end justify-between h-40 space-x-2">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <motion.div
                        className="w-full bg-gradient-to-t from-gray-700 to-gray-800 rounded-t-lg relative"
                        initial={{ height: 0 }}
                        animate={{ height: `${day.score}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                          {day.score}
                        </div>
                      </motion.div>
                      <div className="text-xs font-medium text-gray-600 mt-2">{day.day}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 성취 목표 */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-gray-700" />
                  성취 목표
                </h3>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            achievement.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}>
                            {achievement.completed && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <span className="font-medium text-gray-800">{achievement.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden ml-8">
                        <motion.div
                          className="h-full bg-gradient-to-r from-gray-700 to-gray-800"
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 활동 탭 */}
          {selectedTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-6">활동 추적</h3>

                {/* 걸음 수 입력 */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">걸음 수</h4>
                      <p className="text-3xl font-bold text-blue-500 mt-1">{dailyData.steps.toLocaleString()}</p>
                    </div>
                    <Activity className="w-12 h-12 text-blue-400" />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => updateData('steps', 1000)}
                      className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                      +1000
                    </button>
                    <button
                      onClick={() => updateData('steps', 5000)}
                      className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                      +5000
                    </button>
                  </div>
                </div>

                {/* 운동 시간 입력 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">운동 시간</h4>
                      <p className="text-3xl font-bold text-orange-500 mt-1">{dailyData.exercise}분</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-orange-400" />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => updateData('exercise', 10)}
                      className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                      +10분
                    </button>
                    <button
                      onClick={() => updateData('exercise', 30)}
                      className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                      +30분
                    </button>
                  </div>
                </div>

                {/* 진행률 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">일일 목표 달성률</span>
                    <span className="text-sm font-bold text-gray-800">
                      {Math.round(((dailyData.steps / dailyData.targetSteps) + (dailyData.exercise / dailyData.targetExercise)) / 2 * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-500"
                      style={{ width: `${Math.min(((dailyData.steps / dailyData.targetSteps) + (dailyData.exercise / dailyData.targetExercise)) / 2 * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 수면 탭 */}
          {selectedTab === 'sleep' && (
            <motion.div
              key="sleep"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-6">수면 추적</h3>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">오늘의 수면</h4>
                    <p className="text-3xl font-bold text-indigo-500 mt-1">{dailyData.sleepHours}시간</p>
                  </div>
                  <Moon className="w-12 h-12 text-indigo-400" />
                </div>

                <div className="flex space-x-3 mb-6">
                  <button
                    onClick={() => updateData('sleepHours', 1)}
                    className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                  >
                    +1시간
                  </button>
                  <button
                    onClick={() => updateData('sleepHours', -1)}
                    className="flex-1 py-3 bg-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                  >
                    -1시간
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h5 className="font-semibold text-gray-800 mb-3">수면 품질 팁</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-indigo-500" />
                      <span>매일 같은 시간에 잠자리에 들기</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-indigo-500" />
                      <span>자기 전 1시간은 디지털 기기 사용 줄이기</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-indigo-500" />
                      <span>침실을 시원하고 어둡게 유지하기</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-indigo-500" />
                      <span>카페인은 오후 2시 이후 피하기</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* 영양 탭 */}
          {selectedTab === 'nutrition' && (
            <motion.div
              key="nutrition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-6">영양 추적</h3>

                {/* 식사 */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">식사 횟수</h4>
                      <p className="text-3xl font-bold text-green-500 mt-1">{dailyData.meals}끼</p>
                    </div>
                    <Apple className="w-12 h-12 text-green-400" />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => updateData('meals', 1)}
                      className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                      +1끼
                    </button>
                    <button
                      onClick={() => updateData('meals', -1)}
                      className="flex-1 py-3 bg-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                    >
                      -1끼
                    </button>
                  </div>
                </div>

                {/* 물 섭취 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">물 섭취</h4>
                      <p className="text-3xl font-bold text-cyan-500 mt-1">{dailyData.waterIntake}잔</p>
                    </div>
                    <Droplets className="w-12 h-12 text-cyan-400" />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => updateData('waterIntake', 1)}
                      className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                      +1잔
                    </button>
                    <button
                      onClick={() => updateData('waterIntake', -1)}
                      className="flex-1 py-3 bg-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                    >
                      -1잔
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h5 className="font-semibold text-gray-800 mb-3">영양 균형 팁</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                      <span>다양한 색깔의 채소와 과일 섭취하기</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                      <span>통곡물과 식이섬유 충분히 섭취하기</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                      <span>가공식품과 설탕 섭취 줄이기</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-cyan-500" />
                      <span>하루 8잔 이상 물 마시기</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* 마음챙김 탭 */}
          {selectedTab === 'mindfulness' && (
            <motion.div
              key="mindfulness"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-6">마음챙김</h3>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">오늘의 명상</h4>
                    <p className="text-3xl font-bold text-purple-500 mt-1">{dailyData.meditation}분</p>
                  </div>
                  <Brain className="w-12 h-12 text-purple-400" />
                </div>

                <div className="flex space-x-3 mb-6">
                  <button
                    onClick={() => updateData('meditation', 5)}
                    className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                  >
                    +5분
                  </button>
                  <button
                    onClick={() => updateData('meditation', 10)}
                    className="flex-1 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                  >
                    +10분
                  </button>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 mb-6">
                  <h5 className="font-semibold text-gray-800 mb-2">명상의 효과</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    규칙적인 명상은 스트레스 감소, 집중력 향상, 감정 조절에 도움을 줍니다.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">-25%</div>
                      <div className="text-xs text-gray-600 mt-1">스트레스</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-indigo-600">+30%</div>
                      <div className="text-xs text-gray-600 mt-1">집중력</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">+40%</div>
                      <div className="text-xs text-gray-600 mt-1">행복감</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h5 className="font-semibold text-gray-800 mb-3">명상 가이드</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-purple-500" />
                      <span>조용하고 편안한 공간 찾기</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-purple-500" />
                      <span>편안한 자세로 앉거나 눕기</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-purple-500" />
                      <span>호흡에 집중하며 마음 진정시키기</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-purple-500" />
                      <span>매일 같은 시간에 실천하기</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 하단 여백 */}
      <div className="h-20"></div>
    </div>
  )
}
