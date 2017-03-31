import React, {
  Component
} from 'react';
import scss from './Msgs.scss';

export default class Msgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msgs: []
    }
  }
  //绑定好接收信息事件
  componentWillMount() {
    socket.on('newMsg', (data) => {
      this.disNewMsg(data.nickname, data.content, data.type);
    })
  }

  //存储所有信息
  disNewMsg(user, content, type) {
    const date = new Date().toTimeString().substr(0, 8);
    content = this.showEmoji(content)
    this.state.msgs.push({
      date,
      user,
      content,
      type,
    });
    this.setState({
      msgs: this.state.msgs,
    })
  }

  showEmoji(msg) {
    const reg = /\[emoji:\d+\]/g
    let result = msg
    let emojiIdx, match
    while (match = reg.exec(msg)) {
      emojiIdx = match[0].slice(7, -1)
      if (emojiIdx > 29) {
        result = result.replace(match[0], ' ~emoji~ ')
      } else if(emojiIdx >= 24) {
        result = result.replace(match[0], `<img class="emoji" src="/static/img/${emojiIdx}.png" >`)
      } else {
        result = result.replace(match[0], `<img class="emoji" src="/static/img/${emojiIdx}.gif" >`)
      }
    }
    return result
  }

  render() {

    return (
      <div className="msg_box">
        {   
          this.state.msgs.map((msg, index) =>{
              return <p key={index} className="msg_box_p"> {msg.user} <span className="msg_box_date">{msg.date}: </span>
                {msg.type === 'text' ? <span dangerouslySetInnerHTML={{__html: msg.content}}></span> : <img src={msg.content} alt="聊天图片"/>}
              </p>
          })
        }
      </div>
    )
  }
}