# Environment

1. 의존성

  <pre>
  - node v16.14.0
  - mysql v5.7.41
  </pre>

2. yarn 설치

  <pre>
    npm install -g yarn
  </pre>

# Build

1. 패키지 설치

  <pre>
  > yarn
  </pre>

2. 빌드

  개발 환경
  <pre>
  > yarn dev-build
  </pre>

  운영 환경
  <pre>
  > yarn prod-build
  </pre>

# Start

1. MYSQL DB 생성

2. 환경 변수 설정

  <pre>
  .env 파일에 환경 변수 값 설정 (.env.form 파일 참고)
  </pre>

2. 서버 실행

  개발 환경
  <pre>
  > yarn dev-start
  </pre>

  운영 환경
  <pre>
  > yarn prod-start
  </pre>
