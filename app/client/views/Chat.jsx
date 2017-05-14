import React, { Component } from 'react'

import ChatFriend from '../components/Chat/ChatFriend'
import MsgBox from '../components/Chat/MsgBox'

export default class Chat extends Component {
	constructor(props) {
    super(props)

    this.state = {
    	userInfo: {},
    	groupsInfo: [],
    	toUser: {},
      msgs: []
    }
    socket.emit('join', localStorage.username)
    this.allMsgs = {}
  }

  componentWillMount() {
    socket.on('pmsg', (msg, from) => {
      const msgItem = {
        type: 1,
        msg: msg
      }
      this.allMsgs[from].push(msgItem)
      if (from === this.state.toUser.username) {
        this.setState({
          msgs: this.allMsgs[from]
        })
      }
    })

    socket.on('selfMsg', (msg) => {
      const msgItem = {
        type: 2,
        msg: msg
      }
      const msgs =  this.allMsgs[this.state.toUser.username]
      msgs.push(msgItem)

      this.setState({
        msgs,
      })
    })

  	this._getUserInfo()
  }

	_getUserInfo () {
    const username = localStorage.username
    fetch(`/user/getUserInfo/${username}`, {credentials: 'include'}).then((res) => {return res.json()})
    .then((res) => {
      if (res.code !== 1) return
      const friends = res.data.friends
      friends.forEach((f) => {
        this.allMsgs[f.username] = []
      })
      this.setState({
        userInfo: res.data,
        toUser: friends[0]
      })
    })
  }
  
  changeUser(user) {
  	this.setState({
  		toUser: user,
      msgs: this.allMsgs[user.username]
  	})
  }

  render () {
    return (
      <div className="wrap">
      	<ChatFriend 
      		userInfo={this.state.userInfo} 
      		changeUser={this.changeUser.bind(this)} 
      		toUser={this.state.toUser}
        />
        <MsgBox 
          toUser={this.state.toUser} 
          userInfo={this.state.userInfo}
          msgs={this.state.msgs}
        />
      </div>
    )
  }
}