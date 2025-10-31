'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface HealthData {
  // 기본 정보
  age: number
  gender: 'male' | 'female'
  weight: number
  height: number
  // 생활습관
  sleep: string
  exercise: string
  meal: string
  stress: number
  alcohol: string
  smoking: string
}

export default function BiologicalAgeCalculator() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [healthData, setHealthData] = useState<HealthData>({
    // 기본 정보
    age: 30,
    gender: 'male',
    weight: 70,
    height: 170,
    // 생활습관 (기본값)
    sleep: '',
    exercise: '',
    meal: '',
    stress: 3,
    alcohol: '',
    smoking: '',
  })

  const calculateBMI = () => {
    if (!healthData.weight || !healthData.height) return 0
    return (healthData.weight / ((healthData.height / 100) ** 2)).toFixed(1)
  }

  // 생체나이 계산 함수
  const calculateBiologicalAge = () => {
    let bioAge = healthData.age // 실제 나이부터 시작

    // 수면 시간 평가
    if (healthData.sleep === '5시간 이하') bioAge += 3
    else if (healthData.sleep === '7-8시간') bioAge -= 2

    // 운동 빈도 평가
    if (healthData.exercise === '거의 안함') bioAge += 2
    else if (healthData.exercise === '주 5회 이상') bioAge -= 3

    // 식습관 평가
    if (healthData.meal === '불규칙적') bioAge += 2
    else if (healthData.meal === '규칙적 3끼') bioAge -= 1

    // 스트레스 수준 평가
    if (healthData.stress >= 4) bioAge += 2
    else if (healthData.stress <= 2) bioAge -= 1

    // 음주 빈도 평가
    if (healthData.alcohol === '주 3회 이상') bioAge += 2
    else if (healthData.alcohol === '안 마심') bioAge -= 1

    // 흡연 상태 평가
    if (healthData.smoking === '현재 흡연') bioAge += 5
    else if (healthData.smoking === '비흡연') bioAge -= 1

    return Math.max(18, bioAge) // 최소 18세
  }

  // 생체나이와 실제 나이 차이 계산
  const getAgeDifference = () => {
    return calculateBiologicalAge() - healthData.age
  }

  // 등급 계산 (차이값 기준)
  const getGrade = () => {
    const diff = getAgeDifference()
    if (diff <= -5) return { label: '우수', color: '#10B981', emoji: '🌟' }
    if (diff <= 0) return { label: '양호', color: '#3B82F6', emoji: '😊' }
    if (diff <= 5) return { label: '보통', color: '#F59E0B', emoji: '😐' }
    return { label: '주의', color: '#EF4444', emoji: '⚠️' }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        width: '500vw',
        height: '100vh',
        transform: `translateX(-${(currentSlide - 1) * 100}vw)`,
        transition: 'transform 0.5s ease-in-out'
      }}>
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* [슬라이드 1] 히어로 - 시작 화면 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div style={{
          width: '100vw',
          height: '100vh',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
          padding: '24px'
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', maxWidth: '480px' }}
          >
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🌱</div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#166534',
              marginBottom: '24px',
              lineHeight: '1.4'
            }}>
              나를 더 건강하게 만드는<br/>작은 시작
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#374151',
              marginBottom: '16px',
              lineHeight: '1.6'
            }}>
              당신의 몸은 매일 당신이 어떻게 살아왔는지<br/>
              이야기하고 있어요
            </p>
            <p style={{
              fontSize: '16px',
              color: '#6B7280',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              오늘부터 시작하는<br/>
              나만의 웰니스 여정을 함께 해볼까요?
            </p>

            <button
              onClick={() => setCurrentSlide(2)}
              style={{
                width: '100%',
                maxWidth: '320px',
                background: 'linear-gradient(to right, #10B981, #059669)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                padding: '20px 32px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              시작하기 →
            </button>
          </motion.div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* [슬라이드 2] 입력 폼 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div style={{
          width: '100vw',
          height: '100vh',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#F5F7FA',
          overflow: 'hidden'
        }}>
          {/* 상단 네비게이션 */}
          <div style={{
            background: 'white',
            padding: '16px 24px',
            borderBottom: '1px solid #E5E7EB',
            flexShrink: 0
          }}>
            <div style={{
              maxWidth: '480px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <button
                onClick={() => setCurrentSlide(1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6B7280',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ← 뒤로
              </button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentSlide >= 1 ? '#10B981' : '#D1D5DB'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentSlide >= 2 ? '#10B981' : '#D1D5DB'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentSlide >= 3 ? '#10B981' : '#D1D5DB'
                }}></div>
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>{currentSlide}/3</span>
            </div>
          </div>

          {/* 스크롤 가능한 콘텐츠 */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px'
          }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              {/* 제목 */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>
                  📋 정보 입력
                </h2>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  정확한 분석을 위해 몇 가지만 알려주세요
                </p>
              </div>

              {/* 입력 폼 카드 */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                marginBottom: '24px'
              }}>
                {/* 실제 나이 */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    <span style={{ marginRight: '8px' }}>🎂</span>
                    실제 나이
                  </label>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                    더 정확한 생체 나이 분석을 위해 필요해요
                  </p>
                  <input
                    type="number"
                    value={healthData.age}
                    onChange={(e) => setHealthData({...healthData, age: parseInt(e.target.value)})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '12px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#10B981'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    min="18"
                    max="100"
                    placeholder="예: 30"
                  />
                </div>

                {/* 성별 */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    <span style={{ marginRight: '8px' }}>👤</span>
                    성별
                  </label>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                    성별에 따라 기준 수치가 달라져요
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button
                      onClick={() => setHealthData({...healthData, gender: 'male'})}
                      style={{
                        padding: '12px',
                        borderRadius: '9999px',
                        border: healthData.gender === 'male' ? 'none' : '2px solid #E5E7EB',
                        background: healthData.gender === 'male' ? '#10B981' : 'white',
                        color: healthData.gender === 'male' ? 'white' : '#6B7280',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      👨 남성
                    </button>
                    <button
                      onClick={() => setHealthData({...healthData, gender: 'female'})}
                      style={{
                        padding: '12px',
                        borderRadius: '9999px',
                        border: healthData.gender === 'female' ? 'none' : '2px solid #E5E7EB',
                        background: healthData.gender === 'female' ? '#10B981' : 'white',
                        color: healthData.gender === 'female' ? 'white' : '#6B7280',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      👩 여성
                    </button>
                  </div>
                </div>

                {/* 체중 */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    <span style={{ marginRight: '8px' }}>⚖️</span>
                    체중 (kg)
                  </label>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                    현재 몸 상태를 파악하는데 사용돼요
                  </p>
                  <input
                    type="number"
                    value={healthData.weight}
                    onChange={(e) => setHealthData({...healthData, weight: parseInt(e.target.value)})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '12px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#10B981'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    min="30"
                    max="200"
                    placeholder="예: 70"
                  />
                </div>

                {/* 키 */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    <span style={{ marginRight: '8px' }}>📏</span>
                    키 (cm)
                  </label>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                    BMI 계산에 사용돼요
                  </p>
                  <input
                    type="number"
                    value={healthData.height}
                    onChange={(e) => setHealthData({...healthData, height: parseInt(e.target.value)})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '12px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#10B981'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    min="120"
                    max="220"
                    placeholder="예: 170"
                  />
                </div>

                {/* BMI 표시 */}
                {healthData.weight && healthData.height && (
                  <div style={{
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '2px solid #F3F4F6'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>💚 BMI 지수</p>
                      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10B981' }}>
                        {calculateBMI()}
                      </p>
                    </div>
                    <div style={{
                      height: '8px',
                      background: '#E5E7EB',
                      borderRadius: '9999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.min(((Number(calculateBMI()) - 15) / 15) * 100, 100)}%`,
                        background: Number(calculateBMI()) < 18.5 ? '#F59E0B' : Number(calculateBMI()) < 25 ? '#10B981' : '#EF4444',
                        transition: 'all 0.3s'
                      }}></div>
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      textAlign: 'center',
                      marginTop: '8px'
                    }}>
                      {Number(calculateBMI()) < 18.5 && '저체중'}
                      {Number(calculateBMI()) >= 18.5 && Number(calculateBMI()) < 25 && '정상 범위 ✨'}
                      {Number(calculateBMI()) >= 25 && '과체중'}
                    </p>
                  </div>
                )}
              </div>

              {/* 다음 버튼 */}
              <button
                onClick={() => setCurrentSlide(3)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(to right, #10B981, #059669)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '16px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                다음 단계로 →
              </button>
              <p style={{
                fontSize: '12px',
                color: '#6B7280',
                textAlign: 'center',
                marginTop: '12px'
              }}>
                다음 단계에서는 생활습관을 확인합니다
              </p>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* [슬라이드 3] 💊 생활습관 측정 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div style={{
          width: '100vw',
          height: '100vh',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          overflow: 'hidden'
        }}>
          {/* 상단 네비게이션 */}
          <div style={{
            background: 'white',
            padding: '16px 24px',
            borderBottom: '1px solid #E5E7EB',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            flexShrink: 0
          }}>
            <div style={{
              maxWidth: '480px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <button
                onClick={() => setCurrentSlide(2)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6B7280',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ← 뒤로
              </button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentSlide >= 3 ? '#10B981' : '#D1D5DB'
                }}></div>
              </div>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>2/3</span>
            </div>
          </div>

          {/* 스크롤 가능한 콘텐츠 */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '40px 24px 100px'
          }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              {/* 제목 섹션 */}
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💊</div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>
                  생활습관 체크
                </h2>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  건강한 삶을 위한<br/>습관들을 확인해볼까요?
                </p>
              </div>

              {/* 질문 1: 수면 시간 */}
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                marginBottom: '16px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  😴 하루 평균 수면 시간은?
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {['5시간 이하', '6시간 정도', '7-8시간', '9시간 이상'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setHealthData({...healthData, sleep: option})}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: healthData.sleep === option ? '2px solid #66BB6A' : '2px solid #E0E0E0',
                        background: healthData.sleep === option ? '#E8F5E9' : 'white',
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 질문 2: 운동 빈도 */}
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                marginBottom: '16px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  🏃 일주일에 운동하는 횟수는?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['거의 안함', '주 1-2회', '주 3-4회', '주 5회 이상'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setHealthData({...healthData, exercise: option})}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: healthData.exercise === option ? '2px solid #66BB6A' : '2px solid #E0E0E0',
                        background: healthData.exercise === option ? '#E8F5E9' : 'white',
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'center'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 질문 3: 식습관 */}
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                marginBottom: '16px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  🍽️ 하루 식사 패턴은?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['불규칙적', '하루 1-2끼', '규칙적 3끼', '소식 다회'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setHealthData({...healthData, meal: option})}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: healthData.meal === option ? '2px solid #66BB6A' : '2px solid #E0E0E0',
                        background: healthData.meal === option ? '#E8F5E9' : 'white',
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'center'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 질문 4: 스트레스 수준 */}
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                marginBottom: '16px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  😌 일상 스트레스 수준은?
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setHealthData({...healthData, stress: level})}
                      style={{
                        flex: 1,
                        padding: '16px',
                        borderRadius: '12px',
                        border: healthData.stress === level ? '2px solid #66BB6A' : '2px solid #E0E0E0',
                        background: healthData.stress === level ? '#E8F5E9' : 'white',
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '18px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#6B7280',
                  marginTop: '8px'
                }}>
                  <span>낮음</span>
                  <span>높음</span>
                </div>
              </div>

              {/* 질문 5: 음주 빈도 */}
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                marginBottom: '16px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  🍷 음주 빈도는?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['안 마심', '월 1-2회', '주 1-2회', '주 3회 이상'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setHealthData({...healthData, alcohol: option})}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: healthData.alcohol === option ? '2px solid #66BB6A' : '2px solid #E0E0E0',
                        background: healthData.alcohol === option ? '#E8F5E9' : 'white',
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'center'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 질문 6: 흡연 여부 */}
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                marginBottom: '16px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
                  🚭 흡연 상태는?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['비흡연', '과거 흡연 (금연 중)', '현재 흡연'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setHealthData({...healthData, smoking: option})}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: healthData.smoking === option ? '2px solid #66BB6A' : '2px solid #E0E0E0',
                        background: healthData.smoking === option ? '#E8F5E9' : 'white',
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'center'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 하단 고정 버튼 */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            background: 'white',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <button
                onClick={() => {
                  // 모든 질문에 답변했는지 확인
                  if (healthData.sleep && healthData.exercise && healthData.meal &&
                      healthData.alcohol && healthData.smoking) {
                    setCurrentSlide(4)
                  } else {
                    alert('모든 질문에 답변해주세요!')
                  }
                }}
                disabled={!healthData.sleep || !healthData.exercise || !healthData.meal ||
                         !healthData.alcohol || !healthData.smoking}
                style={{
                  width: '100%',
                  background: (!healthData.sleep || !healthData.exercise || !healthData.meal ||
                              !healthData.alcohol || !healthData.smoking)
                    ? '#D1D5DB'
                    : 'linear-gradient(to right, #10B981, #059669)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '16px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: (!healthData.sleep || !healthData.exercise || !healthData.meal ||
                          !healthData.alcohol || !healthData.smoking)
                    ? 'not-allowed'
                    : 'pointer',
                  opacity: (!healthData.sleep || !healthData.exercise || !healthData.meal ||
                           !healthData.alcohol || !healthData.smoking)
                    ? 0.5
                    : 1,
                  transition: 'all 0.3s'
                }}
              >
                결과 확인하기 →
              </button>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* [슬라이드 4] 🎉 생체나이 결과 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div style={{
          width: '100vw',
          height: '100vh',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
          padding: '24px',
          position: 'relative'
        }}>
          {/* 상단 진행도 표시 */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            display: 'flex',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981'
            }}></div>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981'
            }}></div>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10B981'
            }}></div>
          </div>

          {/* 메인 결과 컨텐츠 */}
          <div style={{
            textAlign: 'center',
            maxWidth: '480px',
            width: '100%'
          }}>
            {/* 이모지 */}
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>

            {/* 타이틀 */}
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#166534',
              marginBottom: '32px'
            }}>
              당신의 생체 나이는
            </h2>

            {/* 생체나이 큰 숫자 */}
            <div style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#2E7D32',
              marginBottom: '16px',
              lineHeight: '1'
            }}>
              {calculateBiologicalAge()}세
            </div>

            {/* 실제 나이와 비교 */}
            <p style={{
              fontSize: '18px',
              color: '#374151',
              marginBottom: '32px'
            }}>
              {getAgeDifference() < 0 ? (
                <>
                  실제 나이보다 <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                    {Math.abs(getAgeDifference())}세 젊습니다
                  </span> 🎊
                </>
              ) : getAgeDifference() === 0 ? (
                <>
                  실제 나이와 <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>
                    같습니다
                  </span> 👍
                </>
              ) : (
                <>
                  실제 나이보다 <span style={{ color: '#EF4444', fontWeight: 'bold' }}>
                    {getAgeDifference()}세 많습니다
                  </span> 💡
                </>
              )}
            </p>

            {/* 비교 비주얼 (슬라이더 바) */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>실제 나이</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#6B7280' }}>
                    {healthData.age}세
                  </p>
                </div>
                <div style={{ fontSize: '24px' }}>↔️</div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>생체 나이</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2E7D32' }}>
                    {calculateBiologicalAge()}세
                  </p>
                </div>
              </div>

              {/* 진행 바 */}
              <div style={{
                width: '100%',
                height: '12px',
                background: '#E5E7EB',
                borderRadius: '9999px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${Math.min(100, Math.max(0, ((healthData.age - 20) / 60) * 100))}%`,
                  background: '#9CA3AF',
                  borderRadius: '9999px',
                  transition: 'all 0.5s'
                }}></div>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${Math.min(100, Math.max(0, ((calculateBiologicalAge() - 20) / 60) * 100))}%`,
                  background: getAgeDifference() < 0 ? '#10B981' : getAgeDifference() === 0 ? '#3B82F6' : '#EF4444',
                  borderRadius: '9999px',
                  transition: 'all 0.5s'
                }}></div>
              </div>
            </div>

            {/* 등급 뱃지 */}
            <div style={{
              display: 'inline-block',
              background: 'white',
              borderRadius: '9999px',
              padding: '12px 24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              marginBottom: '40px'
            }}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>{getGrade().emoji}</span>
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: getGrade().color
              }}>
                {getGrade().label}
              </span>
            </div>

            {/* 다음 버튼 */}
            <button
              onClick={() => setCurrentSlide(5)}
              style={{
                width: '100%',
                maxWidth: '320px',
                background: 'linear-gradient(to right, #10B981, #059669)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                padding: '20px 32px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              상세 분석 보기 →
            </button>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* [슬라이드 5] 💡 개선 제안 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div style={{
          width: '100vw',
          height: '100vh',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          overflow: 'hidden'
        }}>
          {/* 스크롤 가능한 콘텐츠 */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '40px 24px 120px'
          }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              {/* 제목 섹션 */}
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💡</div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>
                  맞춤 건강 개선 제안
                </h2>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  더 젊고 건강한 몸을 위한<br/>작은 변화들을 시작해보세요
                </p>
              </div>

              {/* 조건부 제안 카드들 */}

              {/* 수면 개선 제안 */}
              {(healthData.sleep === '5시간 이하' || healthData.sleep === '6시간 정도') && (
                <div style={{
                  background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '16px',
                  border: '2px solid #7DD3FC'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0C4A6E', marginBottom: '12px' }}>
                    😴 수면 습관 개선
                  </h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '12px' }}>
                    충분한 수면은 세포 재생과 호르몬 균형에 필수적입니다.
                  </p>
                  <ul style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>매일 같은 시간에 취침하고 기상하세요</li>
                    <li>잠들기 2시간 전 스마트폰 사용을 줄이세요</li>
                    <li>하루 7-8시간 수면을 목표로 하세요</li>
                  </ul>
                </div>
              )}

              {/* 운동 개선 제안 */}
              {(healthData.exercise === '거의 안함' || healthData.exercise === '주 1-2회') && (
                <div style={{
                  background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '16px',
                  border: '2px solid #86EFAC'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#14532D', marginBottom: '12px' }}>
                    🏃 운동 습관 만들기
                  </h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '12px' }}>
                    규칙적인 운동은 심혈관 건강과 근육량 유지에 도움이 됩니다.
                  </p>
                  <ul style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>하루 30분 걷기부터 시작해보세요</li>
                    <li>일주일에 3-4회 운동을 목표로 하세요</li>
                    <li>계단 이용, 대중교통 한 정거장 전에 내리기 등 일상에서 활동량을 늘려보세요</li>
                  </ul>
                </div>
              )}

              {/* 식습관 개선 제안 */}
              {(healthData.meal === '불규칙적' || healthData.meal === '하루 1-2끼') && (
                <div style={{
                  background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '16px',
                  border: '2px solid #FCD34D'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#78350F', marginBottom: '12px' }}>
                    🍽️ 식습관 개선
                  </h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '12px' }}>
                    규칙적인 식사는 대사 건강과 에너지 수준 유지에 중요합니다.
                  </p>
                  <ul style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>하루 세 끼를 규칙적으로 드세요</li>
                    <li>아침 식사를 거르지 마세요</li>
                    <li>채소와 과일 섭취를 늘리고, 가공식품은 줄여보세요</li>
                  </ul>
                </div>
              )}

              {/* 스트레스 관리 제안 */}
              {healthData.stress >= 4 && (
                <div style={{
                  background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '16px',
                  border: '2px solid #D8B4FE'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#581C87', marginBottom: '12px' }}>
                    😌 스트레스 관리
                  </h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '12px' }}>
                    만성 스트레스는 노화를 가속화하고 면역력을 저하시킵니다.
                  </p>
                  <ul style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>하루 10분 명상이나 심호흡을 실천해보세요</li>
                    <li>취미 활동이나 친구들과의 시간을 늘려보세요</li>
                    <li>필요하다면 전문가의 도움을 받는 것도 좋습니다</li>
                  </ul>
                </div>
              )}

              {/* 음주 절제 제안 */}
              {(healthData.alcohol === '주 1-2회' || healthData.alcohol === '주 3회 이상') && (
                <div style={{
                  background: 'linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '16px',
                  border: '2px solid #FDA4AF'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#881337', marginBottom: '12px' }}>
                    🍷 음주 절제
                  </h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '12px' }}>
                    과도한 음주는 간 건강과 전반적인 노화에 악영향을 미칩니다.
                  </p>
                  <ul style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>주 2회 이하로 음주 횟수를 줄여보세요</li>
                    <li>한 번에 마시는 양을 줄이세요 (소주 기준 1-2잔)</li>
                    <li>술 대신 탄산수나 무알콜 음료를 선택해보세요</li>
                  </ul>
                </div>
              )}

              {/* 금연 제안 */}
              {(healthData.smoking === '현재 흡연' || healthData.smoking === '과거 흡연 (금연 중)') && (
                <div style={{
                  background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '16px',
                  border: '2px solid #F87171'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#7F1D1D', marginBottom: '12px' }}>
                    🚭 금연 {healthData.smoking === '과거 흡연 (금연 중)' ? '유지' : '시작'}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '12px' }}>
                    {healthData.smoking === '과거 흡연 (금연 중)'
                      ? '금연을 시작하신 것을 축하드립니다! 계속 유지하세요.'
                      : '흡연은 생체 나이를 가장 크게 높이는 요인 중 하나입니다.'}
                  </p>
                  <ul style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8', paddingLeft: '20px' }}>
                    {healthData.smoking === '과거 흡연 (금연 중)' ? (
                      <>
                        <li>금연 3개월만 지나도 폐 기능이 30% 회복됩니다</li>
                        <li>스트레스 상황에서 흡연 욕구가 생길 수 있으니 대체 활동을 준비하세요</li>
                        <li>금연 성공 확률을 높이려면 금연 클리닉을 활용해보세요</li>
                      </>
                    ) : (
                      <>
                        <li>금연은 가장 효과적인 노화 방지 방법입니다</li>
                        <li>금연 클리닉이나 금연 패치 등의 도움을 받아보세요</li>
                        <li>금연 성공 시 평균 생체 나이가 5세 이상 젊어집니다</li>
                      </>
                    )}
                  </ul>
                </div>
              )}

              {/* 모든 습관이 좋을 경우 */}
              {healthData.sleep === '7-8시간' &&
               (healthData.exercise === '주 3-4회' || healthData.exercise === '주 5회 이상') &&
               healthData.meal === '규칙적 3끼' &&
               healthData.stress <= 2 &&
               healthData.alcohol === '안 마심' &&
               healthData.smoking === '비흡연' && (
                <div style={{
                  background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '16px',
                  border: '2px solid #4ADE80',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌟</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#14532D', marginBottom: '12px' }}>
                    완벽한 생활습관입니다!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                    현재의 건강한 습관을 잘 유지하고 계십니다.<br/>
                    이대로만 계속하시면 건강한 삶을 오래 유지하실 수 있습니다.
                  </p>
                </div>
              )}

              {/* 추가 팁 */}
              <div style={{
                background: '#F9FAFB',
                borderRadius: '16px',
                padding: '24px',
                marginTop: '24px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>
                  💚 건강한 생활을 위한 추가 팁
                </h3>
                <ul style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.8', paddingLeft: '20px' }}>
                  <li>하루 2리터 이상 물을 마시세요</li>
                  <li>햇빛을 하루 15분 이상 쬐세요 (비타민 D 생성)</li>
                  <li>정기적으로 건강검진을 받으세요</li>
                  <li>긍정적인 마음가짐을 유지하세요</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 하단 고정 버튼들 */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            background: 'white',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  onClick={() => setCurrentSlide(1)}
                  style={{
                    background: 'white',
                    color: '#6B7280',
                    fontWeight: '600',
                    fontSize: '14px',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: '2px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#10B981'
                    e.currentTarget.style.color = '#10B981'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB'
                    e.currentTarget.style.color = '#6B7280'
                  }}
                >
                  처음으로
                </button>
                <button
                  onClick={() => {
                    // 공유할 텍스트 생성
                    const bioAge = calculateBiologicalAge()
                    const ageDiff = getAgeDifference()

                    const shareText = `
🌱 SlowAge Journey

나의 생체 나이: ${bioAge}세
실제 나이: ${healthData.age}세
${ageDiff < 0
  ? `${Math.abs(ageDiff)}년 젊습니다! 🎊`
  : ageDiff === 0
    ? '실제 나이와 동일합니다 👍'
    : `${ageDiff}년 더 노화되었습니다 💡`
}

━━━━━━━━━━━━━━━
건강 점수
━━━━━━━━━━━━━━━

😴 수면: ${healthData.sleep}
🏃 운동: ${healthData.exercise}
🍽️ 식사: ${healthData.meal}
😌 스트레스: ${healthData.stress}단계
🍷 음주: ${healthData.alcohol}
🚭 흡연: ${healthData.smoking}

더 건강한 삶을 위한 여정을 함께해요!
https://snoh.github.io/slowaging/
                    `.trim()

                    // 클립보드에 복사
                    navigator.clipboard.writeText(shareText)
                      .then(() => {
                        alert('결과가 복사되었습니다! 📋\n\n원하는 곳에 붙여넣기(Ctrl+V) 하세요.')
                      })
                      .catch((error) => {
                        console.error('복사 실패:', error)
                        alert('복사에 실패했습니다.\n다시 시도해주세요.')
                      })
                  }}
                  style={{
                    background: 'linear-gradient(to right, #10B981, #059669)',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    padding: '16px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  결과 공유
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
