# DEV ENVIRONMENT
1. Windows 11
2. Powershell
3. Visual Studio Code

# PROJECT RULES
1. 수정이 용이해야함
2. 코드의 가독성이 좋아야함
3. 비즈니스 로직은 테스트코드로 검증되어야함

# PROJECT STACK
1. SvelteKit@latest
2. Tailwind@latest

# COMMIT CONVENTION
| Type | 설명 | 예시 |
| :--- | :--- | :--- |
| **feat** | 새로운 기능 추가, 기존 기능의 구조적 변경 | 로그인 기능 추가, 검색 필터 변경 |
| **fix** | 버그 수정 | 로그인 시 500 에러 수정 |
| **refactor** | 버그 수정이나 기능 추가 없는 코드 개선 | 함수 분리, 가독성 개선 |
| **docs** | 문서 수정 | README.md 수정, JSDoc 주석 추가 |
| **test** | 테스트 코드 추가/수정 | 로그인 단위 테스트 작성 |
| **style** | 비즈니스 로직 영향 없는 코드 포맷팅 | 들여쓰기 수정, 안 쓰는 import 제거 |
| **release**| 배포 및 메인 브랜치 머지 | v1.0.0 배포 준비 |
| **chore** | 빌드, 패키지 매니저, 기타 잡다한 설정 | .gitignore 수정, 라이브러리 업데이트 |