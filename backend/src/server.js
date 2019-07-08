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

const io = require('./io').initialize(server);
const global_socket = require('./io').io();
// console.log(global_socket)

const heartbeat = () => {
	const pulse = Math.ceil(Math.random() * (160 - 60) + 60);
	return pulse;
};

setInterval(() => {
	global_socket.emit('PULSE', heartbeat());
}, 200);

module.exports = app;
