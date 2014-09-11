var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var roomid = req.query.roomid;

  res.render('welcome', { title: 'hackx', roomid: roomid});

  console.log(req.query.roomid);

});


module.exports = router;
