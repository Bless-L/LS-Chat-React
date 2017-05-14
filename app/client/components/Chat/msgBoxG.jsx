import React, {Component} from 'react';

export default class msgBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="box2">
        <div className="he">
          <h4 className="chat-title">{this.props.toUser.nickName}</h4>
        </div>
        <div className="scroll-wrap">
              <div className="scroll-cont">
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
            <textarea placeholder="输入内容"  cols="50" rows="5" id="message"></textarea>
            <button type="button" className="btn" id="close">关闭</button>
            <button type="button" className="btn" id="send-btn">发送</button>
          </div>
        </div>
      </div>
    )
  }
}