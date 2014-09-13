var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	var roomid = req.query.roomid;
	res.render('welcome', { title: 'hackx', roomid: roomid});


});


router.post('/start', function(req, res) {
    var save_text = req.body.x;
    console.log(save_text);

});



router.post('/end', function(req, res) {
    var save_text = req.body.x;
    console.log(save_text);

});


module.exports = router ;
