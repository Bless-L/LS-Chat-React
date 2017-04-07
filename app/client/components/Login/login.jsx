import React, {
  Component
} from 'react';
import scss from './login.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      unLogin: true,
      msg: ''
    }
  }

  componentWillMount() {
    socket.on('login_cb', (type) => {
      if (type === 'success') {
        this.setState({
          unLogin: false
        });
      } else if (type === 'fail') {
        this.setState({
          msg: `这个昵称已经有人使用过了，请换一个`,
          name: '',
        });
        document.getElementById('name').focus();
      }
    })
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handlePswChange (e) {
    this.setState({
      password: e.target.value
    });
  }

  save() {
    if (!this.state.name.trim()) {
      return
    };
    fetch('/user/register', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.name,
        password: this.state.password,
      })
    })
    .then((res) => {return res.json()})
    .then((res) => {
      if (res.code === 1) {
        const user = res.user
        localStorage.username = user.username
        this.props.history.push('/')
      } else {
        alert(res.msg)
      }
    })
    .catch((err) => {})
  }

  render() {
    const showStyle = {
      display: this.state.unLogin ? 'block' : 'none',
    }
    return (
      <div className="login_wp" style={showStyle}>
        <div className="login">
          <p>请登录聊天室：</p>
          <div className="login_input">
            <label htmlFor="username">昵称：
            <input type="text" onChange={this.handleNameChange.bind(this)} id="username" value={this.state.name} /></label>
          </div>
          <div className="password_input">
            <label htmlFor="password">密码：
            <input type="password" onChange={this.handlePswChange.bind(this)} id="password" value={this.state.password} /></label>
          </div>
          <button onClick={this.save.bind(this)}>确定</button>
          <p>{this.state.msg}</p>
        </div>
        <div className="login_shade"></div>
      </div>
    )
  }
}