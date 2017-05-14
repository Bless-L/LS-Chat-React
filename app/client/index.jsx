import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Link, HashRouter as Router } from 'react-router-dom'

import Style from './style/style.js';
import Home from './views/Home';
import Login from './views/Login';
import User from './views/User';
import Chat from './views/Chat';

//初始化一个全局socket
window.socket = io.connect();

render(
  <Router>
    <div>
      <Route exact path="/home" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/user" component={User}/>
      <Route path="/chat" component={Chat}/>
    </div>
  </Router>,
	document.querySelector("#app")
);