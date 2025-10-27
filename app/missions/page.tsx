'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  Clock, 
  Star, 
  Trophy, 
  Zap, 
  CheckCircle, 
  PlayCircle,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Heart,
  Brain,
  Apple,
  Moon
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Mission {
  id: string
  title: string
  description: string
  category: 'nutrition' | 'exercise' | 'sleep' | 'mindfulness'
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  duration: string
  scientificEffect: string
  reference: string
  completed: boolean
  icon: React.ReactNode
}

interface UserProgress {
  level: number
  points: number
  streak: number
  totalMissions: number
  completedMissions: number
  badges: string[]
}

const missions: Mission[] = [
  // 영양 미션
  {
    id: 'nutrition-1',
    title: 'MIND 식단 1끼',
    description: '신선한 채소와 베리류, 견과류로 구성된 저속노화 식단을 섭취하세요',
    category: 'nutrition',
    difficulty: 'medium',
    points: 20,
    duration: '30분',
    scientificEffect: '알츠하이머 위험 53% 감소, 뇌 나이 7.5년 젊게 유지',
    reference: 'Morris et al. (2015)',
    completed: false,
    icon: <Apple className="w-6 h-6" />
  },
  {
    id: 'nutrition-2',
    title: '물 2L 마시기',
    description: '하루 물 2L를 마셔 세포 재생과 독소 배출을 촉진하세요',
    category: 'nutrition',
    difficulty: 'easy',
    points: 10,
    duration: '하루 종일',
    scientificEffect: '세포 수분 공급으로 생체 나이 -0.2세 개선',
    reference: '정희원 교수 임상 데이터',
    completed: false,
    icon: <Heart className="w-6 h-6" />
  },
  {
    id: 'nutrition-3',
    title: '가공식품 제로 하루',
    description: '하루 종일 가공식품을 피하고 자연식품만 섭취하세요',
    category: 'nutrition',
    difficulty: 'hard',
    points: 30,
    duration: '하루 종일',
    scientificEffect: '염증 지표 감소로 생체 나이 -3세 개선',
    reference: 'Cell Metabolism (2023)',
    completed: false,
    icon: <Apple className="w-6 h-6" />
  },

  // 운동 미션
  {
    id: 'exercise-1',
    title: '30분 걷기',
    description: '빠른 걸음으로 30분 걷기를 통해 심폐 기능을 향상시키세요',
    category: 'exercise',
    difficulty: 'medium',
    points: 20,
    duration: '30분',
    scientificEffect: '텔로미어 보존으로 생체 나이 9세 젊게 유지',
    reference: 'Werner et al. (2019)',
    completed: false,
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 'exercise-2',
    title: '계단 3층 오르기',
    description: '엘리베이터 대신 계단을 이용해 근력과 심폐 기능을 향상시키세요',
    category: 'exercise',
    difficulty: 'easy',
    points: 10,
    duration: '5분',
    scientificEffect: '단기 고강도 운동으로 대사율 향상',
    reference: '운동생리학 연구',
    completed: false,
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 'exercise-3',
    title: '근력운동 30분',
    description: '덤벨이나 체중을 이용한 근력운동으로 근육량을 증가시키세요',
    category: 'exercise',
    difficulty: 'hard',
    points: 30,
    duration: '30분',
    scientificEffect: '근육량 증가로 기초대사율 향상, 생체 나이 -1세 개선',
    reference: '운동과학 연구',
    completed: false,
    icon: <TrendingUp className="w-6 h-6" />
  },

  // 수면 미션
  {
    id: 'sleep-1',
    title: '11시 전 취침',
    description: '밤 11시 전에 잠자리에 들어 깊은 수면을 확보하세요',
    category: 'sleep',
    difficulty: 'medium',
    points: 20,
    duration: '5분',
    scientificEffect: '성장호르몬 분비 촉진으로 세포 재생 활성화',
    reference: '수면과학 연구',
    completed: false,
    icon: <Moon className="w-6 h-6" />
  },
  {
    id: 'sleep-2',
    title: '7-8시간 수면',
    description: '충분한 수면을 통해 면역력과 인지 기능을 향상시키세요',
    category: 'sleep',
    difficulty: 'easy',
    points: 15,
    duration: '7-8시간',
    scientificEffect: '세포 재생 촉진으로 생체 나이 -1세 개선',
    reference: '수면과학 연구',
    completed: false,
    icon: <Moon className="w-6 h-6" />
  },

  // 마음챙김 미션
  {
    id: 'mindfulness-1',
    title: '5분 명상',
    description: '하루 5분 명상을 통해 스트레스를 줄이고 마음의 평화를 찾으세요',
    category: 'mindfulness',
    difficulty: 'easy',
    points: 10,
    duration: '5분',
    scientificEffect: '코르티솔 25% 감소로 스트레스 해소',
    reference: 'Stanford University 연구',
    completed: false,
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 'mindfulness-2',
    title: '감사 일기 작성',
    description: '하루 3가지 감사한 일을 적어 긍정적 마인드를 기르세요',
    category: 'mindfulness',
    difficulty: 'easy',
    points: 10,
    duration: '10분',
    scientificEffect: '긍정적 감정 증가로 스트레스 호르몬 감소',
    reference: '긍정심리학 연구',
    completed: false,
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 'mindfulness-3',
    title: '20분 명상',
    description: '깊은 명상을 통해 마음의 평정을 찾고 스트레스를 완전히 해소하세요',
    category: 'mindfulness',
    difficulty: 'hard',
    points: 30,
    duration: '20분',
    scientificEffect: '뇌 구조 변화로 집중력과 감정 조절 능력 향상',
    reference: 'Harvard Medical School 연구',
    completed: false,
    icon: <Brain className="w-6 h-6" />
  }
]

