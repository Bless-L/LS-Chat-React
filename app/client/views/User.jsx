import React, { Component } from 'react'

import UserInfo from '../components/User/userInfo'
import UserFriends from '../components/User/UserFriends'
import UserGroups from '../components/User/userGroups'

import { loginAuth } from '../utils'

export default class User extends Component {
  constructor(props) {
  super(props);
    this.state = {
      tabType: 1,
      userInfo: {},
      groupsInfo: []
    }
  }

  componentWillMount() {
    this.islogin = loginAuth()
    if(this.islogin) {
      this._getUserInfo()
      this._getGroupsInfo()
    }
  }

  _getUserInfo () {
    const username = localStorage.username
    fetch(`/user/getUserInfo/${username}`, {credentials: 'include'}).then((res) => {return res.json()})
    .then((res) => {
      if (res.code !== 1) return
      this.setState({
        userInfo: res.data
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

  addGroup() {
    const info = {
      groupName: document.getElementById('group_name').value,
      maxPeople: document.getElementById('group_number').value,
      info: document.getElementById('group_tag').value,
    }
    const groupInfo = {}
    for (let key in info) {
      if(info[key]) {
        groupInfo[key] = info[key]
      }
    }
    fetch('/groups/addGroup', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        groupInfo,
      })
    })
    .then((res) => { return res.json() })
    .then((res) => {
      if(res.code === 1) {
        this._getGroupsInfo()
      } else {
        alert('新建失败')
      }
    })
  }

  addFirend () {
    const friendName = document.getElementById('friend').value
    if(!friendName) return
    fetch('/user/addFriend', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        friendName
      })
    })
    .then((res) => {return res.json()})
    .then((res) => {
      if (res.code === 1) {
        this._getUserInfo()
      }
      alert(res.msg)
    })
    .catch((err) => {})
  }

  editInfo () {
    const info = {
      nickName: document.getElementById('touxaing_niname').value,
      sex: document.getElementById('touxiang_dender').value,
      age: document.getElementById('touxiang_age').value,
      address: document.getElementById('touxiang_city').value,
      signature: document.getElementById('touxiang_person_write').value,
    }
    const userInfo = {}
    for (let key in info) {
      if(info[key]) {
        userInfo[key] = info[key]
      }
    }
    fetch('/user/editUserInfo', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        info: userInfo
      })
    })
    .then((res) => {return res.json()})
    .then((res) => {
      if (res.code === 1) {
        const newInfo = res.data
        this.setState({
          userInfo: newInfo
        })
      } else {
        alert(res.msg)
      }
    })
    .catch((err) => {})
  }

  render () {

    return (
    	<div className="friend_user">
	    	<div className="list-all"> 
	      	<UserInfo userInfo={this.state.userInfo} editInfo={this.editInfo.bind(this)}/>
          <div className="tab-list">
            <ul  className="three-group">
              <li className="message"></li>
              <li className={'friend ' + (this.state.tabType === 1 ? 'tab_bottom' : '')} onClick={() => {
                this.setState({
                  tabType: 1
                })
              }}></li>
              <li className={'group ' + (this.state.tabType === 2 ? 'tab_bottom' : '')} onClick={() => {
                this.setState({
                  tabType: 2
                })
              }}></li>
            </ul>
          </div>
          {
            this.state.tabType === 1 ? 
            <UserFriends userInfo={this.state.userInfo} addFirend={this.addFirend.bind(this)}/> : 
            <UserGroups 
              userInfo={this.state.userInfo} 
              groupsInfo={this.state.groupsInfo}
              addGroup={this.addGroup.bind(this)}
            />
          }
	      </div>
      </div>
    )
  }
}