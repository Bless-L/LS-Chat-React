import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class UserFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      showUserDetail: false,
      detailTop: 0
    }
  }
  render () {
    const friends = this.props.userInfo.friends || []
    const groups = this.props.userInfo.groups || []

    const friendsDom = friends.map((friend) => {
      return (
        <Link to="/chat" key={friend._id}>
          <li className="member" 
            onMouseOver={(e) => {
              this.setState({
                currentUser:friend,
                showUserDetail: true,
                detailTop: e.currentTarget.offsetTop 
              })
            }}
            onMouseOut={() => {
              this.setState({
                showUserDetail: false,
              })
            }}
          >
            <img src="../../assets/touxiang1.jpg"/>
            <div className="shuoming"> <b>{friend.nickName}</b>
              <br/>
              {friend.signature}
            </div>
          </li>
        </Link>
        )
    })
    return (
      <div>
        <div className="message-list" id="messageList">
          <ul>
            {friendsDom}
          </ul>
        </div>
        <div style={{paddingLeft: '10px'}}>
          <input type="text" className="shuru"  id="friend" name="friend"/>
          <button className="add-someone" onClick={this.props.addFirend}>加好友</button>
        </div>
        <div className="message_show_edit" style={{
            display: this.state.showUserDetail ? 'block' : 'none',
            top: this.state.detailTop
          }}>
          <div className="messagecont">
            <span className="niname">
              <strong>昵称：</strong>
              {this.state.currentUser.nickName}
            </span>
            <span className="dender">
              <strong>性别：</strong>
              {this.state.currentUser.sex === 1 ? '男' : '女'}
            </span>
            <span className="city">
              <strong>所在地：</strong>
              {this.state.currentUser.address}
            </span>
            <span className="age">
              <strong>年龄：</strong>
              {this.state.currentUser.age}
            </span>
            <span className="person-write">
              <strong>个性签名：</strong>
              {this.state.currentUser.signature}
            </span>
          </div>
        </div>
      </div>
    )
  }
}