import React, {
  Component
} from 'react';

import scss from './Chat.scss';

import Controls from '../Controls/Controls'
import Msgs from '../Msgs/Msgs'

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }
  //绑定好接收信息事件
  componentWillMount() {

  }

  render() {

    return (
      <div className="chat">
        <Msgs />
        <Controls />
      </div>
    )
  }
}