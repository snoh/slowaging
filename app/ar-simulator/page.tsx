'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Heart,
  Brain,
  Zap,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Target
} from 'lucide-react'
import toast from 'react-hot-toast'

interface AgeSimulation {
  currentAge: number
  biologicalAge: number
  futureAge5Years: number
  futureAge10Years: number
  slowAgingFuture5Years: number
  slowAgingFuture10Years: number
}

interface HealthFactor {
  name: string
  impact: number
  description: string
  icon: React.ReactNode
  color: string
}

const healthFactors: HealthFactor[] = [
  {
    name: '운동',
    impact: -1.5,
    description: '주 3회 유산소 운동으로 텔로미어 보존',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-green-600'
  },
  {
    name: '식단',
    impact: -2.5,
    description: 'MIND 식단으로 뇌 나이 7.5년 젊게',
    icon: <Heart className="w-6 h-6" />,
    color: 'text-blue-600'
  },
  {
    name: '수면',
    impact: -1.0,
    description: '7-9시간 수면으로 세포 재생 촉진',
    icon: <Clock className="w-6 h-6" />,
    color: 'text-purple-600'
  },
  {
    name: '명상',
    impact: -0.5,
    description: '스트레스 호르몬 25% 감소',
    icon: <Brain className="w-6 h-6" />,
    color: 'text-orange-600'
  }
]

