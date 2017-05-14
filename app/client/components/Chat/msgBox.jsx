import React, {Component} from 'react';

export default class msgBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  msgChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  clearText() {
    this.setState({
      text: ''
    });
  }

  sendMsg() {
    const from = this.props.userInfo.username
    const to = this.props.toUser.username

    socket.emit('private_message', from, to, this.state.text)
    this.clearText()
  }

  render() {
    const msgs = this.props.msgs || []
    const msgsDom = msgs.map((msg, i) =>{
      return (
        <p className="clearFix" key={i}>
          <span className={'msg ' + (msg.type === 2 ? 'msg_right': 'msg_left')}>{msg.msg}</span>
        </p>
      )
    })
    return (
      <div className="box2">
        <div className="he">
          <h4 className="chat-title">{this.props.toUser.nickName}</h4>
        </div>
        <div className="scroll-wrap">
          <div className="scroll-cont">
            {msgsDom}
          </div>
          <div className="scroll-bar"></div>
          <div className="scroll-slider"></div>
        </div>
        <div className="fo">
          <div className="tabicon">
            <ul  className="icon">
            <li  className="wenzi"></li>
            <li  className="biaoqing"> </li>
            <li  className="liwu"> </li>
            </ul>
          </div>
          <div className="input_wp">
            <textarea placeholder="输入内容"  cols="50" rows="5" id="message"
              value={this.state.text}
              onChange={this.msgChange.bind(this)}
            ></textarea>
            <button type="button" className="btn" id="close" 
              onClick={this.clearText.bind(this)}
            >关闭</button>
            <button type="button" className="btn" id="send-btn"
              onClick={this.sendMsg.bind(this)}
            >发送</button>
          </div>
        </div>
      </div>
    )
  }
}