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

| ID                             | Name                                       |
|--------------------------------|--------------------------------------------|
| DOLANG_SSL_KEY_PASSWORD        | SSL 키를 위한 비밀번호                     |
| DOLANG_GOOGLE_CLIENT_SECRET    | 구글 OAuth2 인증을 위한 클라이언트 비밀번호 |
| DOLANG_GOOGLE_CLIENT_ID        | 구글 OAuth2 인증을 위한 클라이언트 아이디   |
| DOLANG_GITHUB_SSH              | 깃허브 저장소 접근을 위한 SSH              |
| DOLANG_MYSQL_DATABASE          | MySQL 데이터베이스 이름                    |
| DOLANG_MYSQL_USER              | MySQL 사용자 이름                          |
| DOLANG_MYSQL_PASSWORD          | MySQL 사용자 비밀번호                      |
| DOLANG_GITLAB_ACCESS_TOKEN     | GitLab 접근을 위한 액세스 토큰             |
| OPENAI_API_KEY                 | ChatGPT API Key                            |
| OPENAI_API_URL                 | GPT URL                                    |

- **프론트엔드**

| ID                                | Name                         |
|-----------------------------------|------------------------------|
| VITE_GOOGLE_CLIENT_ID             | 인증서버 클라이언트 아이디     |
| VITE_GOOGLE_REDIRECT_URI          | 인증서버 리다이렉트 주소       |
| VITE_GOOGLE_AUTH_SERVER_URL       | 인증 서버 주소                |
| VITE_GOOGLE_AUTHORIZATION         | 인증서버 클라이언트 인증 정보 |

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
