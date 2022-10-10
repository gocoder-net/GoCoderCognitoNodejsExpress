const express = require('express');
const router  = express.Router();

const cognito = require('./cognito.js');

router.all('/', function(req, res, next) {
    res.send('한정통 AWS 스킬업 사용자 인증 API 서버 입니다.');
});

//이메일 코드 인증
router.all('/code', async (req,res)=>{


    let name = req.query.name == undefined ? req.body.name : req.query.name;
    let code = req.query.code == undefined ? req.body.code : req.query.code;
    if (name && code){

        try{
            // cognito에 가입 요청을 보냅니다.
            let result = await cognito.verifyCode(name,code);
            res.status(200).json({"result":result});

        } catch(error){
            console.log(error);
            res.status(400).json({"error":error});
        }

    } else {
        res.status(400).json({"error":"bad format"});
    }

});

//가입을 받습니다.
router.all('/signup', async (req,res)=>{

    const {body} = req;

    let name = req.query.name == undefined ? req.body.name : req.query.name;
    let email = req.query.email == undefined ? req.body.email : req.query.email;
    let password = req.query.password == undefined ? req.body.password : req.query.password;

    try{

        //cognito에 가입 요청을 보냅니다.
        let result = await cognito.signUp(name,email,password);

        //Make response.
        let response = {
            username : result.user.username,
            id: result.userSub,
            sucess: true
        }

        res.status(200).json({"result":response});

    } catch(err){
        res.status(400).json({"error":err});
    }
    /*
      } else {
        res.status(400).json({"error":"bad format"});
      }*/

});

//로그인 요청
router.all('/login', async (req,res)=>{

    const {body} = req;

    let email = req.query.email == undefined ? req.body.email : req.query.email;
    let password = req.query.password == undefined ? req.body.password : req.query.password;

    //요청 형식을 확인합니다.
    if (email&&password){

        try{

            //cognito에 로그인 요청을 보냅니다.
            let result = await cognito.logIn(email,password);

            res.status(200).json({"result":result});

        } catch(err){
            res.status(400).json({"error":err});
        }

    } else {
        res.status(400).json({"error":"bad format"});
    }

});

//토큰 확인
router.all('/verify/:token', async (req,res)=>{

    try{

        if (req.params.token){

            let token = req.params.token;

            //토큰을 확인합니다.
            let result = await cognito.verify(token);

            res.status(200).json({"result":result});

        } else {
            res.status(400).json({"error":"bad format"});
        }

    } catch(err){
        console.log(err);
        res.status(500).json({"error":err});
    }

});

//토큰 갱신
router.all('/renew', async (req,res)=>{

    const {body} = req;

    let email = req.query.email == undefined ? req.body.email : req.query.email;
    let token = req.query.token == undefined ? req.body.token : req.query.token;

    //요청 형식을 확인합니다.
    if (email && token){

        try{

            //토큰 갱신 요청을 cognito로 보냅니다.
            let result = await cognito.reNew(token,email);

            res.status(200).json({"result":result});

        } catch(err){
            console.log(err);
            res.status(400).json({"error":err});
        }

    } else {
        res.status(400).json({"error":"bad format"});
    }

});

//비밀번호 변경
router.all('/changePwd', async (req,res)=>{

    const {body} = req;

    let email = req.query.email == undefined ? req.body.email : req.query.email;
    let password = req.query.password == undefined ? req.body.password : req.query.password ;
    let newpassword = req.query.newpassword == undefined ? req.body.newpassword : req.query.newpassword ;

    //요청 형식을 확인합니다.
    if (email && password && newpassword){

        let {email,password,newpassword} = body;

        try{

            //토큰 갱신 요청을 cognito로 보냅니다.
            let result = await cognito.changePwd(email,password,newpassword);

            res.status(200).json({"result":result});

        } catch(err){
            console.log(err);
            res.status(400).json({"error":err});
        }

    } else {
        res.status(400).json({"error":"bad format"});
    }

});

module.exports = router;
