# SlowAge Journey - 저속노화 체험형 플랫폼

심리학 이론과 과학적 근거를 바탕으로 한 체험형 저속노화 플랫폼입니다.

## 🎯 프로젝트 개요

SlowAge Journey는 단순한 건강 정보 제공을 넘어, 사용자가 실제로 생활 습관을 변화시키고 지속할 수 있도록 행동변화 심리학을 핵심 설계 원리로 적용한 플랫폼입니다.

### 핵심 심리학 이론
- **손실 회피 이론**: AR 미래 시뮬레이터로 현재 습관 유지 시의 부정적 미래를 시각화
- **습관 루프 이론**: 신호-루틴-보상 구조의 일일 미션 시스템
- **자기결정이론**: 자율성, 유능감, 관계성을 모두 충족하는 커뮤니티 기능

## 🚀 주요 기능

### 1. 생체 나이 계산기
- 과학적 근거 기반 생체 나이 측정
- MIND 식단, 운동, 수면, 스트레스 등 다양한 요인 고려
- 각 요인별 정확한 가중치 적용 (MASTER_REFERENCE.md 참조)

### 2. 일일 미션 시스템
- 습관 루프 이론 기반 개인화된 미션
- 영양, 운동, 수면, 마음챙김 4개 카테고리
- **게이미피케이션 요소**:
  - 포인트 & 레벨 시스템 (Lv.1 초보자 → Lv.5 마스터)
  - **스트릭 시스템**: 연속 성공 일수 추적 및 최고 기록 저장
  - **배지 시스템**:
    - MIND Diet 마스터 (7일 연속 달성)
    - 노화 저항군 (30일 연속 운동)
    - 커뮤니티 리더 (응원 10회 이상)

### 3. AR 미래 시뮬레이터
- 현재 습관 유지 시와 저속노화 실천 시의 미래 비교
- 손실 회피 심리를 극대화하는 시각적 충격
- 5년/10년 후 예상 생체 나이 시뮬레이션

### 4. 커뮤니티
- **실시간 피드**: Firestore 기반 실시간 게시물 업데이트
- **오늘의 성공 공유**: 사용자들의 작은 성공 스토리
- **응원 시스템**: 하트 버튼으로 서로 격려
- **Public Data Model**: `/artifacts/${appId}/public/data/slowAgePosts` 경로
- 자기결정이론의 관계성 요소 충족
- 전체 사용자 ID 표시로 투명성 보장

## 📊 과학적 근거

모든 기능은 검증된 과학적 근거 위에 설계되었습니다:

### MIND 식단 - Morris et al. (2015)
- **주요 발견**: MIND 식단을 따르는 사람은 그렇지 않은 사람보다 알츠하이머 위험이 53% 감소
- **뇌 건강**: 베리류, 견과류, 잎채소, 전곡물 등이 뇌 건강에 필수적
- **임상 데이터**: 평균 4.7년 추적 조사 결과, 뇌 나이를 7.5년 더 젊게 유지 가능
- **연구 파일**: [`research/Morris et al., 2015.pdf`](research/Morris%20et%20al.,%202015.%20MIND%20diet%20associated%20with%20reduced%20incidence%20of%20Alzheimer.pdf)

### 유산소 운동과 텔로미어 - Werner et al. (2019)
- **주요 발견**: 주 3회 이상 유산소 운동을 실천하면 텔로미어가 보존되고 생체 나이를 9년 더 젊게 유지
- **운동 효과**: 유산소 운동(걷기, 조깅, 수영)이 텔로미어 길이 보존에 가장 효과적
- **실천 권장**: 주 150분 중강도 운동 또는 주 75분 고강도 운동
- **연구 파일**: [`research/Werner et al., 2019.pdf`](research/Werner%20et%20al.,%202019.%20Differential%20effects%20of%20endurance,%20interval,%20and%20resistance%20training%20on%20telomerase.pdf)

