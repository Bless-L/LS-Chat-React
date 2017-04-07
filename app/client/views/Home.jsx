import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { loginAuth } from '../utils'
import Chat from '../components/chat/chat';
import History from '../components/history/history';

export default class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render () {
    const islogin = loginAuth()
    return islogin ? (
      <div>
        <History />
        <Chat />
      </div>
    ) : (
      <Redirect to={{pathname: '/login'}}/>
    )
  }
}