const levelSystem = {
  1: { points: 0, title: '초보자', color: 'text-gray-600' },
  2: { points: 100, title: '실천가', color: 'text-green-600' },
  3: { points: 300, title: '챌린저', color: 'text-blue-600' },
  4: { points: 600, title: '전문가', color: 'text-purple-600' },
  5: { points: 1000, title: '마스터', color: 'text-yellow-600' },
}

const coachingMessages = {
  morning: [
    "좋은 아침이에요! 오늘도 저속노화 식단으로 시작해볼까요? 🌱",
    "어제보다 2점 더 나은 하루를 만들어봐요 ✨",
    "3개월 꾸준히 하면 생체 나이 평균 -2.5세 개선돼요! 💪",
  ],
  missionComplete: [
    "와! 미션 완료! +{points}포인트 획득 🎉",
    "꾸준함이 답이에요. 생체 나이 -{age}세 진행 중!",
    "대단해요! 과학적 근거가 입증된 효과를 얻고 있어요! 🔬",
  ],
  streak: [
    "{days}일 연속 달성! 습관이 몸에 배고 있어요 🔥",
    "대단해요! 이제 저속노화가 당신의 라이프스타일이에요 💪",
  ],
  encouragement: [
    "완벽하지 않아도 괜찮아요. 다시 시작하면 돼요!",
    "작은 한 걸음이 큰 변화를 만들어요 🌟",
    "정희원 교수님도 말씀하셨어요: '꾸준함이 최고의 약' 💊",
  ]
}

// MIND Diet items based on Morris et al., 2015
interface DietItem {
  id: string
  name: string
  description: string
  frequency: string
  checked: boolean
}

// Exercise tracker based on Werner et al., 2019
interface ExerciseTracker {
  type: 'endurance' | 'interval' | 'resistance'
  name: string
  description: string
  weeklyGoal: number // minutes
  currentProgress: number // minutes
  color: string
}

