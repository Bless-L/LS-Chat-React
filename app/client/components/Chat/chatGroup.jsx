import React, {Component} from 'react';

export default class chatFriend extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const friends = this.props.userInfo.friends || []
    const friendsDom = friends.map((friend) => {
      return (
          <li className="opened_message_li" onClick={() => {
            this.props.changeUser(friend)
          }}>
            <img src="../../assets/touxiang3.jpg" />
            <span >{friend.nickName}</span>
          </li>
        )
    })

    return (
      <div className="box1">
        <div className="self-info" id="chat_selfShow">
          <img id="self-picture" src="../../assets/touxiang.jpg"/>
          <span>文文</span>
          <img id="add_friend" src="../../assets/add-friend.png"/>
        </div>
        <div className="form-search">
          <input type="text" className="_search" />
          <input type="submit"  value="" className="_sub" />
        </div>
        <div className="opened_message">
          <ul>
            {friendsDom}
            <li className="opened_message_li">
              <img src="../../assets/touxiang3.jpg" />
              <span >monika</span>
            </li>
            <li className="opened_message_li">
              <img src="../../assets/touxiang2.jpg" />
              <span >lucky</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}