const express = require('express');
const path = require('path');
const app = express();

const usersArr = [];

server = require('http').createServer(app);

const io = require('socket.io').listen(server);

app.use('/', express.static(
	path.resolve(__dirname, './app/client')
));
app.use('/dist', express.static(
	path.resolve(__dirname, './dist')
));

app.use('/static', express.static(
	path.resolve(__dirname, './static')
));

server.listen(8081, (error) => {
	if (error) {
		throw error
	};
	console.log('Server is running at localhost:8081');
});

io.on('connection', (socket) => {

	//用户登录
	socket.on('login', (nickname) => {
		if (usersArr.indexOf(nickname) > -1) {
			socket.emit('login_cb', 'fail');
		} else {
			socket.userIndex = usersArr.length;
			socket.nickname = nickname;
			usersArr.push(nickname);

			socket.emit('login_cb', 'success');

			const data = {
				nickname,
				len: usersArr.length,
				type: 'loginIn',
			};
			io.sockets.emit('system', data);
		}
	});

	//用户离开
	socket.on('disconnect', () => {
		if (!socket.nickname) return;
		//将断开连接的用户从users中删除
		usersArr.splice(socket.userIndex, 1);

		//通知除自己以外的所有人
		const data = {
			nickname: socket.nickname,
			len: usersArr.length,
			type: 'loginOut',
		};
		socket.broadcast.emit('system', data);
	});

	//发送信息
	socket.on('sendMsg', (content, type) => {
		const data = {
			type: (type || 'text'),
			content,
			nickname: socket.nickname,
		};
		io.sockets.emit('newMsg', data);
	});
})