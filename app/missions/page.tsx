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
  Moon,
  Activity,
  Sparkles,
  Plus,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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

interface DailyLog {
  date: string
  sunExposure: number // 햇볕 쬐기 (분)
  exercise: number // 운동 시간 (분)
  waterIntake: number // 물 섭취량 (L)
  sleepQuality: number // 수면 질 (1-10)
  stressLevel: number // 스트레스 (1-10)
  skinCare: boolean // 피부 관리 여부
}

interface QuickWin {
  id: string
  title: string
  category: 'vitality' | 'sleep' | 'skin'
  currentScore: number
  previousScore: number
  percentChange: number
  feedback: string
  weeklyData: { day: string; score: number }[]
  icon: React.ReactNode
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

export default function DailyMissions() {
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

  // 새로운 상태들
  const [slowAgeScore, setSlowAgeScore] = useState(78) // 예시: 78점/100점
  const [biologicalAge, setBiologicalAge] = useState<number | null>(null)
  const [actualAge, setActualAge] = useState(40) // 실제 나이
  const [showDailyLogModal, setShowDailyLogModal] = useState(false)
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([])
  const [currentLog, setCurrentLog] = useState<DailyLog>({
    date: new Date().toISOString().split('T')[0],
    sunExposure: 20,
    exercise: 30,
    waterIntake: 2,
    sleepQuality: 7,
    stressLevel: 5,
    skinCare: true
  })
  const [quickWins, setQuickWins] = useState<QuickWin[]>([
    {
      id: 'vitality',
      title: '오늘 활력 점수',
      category: 'vitality',
      currentScore: 8.5,
      previousScore: 7.4,
      percentChange: 15,
      feedback: '어제보다 15% 증가! 20분간의 햇볕 쬐기가 즉각적인 활력을 주었습니다.',
      weeklyData: [
        { day: '월', score: 6.8 },
        { day: '화', score: 7.2 },
        { day: '수', score: 7.0 },
        { day: '목', score: 7.4 },
        { day: '금', score: 7.8 },
        { day: '토', score: 8.0 },
        { day: '일', score: 8.5 }
      ],
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'sleep',
      title: '수면 질 점수',
      category: 'sleep',
      currentScore: 7.8,
      previousScore: 7.0,
      percentChange: 11,
      feedback: '수면 질이 11% 개선! 11시 전 취침이 깊은 수면을 가져왔습니다.',
      weeklyData: [
        { day: '월', score: 6.5 },
        { day: '화', score: 6.8 },
        { day: '수', score: 7.0 },
        { day: '목', score: 7.2 },
        { day: '금', score: 7.0 },
        { day: '토', score: 7.5 },
        { day: '일', score: 7.8 }
      ],
      icon: <Moon className="w-6 h-6" />
    },
    {
      id: 'skin',
      title: '피부 개선 점수',
      category: 'skin',
      currentScore: 8.2,
      previousScore: 7.8,
      percentChange: 5,
      feedback: '피부 상태가 5% 개선! 충분한 수분 섭취와 항산화 식단이 효과를 보이고 있습니다.',
      weeklyData: [
        { day: '월', score: 7.5 },
        { day: '화', score: 7.6 },
        { day: '수', score: 7.8 },
        { day: '목', score: 7.8 },
        { day: '금', score: 8.0 },
        { day: '토', score: 8.1 },
        { day: '일', score: 8.2 }
      ],
      icon: <Sparkles className="w-6 h-6" />
    }
  ])

  // localStorage에서 생체 나이 데이터 불러오기
  useEffect(() => {
    const savedResult = localStorage.getItem('biologicalAgeResult')
    if (savedResult) {
      const result = JSON.parse(savedResult)
      setBiologicalAge(result.biologicalAge)
      setSlowAgeScore(result.healthScore)
      // actualAge는 biologicalAge + ageDifference로 계산
      setActualAge(result.biologicalAge - result.ageDifference)
    }
  }, [])

  // 대사 나이 계산 (Score에 따라)
  const calculateMetabolicAge = () => {
    if (biologicalAge !== null) {
      return biologicalAge
    }
    // Score 기반 계산: 78점 -> 실제 나이 40세보다 5살 어림
    const ageDifference = Math.round((100 - slowAgeScore) / 4) // 100점 = 0살 차이, 0점 = 25살 차이
    return Math.max(actualAge - ageDifference, 20) // 최소 20세
  }

  // 오늘의 미션 선택 (AI 추천 로직)
  useEffect(() => {
    const getTodaysMissions = () => {
      const shuffled = [...missions].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 5) // 하루 5개 미션
    }
    setTodaysMissions(getTodaysMissions())
  }, [])

