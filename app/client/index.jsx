import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Link, HashRouter as Router } from 'react-router-dom'

import Home from './views/Home';
import Login from './views/Login';


//初始化一个全局socket
window.socket = io.connect();

render(
  <Router>
    <div>
      <Route exact path="/home" component={Home}/>
      <Route path="/login" component={Login}/>
    </div>
  </Router>,
	document.querySelector("#app")
);