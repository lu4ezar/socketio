const IO = require('koa-socket-2');

let io = null;

exports.initialize = (server) => {
  io = new IO();
  io.attach(server);
  io.on('connection', (ctx, data) => {
    console.debug(`A user connected with ${ctx.id}`);
    io.on('disconnect', () => {
      console.debug(`A user disconnected with ${ctx.id}`);
    });
  });
};

exports.io = () => io;
