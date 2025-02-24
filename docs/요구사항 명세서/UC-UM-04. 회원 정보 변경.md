# UC-UM-04

제목: 회원 정보 변경
범위: 회원 관리 시스템
액터: 사용자
목표: 사용자는 회원 정보를 변경할 수 있다.
버전: v1
우선순위: 1
BE 개발 일정: 2024년 10월 24일
FE 개발 일정: 2024년 10월 29일
진행도: 시작 전

# 요약 설명

- 사용자는 닉네임과 프로필 사진을 변경할 수 있다.
- 사용자가 이메일 계정으로 가입한 경우 비밀번호도 변경할 수 있다.

---

# 성공 시나리오

### 사전 조건 : 로그인

 

1. 사용자가 **설정 페이지**로 이동. (* 또는 프로필 페이지)
2. **계정 관리** 섹션에서 **회원정보 수정** 옵션 선택.
3. 사용자는 **닉네임, 비밀번호, 프로필 사진** 등의 정보를 변경할 수 있음.
4. 변경하고자 하는 정보를 입력하고 **저장 버튼** 클릭.
5. 서버는 사용자의 정보를 업데이트하고 **변경 사항이 즉시 반영**됨.
6. 변경 완료 후, 사용자에게 **변경 성공 메시지**가 표시됨.

### 사후 조건

- FE
    - 회원 PK, 수정한 닉네임, 비밀번호, 프로필 이미지를 서버에 전송한다.
- BE
    - DB 내 해당 회원 PK의 닉네임, 비밀번호, 프로필 이미지를 수정한다.

---

# 확장

- 비밀번호 재확인이 필요할 수 있음

---