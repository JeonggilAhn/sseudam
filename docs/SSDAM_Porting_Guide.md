## SSDAM 포팅 매뉴얼

### 목차
1. 기술 스택 & 개발 환경
2. 빌드 시 사용되는 환경 변수
3. 배포 시 특이사항
4. 젠킨스 파이프라인

### I. 기술 스택 & 개발 환경
---
> [사용 도구]
>* 이슈 관리: JIRA
>* 형상 관리: GitLab
>* 커뮤니케이션: Mattermost, Notion
>* 디자인: Figma
>* UCC: 
>* CI/CD: 

> [개발 환경]
> * **Front-end**
> 	* Node.js: 20.19.0
> 	* React: 18.3.1
> 	* Next.js: 15.2.2
> 	* Typescript: ^5
> 	* Tailwind CSS: ^4.0.15
> 	* ESLint: ^9
> 	* Prettier: ^3.5.3
> 	* pnpm: ^8
> 	* 기타: twin.macro, react-hook-form, zod, axios 등

> * **Back-end**
> 	* Java: 21
> 	* Spring Boot: 3.4.3
> 	* Spring Data JPA
> 	* Spring Security & OAuth2 Client
> 	* Spring Data Redis
> 	* Spring Web & WebFlux
> 	* Spring Actuator + Prometheus (모니터링)
> 	* MariaDB: 3.5.2
> 	* JWT: jjwt 0.12.5
> 	* Lombok


> [외부 서비스]
> * 금융감독원 API
> * Google Cloud (Gemini API)

> [gitignore]
```
[Front]

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# PWA files
**/public/workbox-*.js
**/public/sw.js
**/public/service-worker.js
**/public/worker-*.js
**/public/fallback-*.js

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Playwright test results
test-results/

# Playwright report
playwright-report/

# Playwright test results
test-results/

# Playwright report
playwright-report/

.vscode/
sw.js
```

### II. 빌드 시 사용되는 환경변수
- **백엔드**

| ID                             | Name                                                        |
|--------------------------------|-------------------------------------------------------------|
| DB_DRIVER_CLASS_NAME           | 데이터베이스 드라이버 클래스 이름                           |
| DB_URL                         | 데이터베이스 접속 URL                                       |
| DB_USERNAME_DB_PASSWORD        | 데이터베이스 사용자 이름과 비밀번호                         |
| GOOGLE_CLIENT_ID               | 구글 OAuth2 인증을 위한 클라이언트 아이디                   |
| GOOGLE_CLIENT_PASSWORD         | 구글 OAuth2 인증을 위한 클라이언트 비밀번호                 |
| OAUTH_REDIRECT_URI_PREFIX      | OAuth 리다이렉트 URI의 접두어                               |
| JWT_SECRET                     | JWT 서명을 위한 비밀 키                                     |
| LOGIN_ENDPOINT                 | 로그인 엔드포인트 URL                                       |
| REDIS_HOST                     | Redis 서버 호스트                                           |
| REDIS_PWD                      | Redis 서버 비밀번호                                         |
| CREATE_CARD_TRANSACTION_URL    | 카드 거래 요청을 위한 API URL                          |
| SSAFY_API_KEY                  | SSAFY API 접근을 위한 서비스 인증 키                              |
| FSS_API_KEY                    | 금융감독원 API 접근을 위한 인증 키                          |
| FRONT_URL                      | 프론트엔드 애플리케이션의 배포 URL                          |
| CLOUD_RUN_URL                  | Gemini API 호출을 위한 Cloud Run 함수의 URL                      |



###  II. 빌드 및 배포
---

> [Front]
> 1. 의존성 설치
> `pnpm install`
>
>2. 개발 서버 실행
> `pnpm dev`


### III. 배포 시 특이사항
- 아래의 경로에 .env.properties를 만들어야합니다.
 \A106\S12P21A106\back\ssdam\src\main\resources\.env.properties
