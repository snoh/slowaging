'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Target, 
  Camera, 
  Users, 
  TrendingUp,
  Heart,
  Brain,
  Zap,
  ArrowRight,
  Star,
  Award
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: '생체 나이 계산기',
      description: '과학적 근거 기반 생체 나이 측정으로 현재 상태를 정확히 파악하세요',
      href: '/',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: '일일 미션',
      description: '습관 루프 이론 기반 개인화된 미션으로 저속노화를 실천하세요',
      href: '/missions',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'AR 미래 시뮬레이터',
      description: '현재 습관 유지 시와 저속노화 실천 시의 미래 모습을 비교해보세요',
      href: '/ar-simulator',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '커뮤니티',
      description: '함께 성장하는 저속노화 커뮤니티에서 동기부여를 받으세요',
      href: '/community',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const stats = [
    { number: '2.5세', label: '평균 생체 나이 개선', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '53%', label: '알츠하이머 위험 감소', icon: <Brain className="w-6 h-6" /> },
    { number: '25%', label: '스트레스 호르몬 감소', icon: <Heart className="w-6 h-6" /> },
    { number: '9세', label: '운동으로 젊어지는 나이', icon: <Zap className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center">
      {/* 헤더 */}
      <header className="w-full max-w-7xl mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">SlowAge Journey</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              홈
            </Link>
            <Link href="/missions" className="text-gray-600 hover:text-primary-600 transition-colors">
              미션
            </Link>
            <Link href="/ar-simulator" className="text-gray-600 hover:text-primary-600 transition-colors">
              AR 시뮬레이터
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-primary-600 transition-colors">
              커뮤니티
            </Link>
          </div>
        </nav>
      </header>

      {/* 히어로 섹션 */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            저속노화의 여정을<br />
            시작하세요
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            심리학 이론과 과학적 근거를 바탕으로 한 체험형 저속노화 플랫폼.<br />
            단순한 정보 제공을 넘어 실제 행동 변화를 이끌어냅니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary text-lg px-8 py-4">
              생체 나이 측정하기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/missions" className="btn-secondary text-lg px-8 py-4">
              미션 시작하기
              <Target className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="text-primary-500 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* 주요 기능 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            핵심 기능
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="card p-6 hover:shadow-xl transition-all duration-300"
              >
                <Link href={feature.href}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 과학적 근거 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
            과학적 근거
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">MIND 식단</h3>
              <p className="text-sm text-gray-600">
                Morris et al. (2015) 연구에 따르면 알츠하이머 위험을 53% 감소시키고 뇌 나이를 7.5년 젊게 유지합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">유산소 운동</h3>
              <p className="text-sm text-gray-600">
                Werner et al. (2019) 연구에서 주 3회 유산소 운동 시 텔로미어가 보존되고 생체 나이가 9년 더 젊게 유지됩니다.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">명상</h3>
              <p className="text-sm text-gray-600">
                Stanford University 연구에서 8주 실천 시 스트레스 호르몬인 코르티솔을 25% 감소시킨다고 밝혔습니다.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="card p-12 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              지금 시작하세요
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              정희원 교수의 20년 임상 경험과 2만 5천명 커뮤니티 데이터를 바탕으로<br />
              평균 3개월 실천 시 생체 나이 2.5세 개선을 경험할 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary text-lg px-8 py-4">
                무료로 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 푸터 */}
      <footer className="w-full max-w-7xl mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-2">© 2024 SlowAge Journey. All rights reserved.</p>
          <p className="text-sm">
            본 정보는 교육 목적이며 의학적 조언 대체 불가. 개인별 건강 상태 고려 필요.
          </p>
        </div>
      </footer>
    </div>
  )
}

