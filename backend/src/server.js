const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
app.use(logger());

const bodyParser = require('koa-body');
app.use(bodyParser());

app.use(async (ctx) => {
  ctx.body = 'hey you';
});

require('./io').initialize(app);
const global_socket = require('./io').io();

app.listen(3001, () => {
  console.log('server has started');
});

const heartbeat = () => Math.ceil(Math.random() * (160 - 60) + 60);

setInterval(() => {
  global_socket.socket.emit('PULSE', heartbeat());
}, 1000);

module.exports = app;
