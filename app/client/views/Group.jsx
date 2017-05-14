import React, { Component } from 'react'

import ChatGroup from '../components/Chat/ChatGroup'
import MsgBoxG from '../components/Chat/MsgBoxG'

export default class Chat extends Component {
	constructor(props) {
    super(props)

    this.state = {
    	userInfo: {},
    	groupsInfo: [],
    	toUser: {}
    }
  }

  componentWillMount() {
  	this._getUserInfo()
    this._getGroupsInfo()
  }

	_getUserInfo () {
    const username = localStorage.username
    fetch(`/user/getUserInfo/${username}`, {credentials: 'include'}).then((res) => {return res.json()})
    .then((res) => {
      if (res.code !== 1) return
      this.setState({
        userInfo: res.data,
        toUser: res.data.firends[0]
      })
    })
  }
  
  _getGroupsInfo () {
    fetch(`/groups/getGroupsInfo`, {credentials: 'include'}).then((res) => {return res.json()})
    .then((res) => {
      if (res.code !== 1) return
      this.setState({
        groupsInfo: res.data
      })
    })
  }

  changeUser(user) {
  	this.setState({
  		toUser: user
  	})
  }

  render () {
    return (
      <div className="wrap">
      	<ChatGroup 
      		userInfo={this.state.userInfo} 
      		changeUser={this.state.changeUser.bind(this)} 
      		toUser={this.state.toUser}/>
        <MsgBoxG toUser={this.state.toUser} />
      </div>
    )
  }
}