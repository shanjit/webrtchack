
// Socket connections like TCP are persistant in nature
module.exports = {

        startSocketServer: function (server) {

        var io = require('socket.io').listen(server);
		io.sockets.on('connection', function (socket) {

    	console.log('A new user connected!');


	function log(){
		var array = [">>> "];
	  for (var i = 0; i < arguments.length; i++) {
	  	array.push(arguments[i]);
	  }
	    socket.emit('log', array);
	}

	socket.on('message', function (message) {
		console.log(message);

		socket.emit('message', message);
		socket.broadcast.emit('message', message); // should be room only
	});

	socket.on('create or join', function (message) {
		console.log(io.eio.clientsCount);
		var numClients = io.eio.clientsCount; //io.sockets.clients(room).length;

		log('Room ' + message.room + ' has ' + numClients + ' client(s)');
		log('Request to create or join', message.room);

		if (numClients == 1){
			socket.join(message.room);
			socket.emit('created', message);
		} else if (numClients == 2) {

			socket.join(message.room);

			socket.emit('joined', message);
			socket.broadcast.emit('joined', message);

		} else { // max two clients
			socket.emit('full', message.room);
		}
/*		socket.emit('emit(): client ' + socket.id + ' joined room ' + message.room);
		socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + message.room);
*/
		


	});



});


}

}