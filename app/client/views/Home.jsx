import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { loginAuth } from '../utils'
import Chat from '../components/chat/chat';
import History from '../components/history/history';
import User from '../components/User/User';

export default class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };
  }

  componentWillMount() {
    
  }

  render () {
    const islogin = loginAuth()

    return islogin ? (
      <div className="home">
        <History />
        <User />
        <Chat />
      </div>
    ) : (
      <Redirect to={{pathname: '/login'}}/>
    )
  }
}