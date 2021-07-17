/*
const dotenv = require('dotenv').config({
	path: 'variables.env'
});

const Koa = require('koa');
const app = new Koa();

const logger = require('koa-logger');
if (process.env.NODE_ENV !== 'test') {
	app.use(logger());
}

const bodyParser = require('koa-body');
app.use(bodyParser());

const path = require('path');
const serve = require('koa-static');
app.use(serve(path.join(__dirname, '../public')));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
	console.log(`I am server and my port is ${port}`);
});

require('./io').initialize(server);
const global_socket = require('./io').io();

const heartbeat = () => {
	const pulse = Math.ceil(Math.random() * (160 - 60) + 60);
	return pulse;
};

setInterval(() => {
	global_socket.emit('PULSE', heartbeat());
}, 3000);

module.exports = app;
*/

const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
app.use(logger());

const bodyParser = require('koa-body');
app.use(bodyParser());

app.use(async ctx => {
	// console.log(Object.keys(ctx));
	ctx.body = 'hey you'
});

require('./io').initialize(app);
const global_socket = require('./io').io();
console.log(Object.keys(global_socket));
app.listen(3001, () => {
	console.log('server has started...');
});

const heartbeat = () => {
	const pulse = Math.ceil(Math.random() * (160 - 60) + 60);
	return pulse;
};

setInterval(() => {
	// console.log(Object.keys(io));
	global_socket.socket.emit('PULSE', heartbeat());
}, 3000);

module.exports = app;
