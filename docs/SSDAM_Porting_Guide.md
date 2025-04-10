SSDAM 포팅 매뉴얼

### I. 기술 스택 & 개발 환경
---
> [사용 도구]
>* 이슈 관리: JIRA
>* 형상 관리: GitLab
>* 커뮤니케이션: Mattermost, Notion
>* 디자인: Figma
>* UCC: 
>* CI/CD: 

[개발 환경]
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


[외부 서비스]
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

###  II. 빌드 및 배포
---

> [Front]
> 1. 의존성 설치
> `pnpm install`
>
>2. 개발 서버 실행
> `pnpm run build`