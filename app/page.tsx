'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface HealthData {
  age: number
  gender: 'male' | 'female'
  weight: number
  height: number
}

export default function BiologicalAgeCalculator() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [healthData, setHealthData] = useState<HealthData>({
    age: 30,
    gender: 'male',
    weight: 70,
    height: 170,
  })

  const calculateBMI = () => {
    if (!healthData.weight || !healthData.height) return 0
    return (healthData.weight / ((healthData.height / 100) ** 2)).toFixed(1)
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
        width: '300vw',
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
        {/* [슬라이드 3] 결과 화면 (추후 구현) */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div style={{
          width: '100vw',
          height: '100vh',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#F5F7FA',
          padding: '24px'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>📊</div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '16px' }}>
              결과 화면
            </h2>
            <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px' }}>
              이 화면은 추후 구현 예정입니다
            </p>
            <button
              onClick={() => setCurrentSlide(1)}
              style={{
                background: 'linear-gradient(to right, #10B981, #059669)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                padding: '16px 32px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              처음으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
