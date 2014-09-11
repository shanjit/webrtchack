var express = require('express');
var router = express.Router();
var sys = require('sys')
var exec = require('child_process').exec;
var child;
var child1;
	var objects = {};

/* GET home page. */
router.get('/', function(req, res) {
	var roomid = req.query.roomid;


	child = exec("cd ~/workspace/nodejs/hackx/src/rooms/"+roomid, function (error, stdout, stderr) {
  	
  	 if (error !== null) {
  	  
	child1 = exec("mkdir ~/workspace/nodejs/hackx/src/rooms/"+ roomid, function (error, stdout, stderr) {
  	sys.print('Created room Shan !\n');
  	 if (error !== null) {
  	  console.log('exec error: ' + error);
  	}
	});


  	    	}
	});


	child = exec("ls ./rooms/"+roomid+" -1 | wc -l", function (error, stdout, stderr) {
  	objects.size = stdout;
  	sys.print(stdout);
  	 if (error !== null) {
  	  console.log('exec error: ' + error);
  	}
	});
	console.log(objects);

/*setTimeout(function(){
	console.log("timeout")
}, 3000);

*/
  res.render('welcome', { title: 'hackx', roomid: roomid, objects: objects});

  console.log(roomid);

});


module.exports = router;
