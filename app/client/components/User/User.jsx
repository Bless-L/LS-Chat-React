import React, {
  Component
} from 'react';

import scss from './User.scss';


export default class Chat extends Component {
  constructor(props) {
    super(props);
  }
  //绑定好接收信息事件
  componentWillMount() {

  }

  render() {
    return (
      <div className="user">
        <div className="user_name">{this.props.username}</div>
        <div className="user_freinds"></div>
        <div className="user_groups"></div>
      </div>
    )
  }
}