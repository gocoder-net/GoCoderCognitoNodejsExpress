var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('코그니트 api 서버 입니다.');
});

module.exports = router;
