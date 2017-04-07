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
      userInfo: {},
      groupsInfo: []
    };
  }

  componentWillMount() {
    this.islogin = loginAuth()
    if(this.islogin) {
      const username = localStorage.username
      fetch(`'/user/getUserInfo/${username}'`).then((res) => {return res.json()})
      .then((res) => {
        this.setState({
          userInfo: res
        })
      })
      fetch(`'/groups/getGroupsInfo`).then((res) => {return res.json()})
      .then((res) => {
        this.setState({
          groupsInfo: res
        })
      })
    }
  }

  render () {
    return this.islogin ? (
      <div>
        <History />
        <User userInfo={this.state.userInfo} groupsInfo={this.state.groupsInfo}/>
        <Chat />
      </div>
    ) : (
      <Redirect to={{pathname: '/login'}}/>
    )
  }
}