const sio = require('socket.io');

let io = null;

// const IO = require('koa-socket-2');
// io = new IO();

exports.initialize = server => {
	// io.attach(server);
	io = sio(server);
	io.on('connection', (socket) => {
		// console.debug(ctx);
		// console.debug(socket);
		console.debug(`A user connected with ${socket.id}`);
		socket.on('disconnect', () => {
			console.debug(`A user disconnected with ${socket.id}`);
		});
	});
};

exports.io = () => io;
