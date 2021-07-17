/*const sio = require('socket.io');

let io = null;

exports.initialize = server => {
	io = sio(server);
	io.on('connection', (socket) => {
		console.log(Object.keys(socket));
		console.debug(`A user connected with ${socket.id}`);
		socket.on('disconnect', () => {
			console.debug(`A user disconnected with ${socket.id}`);
		});
	});
};

exports.io = () => io;*/

const IO = require('koa-socket-2');

let io = null;

exports.initialize = (server) => {
  io = new IO();
  io.attach(server);
  io.on('connection', (ctx, data) => {
    console.log(Object.keys(ctx));
    console.log(data);
    // console.debug(`A user connected with ${socket.id}`);
    console.debug(`A user connected`);
    io.on('disconnect', () => {
      console.debug(`A user disconnected`);
      // console.debug(`A user disconnected with ${socket.id}`);
    });
  });
};

exports.io = () => io;

// "start": "concurrently \"npm run backend\" \"npm run frontend\"",
