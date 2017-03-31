import React, {
  Component
} from 'react';
import scss from './expBox.scss';

export default class ExpBox extends Component {
  constructor(props) {
      super(props);
      this.state = {
        imgs: [],
        nums: 29,
        path: '/static/img/',
      }
    }
    //初始化数据
  componentWillMount() {
    let imgs = Array.from({
      length: 29
    });
    imgs = imgs.map((imgName, idx) => {
      if (idx >= 24) {
        return `${idx}.png`;
      } else {
        let str = `0${idx}`.slice(-2);
        return `${str}.gif`;
      }
    })
    this.setState({imgs})
  }

  render() {

    return (
      <div className="exp_box">
        {
          this.state.imgs.map((imgName,idx) => {
            return <img key={idx} src={this.state.path + imgName} alt={idx} onClick={this.props.addEmoji.bind(null, `0${idx}`.slice(-2))}/>
          })
        }
      </div>
    )
  }
}