# 배포 가이드

이 프로젝트는 **Vercel**과 **GitHub Pages** 두 가지 방법으로 배포할 수 있습니다.

## 🚀 방법 1: Vercel 배포 (추천)

### 장점
- Next.js 완벽 지원 (SSR, API Routes 등)
- Firebase 실시간 기능 완벽 작동
- 자동 HTTPS 및 CDN
- GitHub 연동 시 자동 배포
- 무료 티어 제공

### 배포 단계

1. **Vercel 계정 생성**
   - https://vercel.com 방문
   - GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "New Project" 클릭
   - GitHub 저장소 선택: `snoh/slowaging`
   - "Import" 클릭

3. **환경 변수 설정**
   - "Environment Variables" 섹션에서 다음 변수 추가:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_APP_ID=slowage-default
   ```

4. **배포 실행**
   - "Deploy" 클릭
   - 2-3분 후 배포 완료! 🎉

5. **배포된 URL**
   - 자동 생성: `https://your-project.vercel.app`
   - 커스텀 도메인 설정 가능

### 자동 배포
- `main` 브랜치에 push하면 자동으로 재배포됩니다
- PR 생성 시 프리뷰 배포 자동 생성

---

## 📄 방법 2: GitHub Pages 배포

### 장점
- 완전 무료
- GitHub에서 직접 호스팅
- 정적 사이트로 안정적

### 제한사항
- 정적 export만 지원 (SSR 불가)
- API Routes 사용 불가
- Firebase 클라이언트 기능은 작동

### 배포 단계

1. **GitHub Pages 활성화**
   - GitHub 저장소 설정 → Pages
   - Source: "GitHub Actions" 선택

2. **자동 배포**
   - `main` 브랜치에 push하면 자동으로 `.github/workflows/deploy.yml` 실행
   - 빌드 후 자동 배포

3. **수동 빌드 (선택사항)**
   ```bash
   # GitHub Pages용 빌드
   DEPLOY_TARGET=github-pages npm run build

   # out 폴더가 생성됨
   ```

4. **배포된 URL**
   - `https://snoh.github.io/slowaging/`

### Firebase 환경 변수 설정
GitHub Pages의 경우 환경 변수를 빌드 시점에 주입할 수 없으므로:

**옵션 1: GitHub Secrets 사용**
- Repository Settings → Secrets → Actions
- 환경 변수를 Secrets로 추가
- `.github/workflows/deploy.yml`에서 env로 주입

**옵션 2: 공개 Firebase 설정**
- Firebase 프로젝트 설정에서 도메인 제한 추가
- 코드에 직접 포함 (보안성 낮음, 추천하지 않음)

---

## 🔧 로컬 빌드 테스트

### Vercel 스타일 빌드
```bash
npm run build
npm run start
```

### GitHub Pages 스타일 빌드
```bash
DEPLOY_TARGET=github-pages npm run build
# out 폴더 생성됨

# 로컬에서 테스트
npx serve out
```

---

## 📊 배포 비교

| 기능 | Vercel | GitHub Pages |
|------|--------|--------------|
| 배포 속도 | ⚡ 빠름 (2-3분) | 🐢 느림 (5-10분) |
| SSR 지원 | ✅ 지원 | ❌ 미지원 |
| API Routes | ✅ 지원 | ❌ 미지원 |
| Firebase 실시간 | ✅ 완벽 | ✅ 클라이언트만 |
| 커스텀 도메인 | ✅ 무료 | ✅ 무료 |
| HTTPS | ✅ 자동 | ✅ 자동 |
| 환경 변수 | ✅ UI에서 쉽게 | ⚠️ Secrets 필요 |
| 가격 | 🆓 무료 (Hobby) | 🆓 완전 무료 |

---

## 🎯 추천 사항

- **프로덕션 배포**: Vercel (완전한 기능 + 편의성)
- **간단한 데모**: GitHub Pages (완전 무료)
- **병행 사용**: 두 가지 모두 설정하고 Vercel을 메인으로 사용

---

## 🔍 트러블슈팅

### Vercel 배포 실패
- 환경 변수가 제대로 설정되었는지 확인
- `vercel.json` 파일이 있는지 확인
- 빌드 로그 확인

### GitHub Pages 배포 실패
- GitHub Actions 로그 확인
- Pages 설정이 "GitHub Actions"로 되어 있는지 확인
- `DEPLOY_TARGET=github-pages` 환경 변수 확인

### Firebase 연결 오류
- Firebase 프로젝트 설정 확인
- 환경 변수가 올바른지 확인
- 브라우저 콘솔에서 에러 메시지 확인

---

## 📞 도움이 필요하신가요?

- Vercel 문서: https://vercel.com/docs
- GitHub Pages 문서: https://docs.github.com/pages
- Next.js 배포 가이드: https://nextjs.org/docs/deployment
