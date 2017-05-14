import express from 'express';
import path from 'path';
import http from 'http';
import webSocket from 'socket.io';
import mongoose from 'mongoose'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import webpackConfig from '../../webpack.config.js'
import app from './router'
import config from './config'

import { sendPrivateMsg } from './webSocket'

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {publicPath: "/dist" }))
const server = http.createServer(app);
const io = webSocket.listen(server);

global.allSocket = [];
global.allGroup = {};

mongoose.Promise = global.Promise
mongoose.connect(config.database)

io.on('connection', (socket) => {

	socket.on('join', function (userName){  
    allSocket[userName] = socket 
  })

	const groupUser

	socket.on('joinGroup', (userId, username, groupName) => {
		if (!allGroup[groupName]) {
      allGroup[groupName] = [];
    }
    allGroup[groupName].push(userId)
    groupUser = username
    socket.join(groupName)
    // 通知房间内人员
    socket.broadcast.in(groupName).emit('sys', 
    	username + '加入了聊天室,共' + allGroup[groupName].length +'人' );
    console.log(username + '加入了' + groupName);
	})

	//发送信息
	socket.on('group_message', (content, groupName) => {
    io.to(groupName).emit('gmsg', groupUser, content);
	});

	socket.on('private_message', sendPrivateMsg)
})

server.listen(8081, (error) => {
	if (error) {
		throw error
	};
	console.log('Server is running at localhost:8081');
});