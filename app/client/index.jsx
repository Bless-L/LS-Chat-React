import React, { Component } from 'react';
import { render } from 'react-dom';
import Chat from './components/chat/chat';
import Login from './components/login/login';
import History from './components/history/history';

//初始化一个全局socket
window.socket = io.connect();

render(
    <div>
        <History />
        <Login />
        <Chat />
    </div>, 
	document.querySelector("#app")
);