#설치필요  
Node.js 최신버전

#npm install   
npm install --save amazon-cognito-identity-js  
npm install --save aws-sdk  
npm install --save request  
npm install --save jwk-to-pem  
npm install --save jsonwebtoken  
npm install --save node-fetch  
npm install --save jwt-decode  
npm install --save node-fetch@2  
npm install --save dotenv

#접속페이지  
http://localhost:3000/member/  

#서버 실행  
node D:\hist\skillup\hanjin-sm-cognito\bin\www


#API 호출 예시  

1. 회원가입 
http://localhost:3000/member/signup?email=jlee@hist.co.kr&password=(비밀번호)

2. 로그인    
http://localhost:3000/member/login?email=jlee@hist.co.kr&password=(비밀번호)
    
3. 로그인 인증 (이메일)
http://localhost:3000/member/code?name=jlee@hist.co.kr&code=(이미엘 인증코드)    

4. 회원 정보 확인
http://localhost:3000/member/verify/(토큰)

5. 회워 세션 연장
http://localhost:3000/member/renew?email=jlee@hist.co.kr&token=(토큰)
