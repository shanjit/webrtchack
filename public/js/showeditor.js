	
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/twilight");
	editor.getSession().setMode("ace/mode/c_cpp");
	document.getElementById('editor').style.fontSize='15px';


$(document).ready(function() {


	$("#save").click(function(e) {
		humane.log("Saved");
	var text = editor.getValue();
	var json_text = JSON.stringify(text);
	var real_json_text = JSON.stringify({ x: text });                  // '{"x":5}'
					$.ajax({
						type: 'POST',
						contentType: 'application/json',
						data: real_json_text,
                        url: '/editor/save',						
                        success: function(data) {
                            console.log('success');
                        }
                    });
});

		$("#burn").click(function(e) {
		humane.log("Burning last compiled code");
	var text = editor.getValue();
	var json_text = JSON.stringify(text);
	var real_json_text = JSON.stringify({ x: text });                  // '{"x":5}'
					$.ajax({
						type: 'POST',
						contentType: 'application/json',
						data: real_json_text,
                        url: '/editor/burn',						
                        success: function(data) {
                            console.log('success');
                        }
                    });
});




	$("#back").click(function(e) {
			
window.location.href = "/welcome";

});



	$("#compile").click(function(e) {
			humane.log("Compiled, click download");
			var text = editor.getValue();
	var json_text = JSON.stringify(text);
	var real_json_text = JSON.stringify({ x: text });                  // '{"x":5}'
					$.ajax({
						type: 'POST',
						contentType: 'application/json',
						data: real_json_text,
                        url: '/editor/compile',						
                        success: function(data) {
                            console.log('success');
                        }
                    });
	});

	$("#downloadbin").click(function(e) {
			window.location.href = "/downloadbin";
	});




		$("#guide").click(function(e) {

		$('body').chardinJs('start');


                    });

		$("#load1").click(function(e) {
	var text = "load1";
	var json_text = JSON.stringify(text);
	var real_json_text = JSON.stringify({ x: text });                  // '{"x":5}'
					$.ajax({
						type: 'POST',
						contentType: 'application/json',
						data: real_json_text,
                        url: '/editor/load1',						
                        success: function(data) {
                            console.log('success');
                        }
                    });

                    });

		$("#load2").click(function(e) {
	var text = "load2";
	var json_text = JSON.stringify(text);
	var real_json_text = JSON.stringify({ x: text });                  // '{"x":5}'
					$.ajax({
						type: 'POST',
						contentType: 'application/json',
						data: real_json_text,
                        url: '/editor/load2',						
                        success: function(data) {
                            console.log('success');
                        }
                    });
});

});

