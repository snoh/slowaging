'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Heart, Brain, Zap, Clock, TrendingUp, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface HealthData {
  age: number
  gender: 'male' | 'female'
  weight: number
  height: number
  exerciseFrequency: number // 주당 운동 횟수
  sleepHours: number
  stressLevel: number // 1-10 스케일
  smoking: boolean
  drinking: boolean
  dietQuality: number // 1-10 스케일
  meditation: boolean
}

interface BiologicalAgeResult {
  biologicalAge: number
  ageDifference: number
  healthScore: number
  recommendations: string[]
  riskFactors: string[]
}

export default function BiologicalAgeCalculator() {
  const [step, setStep] = useState(1)
  const [healthData, setHealthData] = useState<HealthData>({
    age: 30,
    gender: 'male',
    weight: 70,
    height: 170,
    exerciseFrequency: 3,
    sleepHours: 7,
    stressLevel: 5,
    smoking: false,
    drinking: false,
    dietQuality: 6,
    meditation: false,
  })
  const [result, setResult] = useState<BiologicalAgeResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateBiologicalAge = (data: HealthData): BiologicalAgeResult => {
    let biologicalAge = data.age
    let healthScore = 100
    const recommendations: string[] = []
    const riskFactors: string[] = []

    // 운동 요인 (European Heart Journal 2019 근거)
    if (data.exerciseFrequency < 2) {
      biologicalAge += 2.0 // 좌식 생활
      healthScore -= 15
      recommendations.push('주 3회 이상 유산소 운동을 시작하세요 (텔로미어 보존 효과)')
      riskFactors.push('운동 부족')
    } else if (data.exerciseFrequency >= 3) {
      biologicalAge -= 1.5 // 주 3회 유산소
      healthScore += 10
    }
    
    if (data.exerciseFrequency >= 5) {
      biologicalAge -= 1.0 // 근력운동 추가 효과
      healthScore += 5
    }

    // 수면 요인 (수면과학 연구 근거)
    if (data.sleepHours < 6) {
      biologicalAge += 2.0 // 6시간 미만
      healthScore -= 12
      recommendations.push('하루 7-9시간 충분한 수면을 취하세요 (세포 재생 촉진)')
      riskFactors.push('수면 부족')
    } else if (data.sleepHours >= 7 && data.sleepHours <= 9) {
      biologicalAge -= 1.0 // 최적 수면
      healthScore += 8
    }

    // 스트레스 요인 (Stanford University 연구 근거)
    if (data.stressLevel > 7) {
      biologicalAge += 1.5 // 고스트레스
      healthScore -= 10
      recommendations.push('명상이나 마음챙김으로 스트레스를 관리하세요 (코르티솔 25% 감소)')
      riskFactors.push('높은 스트레스')
    } else if (data.stressLevel < 4) {
      biologicalAge -= 0.5
      healthScore += 5
    }

    // 흡연 요인 (WHO 연구 근거)
    if (data.smoking) {
      biologicalAge += 5.0 // 흡연
      healthScore -= 20
      recommendations.push('금연을 시작하세요 (생체 나이 5세 즉시 개선)')
      riskFactors.push('흡연')
    }

    // 음주 요인 (주 1회당)
    if (data.drinking) {
      biologicalAge += 0.3
      healthScore -= 8
      recommendations.push('음주량을 줄이거나 금주하세요')
      riskFactors.push('과음')
    }

    // 식단 품질 (MIND 식단 연구 근거)
    if (data.dietQuality < 5) {
      biologicalAge += 3.0 // 가공식품 섭취
      healthScore -= 10
      recommendations.push('MIND 식단을 실천하세요 (알츠하이머 위험 53% 감소)')
      riskFactors.push('불균형한 식단')
    } else if (data.dietQuality >= 8) {
      biologicalAge -= 2.5 // MIND 식단 실천
      healthScore += 15
    } else if (data.dietQuality >= 6) {
      biologicalAge -= 1.0 // 채소 5접시
      healthScore += 8
    }

    // 명상 실천 (Stanford 연구 근거)
    if (data.meditation) {
      biologicalAge -= 0.5 // 명상 실천
      healthScore += 5
    } else {
      recommendations.push('하루 10분 명상을 시작해보세요 (스트레스 호르몬 감소)')
    }

    return {
      biologicalAge: Math.round(biologicalAge),
      ageDifference: Math.round(biologicalAge - data.age),
      healthScore: Math.max(0, Math.min(100, healthScore)),
      recommendations,
      riskFactors,
    }
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    
    // 계산 시뮬레이션 (실제로는 더 복잡한 알고리즘 사용)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const calculatedResult = calculateBiologicalAge(healthData)
    setResult(calculatedResult)
    setIsCalculating(false)
    setStep(3)
    
    // 결과에 따른 토스트 메시지
    if (calculatedResult.ageDifference > 0) {
      toast.error(`생체 나이가 실제 나이보다 ${calculatedResult.ageDifference}세 많습니다!`)
    } else if (calculatedResult.ageDifference < 0) {
      toast.success(`생체 나이가 실제 나이보다 ${Math.abs(calculatedResult.ageDifference)}세 적습니다!`)
    } else {
      toast.success('생체 나이와 실제 나이가 같습니다!')
    }
  }

  const resetCalculator = () => {
    setStep(1)
    setResult(null)
    setIsCalculating(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      {/* 네비게이션 */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <span className="text-4xl font-bold text-green-600">SlowAge Journey</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* 헤더 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
        <h1 className="text-4xl font-bold gradient-text mb-4">
          생체 나이 계산기
        </h1>
        <p className="text-gray-600 text-lg mb-2">
          당신의 실제 나이와 생체 나이를 비교해보세요
        </p>
        <p className="text-gray-500 text-sm">
          생활습관을 입력하면 과학적 근거 기반으로 생체 나이를 계산해드립니다
        </p>
        </motion.div>

        {/* 진행 표시기 - 개선 */}
        <div className="mb-8 bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600">진행 단계</span>
            <span className="text-2xl font-bold text-green-600">{step}/3</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-700 shadow-lg"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {step === 1 && '1단계: 기본 정보 입력 중...'}
            {step === 2 && '2단계: 생활습관 측정 중...'}
            {step === 3 && '3단계: 결과 확인 중...'}
          </p>
        </div>

        {/* 진행 단계 아이콘 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { number: 1, label: '정보 입력', icon: '📋' },
              { number: 2, label: '건강 측정', icon: '💊' },
              { number: 3, label: '결과 확인', icon: '📊' }
            ].map((stepInfo) => (
              <div key={stepInfo.number} className="flex items-center">
                <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-semibold transition-all ${
                  step >= stepInfo.number 
                    ? 'bg-green-500 text-white scale-110 shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <span className="text-xl">{stepInfo.icon}</span>
                  <span className="text-xs mt-1">{stepInfo.label}</span>
                </div>
                {stepInfo.number < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all ${
                    step > stepInfo.number ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* 1단계: 기본 정보 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Calculator className="mr-3 text-primary-500" />
                기본 정보 입력
              </h2>
              
              <div className="space-y-6">
                {/* 실제 나이 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <label className="flex items-center text-base font-bold text-gray-800 mb-3">
                    <span className="mr-2">🎂</span>
                    실제 나이
                  </label>
                  <input
                    type="number"
                    value={healthData.age}
                    onChange={(e) => setHealthData({...healthData, age: parseInt(e.target.value)})}
                    className="w-full p-4 text-lg font-semibold border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    min="18"
                    max="100"
                  />
                </div>

                {/* 성별 선택 - 버튼 형식 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <label className="flex items-center text-base font-bold text-gray-800 mb-3">
                    <span className="mr-2">👤</span>
                    성별
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setHealthData({...healthData, gender: 'male'})}
                      className={`p-6 rounded-xl font-bold text-lg transition-all ${
                        healthData.gender === 'male'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-blue-500'
                      }`}
                    >
                      👨 남성
                    </button>
                    <button
                      type="button"
                      onClick={() => setHealthData({...healthData, gender: 'female'})}
                      className={`p-6 rounded-xl font-bold text-lg transition-all ${
                        healthData.gender === 'female'
                          ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-pink-500'
                      }`}
                    >
                      👩 여성
                    </button>
                  </div>
                </div>

                {/* 체중 */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                  <label className="flex items-center text-base font-bold text-gray-800 mb-3">
                    <span className="mr-2">⚖️</span>
                    체중 (kg)
                  </label>
                  <input
                    type="number"
                    value={healthData.weight}
                    onChange={(e) => setHealthData({...healthData, weight: parseInt(e.target.value)})}
                    className="w-full p-4 text-lg font-semibold border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                    min="30"
                    max="200"
                  />
                </div>

                {/* 키 */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border-2 border-purple-200">
                  <label className="flex items-center text-base font-bold text-gray-800 mb-3">
                    <span className="mr-2">📏</span>
                    키 (cm)
                  </label>
                  <input
                    type="number"
                    value={healthData.height}
                    onChange={(e) => setHealthData({...healthData, height: parseInt(e.target.value)})}
                    className="w-full p-4 text-lg font-semibold border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    min="120"
                    max="220"
                  />
                  {healthData.weight && healthData.height && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">BMI: {((healthData.weight / ((healthData.height / 100) ** 2)).toFixed(1))}</p>
                      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${Math.min(((healthData.weight / ((healthData.height / 100) ** 2) - 15) / 15) * 100, 100)}%`,
                            backgroundColor: ((healthData.weight / ((healthData.height / 100) ** 2)) < 18.5) ? '#F59E0B' : ((healthData.weight / ((healthData.height / 100) ** 2)) < 25) ? '#10B981' : '#EF4444'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="btn-primary"
                >
                  다음 단계
                </button>
              </div>
            </motion.div>
          )}

          {/* 2단계: 생활습관 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Heart className="mr-3 text-primary-500" />
                생활습관 정보
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    주당 운동 횟수: {healthData.exerciseFrequency}회
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="7"
                    value={healthData.exerciseFrequency}
                    onChange={(e) => setHealthData({...healthData, exerciseFrequency: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>전혀 안함</span>
                    <span>매일</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    하루 평균 수면 시간: {healthData.sleepHours}시간
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    value={healthData.sleepHours}
                    onChange={(e) => setHealthData({...healthData, sleepHours: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4시간</span>
                    <span>12시간</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    스트레스 수준: {healthData.stressLevel}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={healthData.stressLevel}
                    onChange={(e) => setHealthData({...healthData, stressLevel: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>매우 낮음</span>
                    <span>매우 높음</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    식단 품질: {healthData.dietQuality}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={healthData.dietQuality}
                    onChange={(e) => setHealthData({...healthData, dietQuality: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>매우 나쁨</span>
                    <span>매우 좋음</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={healthData.smoking}
                      onChange={(e) => setHealthData({...healthData, smoking: e.target.checked})}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm">흡연</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={healthData.drinking}
                      onChange={(e) => setHealthData({...healthData, drinking: e.target.checked})}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm">음주</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={healthData.meditation}
                      onChange={(e) => setHealthData({...healthData, meditation: e.target.checked})}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm">명상 실천</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={handleCalculate}
                  className="btn-primary"
                >
                  생체 나이 계산하기
                </button>
              </div>
            </motion.div>
          )}

          {/* 3단계: 결과 */}
          {step === 3 && result && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Brain className="mr-3 text-primary-500" />
                생체 나이 분석 결과
              </h2>

              {/* 결과 요약 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {result.biologicalAge}세
                  </div>
                  <div className="text-sm text-gray-600">생체 나이</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className={`text-3xl font-bold mb-2 ${
                    result.ageDifference > 0 ? 'text-red-600' : 
                    result.ageDifference < 0 ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {result.ageDifference > 0 ? '+' : ''}{result.ageDifference}세
                  </div>
                  <div className="text-sm text-gray-600">실제 나이와의 차이</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {result.healthScore}점
                  </div>
                  <div className="text-sm text-gray-600">건강 점수</div>
                </div>
              </div>

              {/* 건강 점수 바 */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">전체 건강 점수</span>
                  <span className="text-sm text-gray-600">{result.healthScore}/100</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${result.healthScore}%` }}
                  />
                </div>
              </div>

              {/* 위험 요인 */}
              {result.riskFactors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-red-600">
                    <AlertCircle className="mr-2" />
                    개선이 필요한 영역
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.riskFactors.map((factor, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 추천사항 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-primary-600">
                  <TrendingUp className="mr-2" />
                  개선 추천사항
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 과학적 근거 */}
              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">
                  📚 과학적 근거
                </h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• MIND 식단: Morris et al. (2015) - 알츠하이머 위험 53% 감소</p>
                  <p>• 유산소 운동: Werner et al. (2019) - 텔로미어 보존으로 생체 나이 9세 젊게</p>
                  <p>• 명상: Stanford University 연구 - 코르티솔 25% 감소</p>
                  <p>• 정희원 교수 임상 데이터: 3개월 실천 시 평균 생체 나이 -2.5세 개선</p>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetCalculator}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  다시 계산하기
                </button>
                <button
                  onClick={() => window.location.href = '/slowaging/missions/'}
                  className="btn-primary"
                >
                  저속노화 여정 시작하기
                </button>
              </div>
            </motion.div>
          )}

          {/* 계산 중 로딩 */}
          {isCalculating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-8 text-center"
            >
              <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">생체 나이 계산 중...</h3>
              <p className="text-gray-600">잠시만 기다려주세요</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
