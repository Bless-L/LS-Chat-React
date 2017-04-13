import React, {
  Component
} from 'react';

import scss from './User.scss';

import { loginAuth } from '../../utils'

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
      userInfo: {},
      groupsInfo: []
    }
  }
  //绑定好接收信息事件
  componentWillMount() {
    this.islogin = loginAuth()
    if(this.islogin) {
      this._getUserInfo()
      this._getGroupsInfo()
    }
  }

  handleName (e) {
    this.setState({
      name: e.target.value
    });
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
    if(!this.state.name) return
    fetch('/groups/addGroup', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        groupName: this.state.name,
      })
    })
    .then((res) => { return res.json() })
    .then((res) => {
      if(res.code === 1) {
        alert('新建成功')
        this._getGroupsInfo()
      } else {
        alert('新建失败')
      }
    })
  }

  render() {
    const groups = this.state.groupsInfo.map((group) => {
      return (
          <p key={group._id}>{group.name}</p>
        )
    })
    return (
      <div className="user">
        <div className="user_name">{this.state.userInfo.username}</div>
        <div className="user_add_group"><input onChange={this.handleName.bind(this)} type="text"/><span onClick={this.addGroup.bind(this)}>+新建聊天室</span></div>
        <div className="user_freinds"></div>
        <div className="user_groups">{groups}</div>
      </div>
    )
  }
}