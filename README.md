# Environment

```
- node v18.14.0
- yarn berry v3.5.0
- mysql v5.7.41
```



# Build

## 1. 패키지 설치


```bash
npm install
```

### root에 패키지 설치
```bash
yarn add [패키지 이름] -W

```
### 개별 패키지 설치 (특정 workspace에...)
```bash
yarn workspace [워크스페이스 이름] add [패키지 이름]
```
- 우리 프로젝트의 워크스페이스 이름 : [`service`, `admin`, `common`]


## 2. 빌드

개발 환경

```bash
npm run dev-build
```

운영 환경

```bash
npm run prod-build
```

# Start

## 1. MYSQL DB 생성

## 2. 환경 변수 설정

```bash
.env 파일에 환경 변수 값 설정 (.env.form 파일 참고)
```

## 3. 서버 실행

개발 환경
```bash
npm run dev-start
```

운영 환경
```bash
npm run prod-start
```