  // 일일 기록 제출 핸들러
  const handleDailyLogSubmit = () => {
    // 로그 저장
    setDailyLogs(prev => [...prev, currentLog])

    // Quick Wins 점수 업데이트
    setQuickWins(prev => prev.map(qw => {
      let newScore = qw.currentScore
      let newWeeklyData = [...qw.weeklyData]

      if (qw.category === 'vitality') {
        // 활력 점수 계산: 햇볕 + 운동
        const vitalityScore = (currentLog.sunExposure / 30) * 5 + (currentLog.exercise / 60) * 5
        newScore = Math.min(10, vitalityScore)
        newWeeklyData = [...newWeeklyData.slice(1), { day: '오늘', score: newScore }]
      } else if (qw.category === 'sleep') {
        // 수면 질 점수
        newScore = currentLog.sleepQuality
        newWeeklyData = [...newWeeklyData.slice(1), { day: '오늘', score: newScore }]
      } else if (qw.category === 'skin') {
        // 피부 개선 점수: 수분 섭취 + 스킨케어
        const skinScore = (currentLog.waterIntake / 2) * 4 + (currentLog.skinCare ? 4 : 0) + (10 - currentLog.stressLevel) * 0.2
        newScore = Math.min(10, skinScore)
        newWeeklyData = [...newWeeklyData.slice(1), { day: '오늘', score: newScore }]
      }

      const percentChange = Math.round(((newScore - qw.previousScore) / qw.previousScore) * 100)

      return {
        ...qw,
        previousScore: qw.currentScore,
        currentScore: newScore,
        percentChange,
        weeklyData: newWeeklyData,
        feedback: generateFeedback(qw.category, percentChange, currentLog)
      }
    }))

    setShowDailyLogModal(false)
    toast.success('일일 기록이 저장되었습니다! 핵심 성과가 업데이트되었어요.')
  }

  // 피드백 메시지 생성
  const generateFeedback = (category: string, percentChange: number, log: DailyLog) => {
    if (category === 'vitality') {
      if (percentChange > 10) {
        return `어제보다 ${percentChange}% 증가! ${log.sunExposure}분간의 햇볕 쬐기가 즉각적인 활력을 주었습니다.`
      } else if (percentChange > 0) {
        return `활력이 ${percentChange}% 증가했어요. 꾸준한 운동이 효과를 보이고 있습니다!`
      } else {
        return '오늘은 조금 더 활동적인 하루를 보내보세요. 20분 걷기부터 시작해보는 건 어떨까요?'
      }
    } else if (category === 'sleep') {
      if (log.sleepQuality >= 8) {
        return `수면 질이 ${percentChange}% 개선! 11시 전 취침이 깊은 수면을 가져왔습니다.`
      } else if (log.sleepQuality >= 6) {
        return '수면 질이 적정 수준이에요. 취침 시간을 조금 더 앞당겨보세요.'
      } else {
        return '수면 질이 낮아요. 취침 1시간 전 스마트폰을 멀리하고 명상을 시도해보세요.'
      }
    } else if (category === 'skin') {
      if (log.waterIntake >= 2 && log.skinCare) {
        return `피부 상태가 ${percentChange}% 개선! 충분한 수분 섭취와 스킨케어가 효과를 보이고 있습니다.`
      } else if (log.waterIntake < 2) {
        return '피부 건강을 위해 물을 더 마셔보세요. 하루 2L가 목표입니다.'
      } else {
        return '꾸준한 스킨케어가 피부 나이를 젊게 유지합니다.'
      }
    }
    return '좋은 습관을 유지하고 있어요!'
  }

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
            일일 미션
          </h1>
          <p className="text-gray-600 text-lg">
            습관 루프 이론 기반 저속노화 실천 미션
          </p>
        </motion.div>

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