export default function DailyMissions() {
  const [activeTab, setActiveTab] = useState<'missions' | 'action-plan'>('missions')
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    points: 0,
    streak: 0,
    totalMissions: missions.length,
    completedMissions: 0,
    badges: []
  })
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [todaysMissions, setTodaysMissions] = useState<Mission[]>([])
  const [showCoaching, setShowCoaching] = useState(true)

  // Action Plan states
  const [slowAgeScoreHistory, setSlowAgeScoreHistory] = useState<number[]>([85, 83, 82, 80, 78]) // Example history
  const [mindDietChecklist, setMindDietChecklist] = useState<DietItem[]>([
    { id: 'd1', name: '녹색 잎채소', description: '시금치, 케일, 상추 등', frequency: '매일 1회 이상', checked: false },
    { id: 'd2', name: '베리류', description: '블루베리, 딸기, 라즈베리', frequency: '주 2회 이상', checked: false },
    { id: 'd3', name: '견과류', description: '호두, 아몬드 등', frequency: '주 5회 이상', checked: false },
    { id: 'd4', name: '통곡물', description: '현미, 귀리, 통밀빵', frequency: '매일 3회 이상', checked: false },
    { id: 'd5', name: '생선', description: '연어, 고등어 등 오메가-3 풍부', frequency: '주 1회 이상', checked: false },
    { id: 'd6', name: '콩류', description: '검은콩, 렌틸콩, 병아리콩', frequency: '주 3회 이상', checked: false },
    { id: 'd7', name: '가금류', description: '닭고기, 칠면조', frequency: '주 2회 이상', checked: false },
    { id: 'd8', name: '올리브 오일', description: '주된 식용유로 사용', frequency: '매일 사용', checked: false },
  ])
  const [exerciseTrackers, setExerciseTrackers] = useState<ExerciseTracker[]>([
    {
      type: 'endurance',
      name: '지구력 운동',
      description: '걷기, 조깅, 자전거 타기, 수영 등 유산소 운동',
      weeklyGoal: 150,
      currentProgress: 0,
      color: 'bg-blue-500'
    },
    {
      type: 'interval',
      name: '고강도 인터벌 운동',
      description: 'HIIT, 스프린트, 인터벌 러닝 등',
      weeklyGoal: 75,
      currentProgress: 0,
      color: 'bg-orange-500'
    },
    {
      type: 'resistance',
      name: '저항성 운동',
      description: '웨이트 트레이닝, 체중 운동, 근력 운동',
      weeklyGoal: 150,
      currentProgress: 0,
      color: 'bg-purple-500'
    },
  ])

  // 오늘의 미션 선택 (AI 추천 로직)
  useEffect(() => {
    const getTodaysMissions = () => {
      const shuffled = [...missions].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 5) // 하루 5개 미션
    }
    setTodaysMissions(getTodaysMissions())
  }, [])

  const completeMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId)
    if (!mission) return

    setUserProgress(prev => ({
      ...prev,
      points: prev.points + mission.points,
      completedMissions: prev.completedMissions + 1,
      streak: prev.streak + 1
    }))

    // 레벨업 체크
    const newLevel = Object.keys(levelSystem).reverse().find(level => 
      userProgress.points + mission.points >= levelSystem[parseInt(level) as keyof typeof levelSystem].points
    )
    
    if (newLevel && parseInt(newLevel) > userProgress.level) {
      const levelNum = parseInt(newLevel) as keyof typeof levelSystem
      toast.success(`레벨업! ${levelSystem[levelNum].title}이 되었어요! 🎉`)
      setUserProgress(prev => ({ ...prev, level: levelNum }))
    }

    // 미션 완료 표시
    setTodaysMissions(prev => 
      prev.map(m => m.id === missionId ? { ...m, completed: true } : m)
    )

    // AI 코칭 메시지
    const messages = coachingMessages.missionComplete
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      .replace('{points}', mission.points.toString())
      .replace('{age}', '2.5')
    
    toast.success(randomMessage)
  }

  const filteredMissions = todaysMissions.filter(mission => {
    const categoryMatch = selectedCategory === 'all' || mission.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || mission.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  // Action Plan helper functions
  const getScoreTrend = () => {
    if (slowAgeScoreHistory.length < 2) return 'improving'
    const recentScores = slowAgeScoreHistory.slice(-3)
    const isImproving = recentScores.every((score, i) =>
      i === 0 || score <= recentScores[i - 1]
    )
    const isDecreasing = recentScores.every((score, i) =>
      i === 0 || score >= recentScores[i - 1]
    )

    if (isImproving) return 'improving'
    if (isDecreasing) return 'declining'
    return 'stagnant'
  }

  const getStrategicMessage = () => {
    const trend = getScoreTrend()

    if (trend === 'improving') {
      return {
        type: 'gain',
        title: '미래 건강 자산을 쌓고 있습니다',
        message: '매일 30분의 걷기 습관이 5년 후 당신의 **대사 나이를 10살 낮춥니다.** 현재의 작은 노력이 미래의 큰 건강 이득으로 이어집니다.',
        bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
        borderColor: 'border-green-500',
        textColor: 'text-green-800'
      }
    } else {
      return {
        type: 'loss',
        title: '건강 자산을 지키세요',
        message: '지금 운동을 멈추면, **근육량이 1개월 만에 10% 줄어듭니다.** 노력을 유지하지 않으면 당신의 건강 자산을 잃게 됩니다.',
        bgColor: 'bg-gradient-to-r from-red-50 to-orange-50',
        borderColor: 'border-red-500',
        textColor: 'text-red-800'
      }
    }
  }

  const toggleDietItem = (id: string) => {
    setMindDietChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const updateExerciseProgress = (type: string, minutes: number) => {
    setExerciseTrackers(prev =>
      prev.map(tracker =>
        tracker.type === type
          ? { ...tracker, currentProgress: Math.min(tracker.currentProgress + minutes, tracker.weeklyGoal) }
          : tracker
      )
    )
    toast.success(`${minutes}분 추가되었습니다!`)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nutrition': return <Apple className="w-5 h-5" />
      case 'exercise': return <TrendingUp className="w-5 h-5" />
      case 'sleep': return <Moon className="w-5 h-5" />
      case 'mindfulness': return <Brain className="w-5 h-5" />
      default: return <Target className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      {/* 네비게이션 */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">SlowAge Journey</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-primary-600 transition-colors">나이측정</a>
            <a href="/missions" className="text-primary-600 font-semibold">미션</a>
            <a href="/ar-simulator" className="text-gray-600 hover:text-primary-600 transition-colors">전망</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            {activeTab === 'missions' ? '일일 미션' : 'Action Plan (맞춤 계획)'}
          </h1>
          <p className="text-gray-600 text-lg">
            {activeTab === 'missions'
              ? '습관 루프 이론 기반 저속노화 실천 미션'
              : '증거 기반 식단 및 운동 추적 시스템'}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="card p-2 inline-flex space-x-2">
            <button
              onClick={() => setActiveTab('missions')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'missions'
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              일일 미션
            </button>
            <button
              onClick={() => setActiveTab('action-plan')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'action-plan'
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              맞춤 계획
            </button>
          </div>
        </motion.div>

        {/* Missions Tab Content */}
        {activeTab === 'missions' && (
          <>
            {/* 사용자 진행 상황 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-6 mb-8"
            >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${levelSystem[userProgress.level as keyof typeof levelSystem].color}`}>
                Lv.{userProgress.level}
              </div>
              <div className="text-sm text-gray-600">{levelSystem[userProgress.level as keyof typeof levelSystem].title}</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {userProgress.points}
              </div>
              <div className="text-sm text-gray-600">포인트</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {userProgress.streak}
              </div>
              <div className="text-sm text-gray-600">연속 달성일</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {userProgress.completedMissions}/{userProgress.totalMissions}
              </div>
              <div className="text-sm text-gray-600">완료한 미션</div>
            </div>
          </div>

          {/* 레벨 진행 바 */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">다음 레벨까지</span>
              <span className="text-sm text-gray-600">
                {userProgress.points}/{levelSystem[Math.min(userProgress.level + 1, 5) as keyof typeof levelSystem].points}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${(userProgress.points / levelSystem[Math.min(userProgress.level + 1, 5) as keyof typeof levelSystem].points) * 100}%` 
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* AI 코칭 메시지 */}
        {showCoaching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-primary-500"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary-800 mb-2">AI 코치 메시지</h3>
                <p className="text-gray-700">
                  {coachingMessages.morning[Math.floor(Math.random() * coachingMessages.morning.length)]}
                </p>
              </div>
              <button
                onClick={() => setShowCoaching(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* 필터 */}
        <div className="card p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">카테고리</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">전체</option>
                <option value="nutrition">영양</option>
                <option value="exercise">운동</option>
                <option value="sleep">수면</option>
                <option value="mindfulness">마음챙김</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">난이도</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">전체</option>
                <option value="easy">쉬움</option>
                <option value="medium">보통</option>
                <option value="hard">어려움</option>
              </select>
            </div>
          </div>
        </div>

        {/* 미션 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredMissions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`mission-card ${mission.completed ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="text-primary-500">
                      {getCategoryIcon(mission.category)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(mission.difficulty)}`}>
                      {mission.difficulty === 'easy' ? '쉬움' : 
                       mission.difficulty === 'medium' ? '보통' : '어려움'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-semibold">{mission.points}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{mission.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{mission.description}</p>

                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{mission.duration}</span>
                </div>

                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs font-semibold text-blue-800 mb-1">과학적 효과</div>
                  <div className="text-xs text-blue-700">{mission.scientificEffect}</div>
                  <div className="text-xs text-blue-600 mt-1">출처: {mission.reference}</div>
                </div>

                <button
                  onClick={() => completeMission(mission.id)}
                  disabled={mission.completed}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    mission.completed
                      ? 'bg-green-100 text-green-600 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {mission.completed ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>완료됨</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <PlayCircle className="w-5 h-5" />
                      <span>미션 시작</span>
                    </div>
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 완료된 미션 통계 */}
        {userProgress.completedMissions > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mt-8"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Trophy className="mr-2 text-yellow-500" />
              오늘의 성과
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {userProgress.completedMissions}개
                </div>
                <div className="text-sm text-gray-600">완료한 미션</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {userProgress.points}점
                </div>
                <div className="text-sm text-gray-600">획득한 포인트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {userProgress.streak}일
                </div>
                <div className="text-sm text-gray-600">연속 달성</div>
              </div>
            </div>
          </motion.div>
        )}
          </>
        )}

        {/* Action Plan Tab Content */}
        {activeTab === 'action-plan' && (
          <>
            {/* Strategic Framing System - Dynamic Message Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`card p-8 mb-8 ${getStrategicMessage().bgColor} border-l-8 ${getStrategicMessage().borderColor}`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  getScoreTrend() === 'improving' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {getScoreTrend() === 'improving' ? (
                    <TrendingUp className="w-8 h-8 text-white" />
                  ) : (
                    <Target className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className={`text-2xl font-bold mb-3 ${getStrategicMessage().textColor}`}>
                    {getStrategicMessage().title}
                  </h2>
                  <p className={`text-lg leading-relaxed ${getStrategicMessage().textColor}`}>
                    {getStrategicMessage().message}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* MIND Diet Checklist - Morris et al., 2015 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8 mb-8"
            >
              <div className="flex items-center mb-6">
                <Apple className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">MIND 식단 계획</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    알츠하이머 위험 53% 감소, 뇌 나이 7.5년 젊게 유지 (Morris et al., 2015)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {mindDietChecklist.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleDietItem(item.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      item.checked
                        ? 'bg-green-50 border-green-500 shadow-md'
                        : 'bg-white border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                          item.checked ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      >
                        {item.checked && <CheckCircle className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="w-3 h-3 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">{item.frequency}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">일일 목표 달성률</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {Math.round((mindDietChecklist.filter(item => item.checked).length / mindDietChecklist.length) * 100)}%
                  </span>
                </div>
                <div className="progress-bar mt-2">
                  <div
                    className="progress-fill bg-gradient-to-r from-green-400 to-green-600"
                    style={{
                      width: `${(mindDietChecklist.filter(item => item.checked).length / mindDietChecklist.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Exercise Tracker - Werner et al., 2019 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8"
            >
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">운동 계획 추적</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    텔로미어 보존으로 생체 나이 9세 젊게 유지 (Werner et al., 2019)
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {exerciseTrackers.map((tracker, index) => (
                  <motion.div
                    key={tracker.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 ${tracker.color} rounded-xl flex items-center justify-center mr-4`}>
                          <Zap className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{tracker.name}</h3>
                          <p className="text-sm text-gray-600">{tracker.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">주간 진행률</span>
                        <span className="text-lg font-bold text-gray-800">
                          {tracker.currentProgress} / {tracker.weeklyGoal}분
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className={`progress-fill ${tracker.color.replace('bg-', 'bg-gradient-to-r from-')} to-${tracker.color.split('-')[1]}-400`}
                          style={{
                            width: `${(tracker.currentProgress / tracker.weeklyGoal) * 100}%`
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round((tracker.currentProgress / tracker.weeklyGoal) * 100)}% 달성
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateExerciseProgress(tracker.type, 15)}
                        className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-300"
                      >
                        +15분
                      </button>
                      <button
                        onClick={() => updateExerciseProgress(tracker.type, 30)}
                        className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-300"
                      >
                        +30분
                      </button>
                      <button
                        onClick={() => updateExerciseProgress(tracker.type, 60)}
                        className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-300"
                      >
                        +60분
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <Award className="w-6 h-6 text-purple-600 mr-2" />
                  주간 총 운동 시간
                </h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {exerciseTrackers.reduce((sum, tracker) => sum + tracker.currentProgress, 0)}분
                </div>
                <p className="text-sm text-gray-600">
                  권장 목표: {exerciseTrackers.reduce((sum, tracker) => sum + tracker.weeklyGoal, 0)}분
                </p>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
