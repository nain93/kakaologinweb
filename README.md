# kakaologinweb

로그인 클릭시 RestApiKey랑 redirectUrl을 포함한 아래 링크로 href 링크를 엽니다
kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${RestApiKey}&redirect_uri=${redirectUrl}&response_type=code`;

redirectUrl이 http://localhost:3000 일때 아래와같이 redirectUrl에 code파라미터가 붙은 url이 들어와집니다
http://localhost:3000/?code=Ss32OM1_yUybn5dtEQ-XT8EZfV24BKC_GIeIvFPz7_wHorYXtij9JFQcMuGtGdzxQc3Vlwopb1UAAAGCizvuCw

code= 뒤쪽부분을 split해서 login() 함수실행시 필요한 파라미터  RestApiKey, redirect_uri, code와 같이 넣어주면 됩니다