export default function ARSimulator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationData, setSimulationData] = useState<AgeSimulation | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState<'5years' | '10years'>('5years')

  // 시뮬레이션 데이터 생성
  const generateSimulation = (biologicalAge: number) => {
    const currentAge = 30 // 예시 나이
    const futureAge5Years = biologicalAge + 5
    const futureAge10Years = biologicalAge + 10
    
    // 저속노화 실천 시 개선 효과 계산
    const improvement5Years = healthFactors.reduce((sum, factor) => sum + factor.impact, 0) * 0.5
    const improvement10Years = healthFactors.reduce((sum, factor) => sum + factor.impact, 0)
    
    const slowAgingFuture5Years = Math.max(currentAge + 5, biologicalAge + 5 + improvement5Years)
    const slowAgingFuture10Years = Math.max(currentAge + 10, biologicalAge + 10 + improvement10Years)

    return {
      currentAge,
      biologicalAge,
      futureAge5Years,
      futureAge10Years,
      slowAgingFuture5Years,
      slowAgingFuture10Years
    }
  }

  const startSimulation = async () => {
    setIsSimulating(true)
    
    // 시뮬레이션 애니메이션
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const data = generateSimulation(35) // 예시 생체 나이
    setSimulationData(data)
    setIsSimulating(false)
    setCurrentStep(1)
    
    toast.success('미래 시뮬레이션이 완료되었습니다!')
  }

  const resetSimulation = () => {
    setCurrentStep(0)
    setSimulationData(null)
    setShowComparison(false)
    setIsSimulating(false)
  }

  const steps = [
    {
      title: '현재 상태 분석',
      description: '당신의 현재 생체 나이와 생활습관을 분석합니다.',
      icon: <Camera className="w-8 h-8" />
    },
    {
      title: '미래 예측',
      description: '현재 습관을 유지했을 때의 미래 모습을 시뮬레이션합니다.',
      icon: <AlertTriangle className="w-8 h-8" />
    },
    {
      title: '저속노화 효과',
      description: '저속노화를 실천했을 때의 긍정적 변화를 보여줍니다.',
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      title: '비교 분석',
      description: '두 시나리오를 비교하여 차이점을 명확히 보여줍니다.',
      icon: <TrendingUp className="w-8 h-8" />
    }
  ]

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
            <a href="/missions" className="text-gray-600 hover:text-primary-600 transition-colors">미션</a>
            <a href="/ar-simulator" className="text-primary-600 font-semibold">전망</a>
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
            AR 미래 시뮬레이터
          </h1>
          <p className="text-gray-600 text-lg">
            손실 회피 이론 기반 미래 모습 비교 시뮬레이션
          </p>
        </motion.div>

        {/* 진행 단계 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep >= index 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > index ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    currentStep > index ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* 시작 화면 */}
          {currentStep === 0 && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card p-12 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                미래 시뮬레이션 시작
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                현재 생활습관을 유지했을 때와 저속노화를 실천했을 때의<br />
                미래 모습을 비교해보세요. 시각적 충격이 변화의 동기가 됩니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-red-50 rounded-xl border-l-4 border-red-500">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">현재 습관 유지 시</h3>
                  <p className="text-red-700 text-sm">
                    생체 나이가 계속 증가하여 건강 상태가 악화됩니다.
                  </p>
                </div>
                <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">저속노화 실천 시</h3>
                  <p className="text-green-700 text-sm">
                    과학적 근거 기반 습관으로 생체 나이를 젊게 유지합니다.
                  </p>
                </div>
              </div>

              <button
                onClick={startSimulation}
                disabled={isSimulating}
                className="btn-primary text-lg px-8 py-4"
              >
                {isSimulating ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>시뮬레이션 중...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>시뮬레이션 시작</span>
                  </div>
                )}
              </button>
            </motion.div>
          )}

          {/* 시뮬레이션 결과 */}
          {currentStep > 0 && simulationData && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* 현재 상태 */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Camera className="mr-3 text-primary-500" />
                  현재 상태 분석
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {simulationData.currentAge}세
                    </div>
                    <div className="text-sm text-gray-600">실제 나이</div>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-xl">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {simulationData.biologicalAge}세
                    </div>
                    <div className="text-sm text-gray-600">생체 나이</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-xl">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      +{simulationData.biologicalAge - simulationData.currentAge}세
                    </div>
                    <div className="text-sm text-gray-600">나이 차이</div>
                  </div>
                </div>
              </div>

              {/* 시간대 선택 */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">시간대 선택</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedTimeframe('5years')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      selectedTimeframe === '5years'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    5년 후
                  </button>
                  <button
                    onClick={() => setSelectedTimeframe('10years')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      selectedTimeframe === '10years'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    10년 후
                  </button>
                </div>
              </div>

              {/* 미래 비교 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 현재 습관 유지 시 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="card p-8 bg-red-50 border-l-4 border-red-500"
                >
                  <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center">
                    <AlertTriangle className="mr-2" />
                    현재 습관 유지 시
                  </h3>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-red-600 mb-2">
                      {selectedTimeframe === '5years' 
                        ? simulationData.futureAge5Years 
                        : simulationData.futureAge10Years}세
                    </div>
                    <div className="text-sm text-red-700">
                      {selectedTimeframe === '5years' ? '5년 후' : '10년 후'} 예상 생체 나이
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                      <span className="text-red-800 font-semibold">건강 상태</span>
                      <span className="text-red-600">악화</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                      <span className="text-red-800 font-semibold">에너지 레벨</span>
                      <span className="text-red-600">감소</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                      <span className="text-red-800 font-semibold">질병 위험</span>
                      <span className="text-red-600">증가</span>
                    </div>
                  </div>
                </motion.div>

                {/* 저속노화 실천 시 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="card p-8 bg-green-50 border-l-4 border-green-500"
                >
                  <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center">
                    <CheckCircle className="mr-2" />
                    저속노화 실천 시
                  </h3>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {selectedTimeframe === '5years' 
                        ? Math.round(simulationData.slowAgingFuture5Years)
                        : Math.round(simulationData.slowAgingFuture10Years)}세
                    </div>
                    <div className="text-sm text-green-700">
                      {selectedTimeframe === '5years' ? '5년 후' : '10년 후'} 예상 생체 나이
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                      <span className="text-green-800 font-semibold">건강 상태</span>
                      <span className="text-green-600">향상</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                      <span className="text-green-800 font-semibold">에너지 레벨</span>
                      <span className="text-green-600">증가</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                      <span className="text-green-800 font-semibold">질병 위험</span>
                      <span className="text-green-600">감소</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* 개선 효과 요인 */}
              <div className="card p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <TrendingUp className="mr-2 text-primary-500" />
                  저속노화 개선 효과 요인
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {healthFactors.map((factor, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className={`${factor.color} mb-2`}>
                        {factor.icon}
                      </div>
                      <h4 className="font-semibold mb-1">{factor.name}</h4>
                      <p className="text-sm text-gray-600">{factor.description}</p>
                      <div className={`text-sm font-semibold ${factor.color} mt-2`}>
                        생체 나이 {factor.impact}세 개선
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetSimulation}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>다시 시뮬레이션</span>
                </button>
                <button
                  onClick={() => {/* 미션 페이지로 이동 */}}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Target className="w-5 h-5" />
                  <span>저속노화 시작하기</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 과학적 근거 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-8 mt-8"
        >
          <h3 className="text-xl font-bold mb-4 text-center gradient-text">
            📚 과학적 근거
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>MIND 식단:</strong> Morris et al. (2015) - 알츠하이머 위험 53% 감소
              </p>
              <p className="text-gray-700">
                <strong>유산소 운동:</strong> Werner et al. (2019) - 텔로미어 보존으로 생체 나이 9세 젊게
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>명상:</strong> Stanford University 연구 - 코르티솔 25% 감소
              </p>
              <p className="text-gray-700">
                <strong>임상 데이터:</strong> 정희원 교수 - 3개월 실천 시 평균 생체 나이 -2.5세 개선
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
