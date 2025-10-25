# 저속노화 플랫폼 과학적 근거 통합본

## 📊 핵심 데이터 (미션 설계용)

### 생체 나이 계산 가중치
```typescript
const bioAgeFactors = {
  nutrition: {
    mindDiet: -2.5,        // MIND 식단 실천 시
    processedFood: +3.0,   // 가공식품 섭취 시
    vegetables5: -1.0,     // 채소 5접시 섭취
  },
  exercise: {
    cardio3times: -1.5,    // 주 3회 유산소
    strength2times: -1.0,  // 주 2회 근력
    sedentary: +2.0,       // 좌식 생활
  },
  sleep: {
    optimal7to9: -1.0,     // 7-9시간 수면
    lessThan6: +2.0,       // 6시간 미만
    before11pm: -0.5,      // 11시 전 취침
  },
  stress: {
    meditation: -0.5,      // 명상 실천
    highStress: +1.5,      // 고스트레스
    gratitudeJournal: -0.3, // 감사 일기
  },
  lifestyle: {
    smoking: +5.0,         // 흡연
    alcoholWeekly: +0.3,   // 주 1회당
    waterIntake: -0.2,     // 물 2L
  }
};
```

### 미션 포인트 설정
```typescript
const missionPoints = {
  easy: {
    points: 10,
    duration: 5-10min,
    examples: [
      '5분 명상',
      '물 500ml 마시기',
      '계단 3층 오르기',
    ]
  },
  medium: {
    points: 20,
    duration: 20-30min,
    examples: [
      '저속노화 식단 1끼',
      '30분 걷기',
      '감사 일기 작성',
    ]
  },
  hard: {
    points: 30,
    duration: 30-60min,
    examples: [
      '가공식품 제로 하루',
      '근력운동 30분',
      '명상 20분',
    ]
  }
};
```

### 레벨업 기준
```typescript
const levelSystem = {
  level1: { points: 0, title: '초보자' },
  level2: { points: 100, title: '실천가' },
  level3: { points: 300, title: '챌린저' },
  level4: { points: 600, title: '전문가' },
  level5: { points: 1000, title: '마스터' },
};
```

### AI 코칭 메시지 템플릿
```typescript
const coachingMessages = {
  morning: [
    "좋은 아침이에요! 오늘도 저속노화 식단으로 시작해볼까요? 🌱",
    "어제보다 2점 더 나은 하루를 만들어봐요 ✨",
  ],
  missionComplete: [
    "와! 미션 완료! +{points}포인트 획득 🎉",
    "꾸준함이 답이에요. 생체 나이 -{age}세 진행 중!",
  ],
  streak: [
    "{days}일 연속 달성! 습관이 몸에 배고 있어요 🔥",
    "대단해요! 이제 저속노화가 당신의 라이프스타일이에요 💪",
  ],
  encouragement: [
    "완벽하지 않아도 괜찮아요. 다시 시작하면 돼요!",
    "작은 한 걸음이 큰 변화를 만들어요 🌟",
  ]
};
```

## 📚 출처 및 참고문헌

### 학술 논문
1. Morris MC, et al. (2015). MIND diet and Alzheimer's disease. Alzheimer's & Dementia.
2. Werner CM, et al. (2019). Exercise and telomeres. European Heart Journal.
3. Cell Metabolism (2023). Intermittent fasting effects.

### 도서
1. 정희원 (2024). 저속노화 식사법. 출판사명
2. 데이비드 싱클레어 (2019). 노화의 종말.

### 온라인 자료
1. 정희원의 저속노화 YouTube (47만 구독자)
2. 서울아산병원 공식 자료

### 임상 경험
- 정희원 교수 20년 노년의학 임상
- 2만5천명 저속노화 커뮤니티 데이터
- 평균 3개월 실천 시 생체 나이 -2.5세 개선

## ⚖️ 법적 고지
- 본 정보는 교육 목적이며 의학적 조언 대체 불가
- 개인별 건강 상태 고려 필요
- 중대한 건강 문제 시 전문의 상담 권장