### 명상과 스트레스 관리
- **Stanford University 연구**: 8주 명상 실천 시 스트레스 호르몬 코르티솔 25% 감소
- **임상 데이터**: 정희원 교수 20년 노년의학 임상, 2만 5천명 커뮤니티에서 3개월 실천 시 평균 생체 나이 -2.5세 개선 확인

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Firebase Firestore (실시간 데이터베이스)
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks, Zustand
- **Notifications**: React Hot Toast

## 📁 프로젝트 구조

```
slowage-journey/
├── app/
│   ├── page.tsx                 # 생체 나이 계산기 (메인)
│   ├── missions/page.tsx        # 일일 미션 시스템 (스트릭 & 배지)
│   ├── ar-simulator/page.tsx    # AR 미래 시뮬레이터
│   ├── community/page.tsx       # 커뮤니티 (실시간 피드)
│   ├── home/page.tsx           # 홈페이지
│   ├── layout.tsx              # 루트 레이아웃
│   └── globals.css             # 글로벌 스타일
├── components/
│   ├── LoadingSpinner.tsx      # 로딩 스피너
│   ├── StreakWidget.tsx        # 스트릭 위젯
│   └── BadgeDisplay.tsx        # 배지 표시
├── lib/
│   └── firebase.ts             # Firebase 설정 및 헬퍼
├── research/
│   └── MASTER_REFERENCE.md     # 과학적 근거 통합본
├── .env.local.example          # 환경변수 예시
├── package.json
├── tailwind.config.js
└── next.config.js
```

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. Firebase 설정
1. [Firebase Console](https://console.firebase.google.com)에서 새 프로젝트 생성
2. Firestore Database 활성화
3. 프로젝트 설정에서 웹 앱 추가
4. 제공된 설정 값을 `.env.local` 파일에 입력

```bash
cp .env.local.example .env.local
# .env.local 파일을 열어 Firebase 설정값을 입력하세요
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 확인
[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 📱 주요 페이지

- **`/`** - 생체 나이 계산기 (메인 페이지)
- **`/missions`** - 일일 미션 시스템
- **`/ar-simulator`** - AR 미래 시뮬레이터
- **`/community`** - 커뮤니티

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Blue 계열 (신뢰감, 안정성)
- **Secondary**: Purple 계열 (혁신, 창의성)
- **Success**: Green 계열 (성장, 건강)
- **Warning**: Orange 계열 (주의, 활력)

### 컴포넌트
- **Card**: Glass morphism 효과
- **Button**: 그라데이션과 호버 애니메이션
- **Progress Bar**: 부드러운 애니메이션
- **Mission Card**: 카테고리별 색상 구분

## 📈 기대 효과

### 개인적 차원
- 평균 3개월 내 생체 나이 2-3세 감소
- 건강한 습관의 몸에 배임
- 삶의 질 전반적 향상

### 사회적 차원
- 초고령사회 한국의 의료비 부담 감소
- 예방적 건강 관리 활성화
- 건강수명 연장 문화 조성

## 🔬 연구 참고자료

### 학술 논문
1. Morris MC, et al. (2015). MIND diet and Alzheimer's disease. Alzheimer's & Dementia.
2. Werner CM, et al. (2019). Exercise and telomeres. European Heart Journal.
3. Cell Metabolism (2023). Intermittent fasting effects.

### 도서
1. 정희원 (2024). 저속노화 식사법.
2. 데이비드 싱클레어 (2019). 노화의 종말.

### 온라인 자료
1. 정희원의 저속노화 YouTube (47만 구독자)
2. 서울아산병원 공식 자료

## ⚖️ 법적 고지

- 본 정보는 교육 목적이며 의학적 조언 대체 불가
- 개인별 건강 상태 고려 필요
- 중대한 건강 문제 시 전문의 상담 권장

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 링크: [https://github.com/your-username/slowage-journey](https://github.com/your-username/slowage-journey)

---

**SlowAge Journey** - 심리학과 과학이 만나 행동 변화를 만들어내는 플랫폼 🌟

