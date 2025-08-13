# Tampermonkey

웹사이트에 javascript 를 injection 할 수 있는 플러그인으로 `Chrome`, `Edge` 에서 사용 가능.

## 설치

1. Tampermonkey 플러그인 설치 (Tampermonkey Beta 아님)
3. 설정
    * Chrome:
        * `chrome://extensions` 접속 후 우측 상단의 `개발자 모드` 켜기
        * 확장 프로그램 관리 메뉴에서 Tampermonkey 세부정보에서 `사용자 스크립트 허용` 켜기
    * Edge:
        * `edge://extensions` 접속 후 좌측 중앙의 `개발자 모드` 켜기
4. 아래의 raw url 을 브라우저로 접속하면 자동으로 `유저 스크립트 설치` 페이지가 뜸
    * Jenkins: https://raw.githubusercontent.com/public-knet/style/main/jenkins/tampermonkey.user.js
    * ArgoCD: https://raw.githubusercontent.com/public-knet/style/main/argocd/tampermonkey.user.js
    * AWS Console: https://raw.githubusercontent.com/public-knet/style/main/aws/tampermonkey.user.js
    * ChatGPT: https://raw.githubusercontent.com/public-knet/style/main/chatgpt/tampermonkey.user.js
5. `설치` 버튼을 클릭하여 스크립트 설치