        {/* 대사 나이 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 mb-8 bg-gradient-to-br from-green-50 to-emerald-50"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">대사 나이</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-48 h-48">
              <CircularProgressbar
                value={slowAgeScore}
                text={`${calculateMetabolicAge()}세`}
                styles={buildStyles({
                  textSize: '20px',
                  pathColor: slowAgeScore >= 70 ? '#10B981' : slowAgeScore >= 50 ? '#F59E0B' : '#EF4444',
                  textColor: '#1F2937',
                  trailColor: '#E5E7EB',
                  pathTransitionDuration: 1
                })}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-green-600 mb-2">
                현재 대사 나이: {calculateMetabolicAge()}세
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                실제 나이 {actualAge}세보다 <span className="font-bold text-green-600">{actualAge - calculateMetabolicAge()}살 어립니다!</span>
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="text-sm text-gray-600">건강 점수:</div>
                <div className="text-2xl font-bold text-green-600">{slowAgeScore}점/100점</div>
              </div>
              <p className="text-sm text-gray-600">
                꾸준한 실천으로 대사 나이를 더욱 젊게 유지하세요!
              </p>
            </div>
          </div>
        </motion.div>

        {/* 핵심 성과 (Quick Wins) 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">핵심 성과 (Quick Wins)</h2>
            <button
              onClick={() => setShowDailyLogModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              일일 기록 입력
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickWins.map((qw, index) => (
              <motion.div
                key={qw.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 bg-gradient-to-br from-white to-blue-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      {qw.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{qw.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-end gap-2 mb-2">
                    <div className="text-4xl font-bold text-blue-600">
                      {qw.currentScore.toFixed(1)}
                    </div>
                    <div className="text-xl text-gray-500 mb-1">/10</div>
                    <div className={`ml-auto text-sm font-semibold px-2 py-1 rounded-full ${
                      qw.percentChange > 0 ? 'bg-green-100 text-green-700' :
                      qw.percentChange < 0 ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {qw.percentChange > 0 ? '+' : ''}{qw.percentChange}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{qw.feedback}</p>
                </div>

                {/* 미니 라인 차트 */}
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={qw.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 12 }}
                        stroke="#9CA3AF"
                      />
                      <YAxis
                        domain={[0, 10]}
                        tick={{ fontSize: 12 }}
                        stroke="#9CA3AF"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ fill: '#3B82F6', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            ))}
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
      </div>

      {/* 일일 기록 입력 모달 */}
      <AnimatePresence>
        {showDailyLogModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDailyLogModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">일일 기록 입력</h2>
                <button
                  onClick={() => setShowDailyLogModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* 햇볕 쬐기 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    햇볕 쬐기 (분): {currentLog.sunExposure}분
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={currentLog.sunExposure}
                    onChange={(e) => setCurrentLog({ ...currentLog, sunExposure: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0분</span>
                    <span>60분</span>
                  </div>
                </div>

                {/* 운동 시간 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    운동 시간 (분): {currentLog.exercise}분
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="120"
                    value={currentLog.exercise}
                    onChange={(e) => setCurrentLog({ ...currentLog, exercise: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0분</span>
                    <span>120분</span>
                  </div>
                </div>

                {/* 물 섭취량 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    물 섭취량 (L): {currentLog.waterIntake}L
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="0.1"
                    value={currentLog.waterIntake}
                    onChange={(e) => setCurrentLog({ ...currentLog, waterIntake: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0L</span>
                    <span>4L</span>
                  </div>
                </div>

                {/* 수면 질 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    수면 질: {currentLog.sleepQuality}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentLog.sleepQuality}
                    onChange={(e) => setCurrentLog({ ...currentLog, sleepQuality: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>매우 나쁨</span>
                    <span>매우 좋음</span>
                  </div>
                </div>

                {/* 스트레스 수준 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    스트레스 수준: {currentLog.stressLevel}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentLog.stressLevel}
                    onChange={(e) => setCurrentLog({ ...currentLog, stressLevel: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>매우 낮음</span>
                    <span>매우 높음</span>
                  </div>
                </div>

                {/* 피부 관리 */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentLog.skinCare}
                      onChange={(e) => setCurrentLog({ ...currentLog, skinCare: e.target.checked })}
                      className="w-5 h-5 text-primary-600 rounded"
                    />
                    <span className="text-sm font-semibold text-gray-700">오늘 피부 관리를 했나요?</span>
                  </label>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowDailyLogModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  취소
                </button>
                <button
                  onClick={handleDailyLogSubmit}
                  className="flex-1 btn-primary"
                >
                  저장하기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
