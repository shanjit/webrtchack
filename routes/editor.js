var express = require('express');
var router = express.Router();
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;
var child;

var data;

/* GET home page. */
router.get('/:id', function(req, res) {
  var title;
  if (req.params.id == 'zg') { title = 'Zero Gecko'}
    else if (req.params.id == 'tg')  {
      title = 'Tiny Gecko';
    }
    else if (req.params.id == 'wg')  {
      title = 'Wonder Gecko';
    }
    else if (req.params.id == 'og')  {
      title = 'Gecko';
    }
    else if (req.params.id == 'lg')  {
      title = 'Leopard Gecko';
    }
    else if (req.params.id == 'gg')  {
      title = 'Giant Gecko';
    }
    else
    {
        res.redirect('/'); 
    }

/*    fs.readFile("./blink_orig.c", 'utf8', function(err, load_data) {
    if(err) {
        console.log(err);
    } else {
        console.log(load_data);
        data = load_data;
        console.log(data);

    }
}); */
    res.render('editor', { title: title, data: data});

});

router.get('/', function(req, res) {
  res.redirect('/');
});


var data;
router.post('/save', function(req, res) {
    // each key in req.body will match the keys in the data object that you passed in
    var save_text = req.body.x;
    console.log(save_text);
    data = save_text;
    // Future - Pass id to distinguish boards / add a json key-value pair 
    fs.writeFile("./blink.c", save_text, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 
});

router.post('/burn', function(req, res) {
/*    // each key in req.body will match the keys in the data object that you passed in
    var save_text = req.body.x;
    console.log(save_text);
    data = save_text;
    // Future - Pass id to distinguish boards / add a json key-value pair 
    
        child = exec("make -f Makefile.blink all", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
     if (error !== null) {
      console.log('exec error: ' + error);
    }
    });*/
console.log("burning bith");
console.log(req.files);

        fs.readFile(req.files.displayImage.path, function (err, data) {
  // ...
console.log(data);


});


});


router.post('/load1', function(req, res) {
    // each key in req.body will match the keys in the data object that you passed in
/*    var save_text = req.body.x;
    console.log(save_text);
    data = save_text;
    // Future - Pass id to distinguish boards / add a json key-value pair 
    fs.writeFile("./blink.c", save_text, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});*/

 fs.readFile("./blink_led.c", 'utf8', function(err, load_data) {
    if(err) {
        console.log(err);
    } else {
        console.log(load_data);
        data = load_data;
        console.log(data);

    }
});

});

router.post('/load2', function(req, res) {
    // each key in req.body will match the keys in the data object that you passed in
/*    var save_text = req.body.x;
    console.log(save_text);
    data = save_text;
    // Future - Pass id to distinguish boards / add a json key-value pair 
    fs.writeFile("./blink.c", save_text, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); */


     fs.readFile("./uart_orig.c", 'utf8', function(err, load_data) {
    if(err) {
        console.log(err);
    } else {
        console.log(load_data);
        data = load_data;
        console.log(data);

    }
});
});

router.post('/compile', function(req, res) {
    // each key in req.body will match the keys in the data object that you passed in
    child = exec("make -f Makefile.blink all", function (error, stdout, stderr) {
  	sys.print('stdout: ' + stdout);
  	 if (error !== null) {
  	  console.log('exec error: ' + error);
  	}
	});

});




module.exports = router;
