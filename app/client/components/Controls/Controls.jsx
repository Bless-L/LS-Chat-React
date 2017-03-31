import React, {
  Component
} from 'react';

import scss from './Controls.scss';
import ExpBox from '../emoji/expBox';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  componentWillMount() {

  }

  //发送信息
  sendMsg() {
    if (!this.state.text.trim()) {
      return
    };
    socket.emit('sendMsg', this.state.text, 'text');
    this.setState({
      text: ''
    })
  }

  //发送图片
  sendImg(url) {
    if (!url) return;
    socket.emit('sendMsg', url, 'img');
  }
  
  //点击emoji表情
  addEmoji(emojiNum) {
    this.setState({
      text: this.state.text + `[emoji:${emojiNum}]`
    })
  }

  //清空对话框
  clearText() {
    this.setState({
      text: ''
    });
  }

  //文字框改变
  msgChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  //图片改变
  imgChange(e) {
    const _this = this;
    const file = e.target.files[0],
      reader = new FileReader();
    if (!reader) {
      socket.emit('sendMsg', "!your browser doesn't support fileReader");
      return;
    }
    reader.readAsDataURL(file);
    reader.onload = function() {
      const imgUrl = this.result;
      _this.sendImg(imgUrl);
    }
  }

  render() {

    return (
      <div className="controls">
        <ExpBox addEmoji={this.addEmoji.bind(this)}/>
        <div className="controls_btn">
          <input type="text"/>
          <input type="file" accept="image/*;capture=camera" name="img" onChange={this.imgChange.bind(this)}/>
          <input type="button" value="clear" onClick={this.clearText.bind(this)}/>
        </div>
        <textarea id="messageInput" placeholder="输入并发送" name="message" cols="30" rows="10" 
          value={this.state.text}
          onChange={this.msgChange.bind(this)}
        >
        </textarea>
        <input type="button" value="SEND" className="send_btn" id="sBtn" onClick={this.sendMsg.bind(this)} />
      </div>
    )
  }
}