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
        const user = res.data
        localStorage.username = user.username
        this.props.history.push('/user')
      } else {
        alert(res.msg)
      }
    })
    .catch((err) => {})
  }

  render() {
    return (
      <section id="login-window">
        <div id="self-head">
          <div className="self-img">
            <img src="../../assets/touxiang1.jpg" />
          </div>
        </div>
        <div id="textshuru">
          <div className="wrap1"> 
            <i className="icon1"></i>
            <input type="text" className="username" 
              onChange={this.handleNameChange.bind(this)} 
              value={this.state.name} 
              name="username" />
          </div>
          <div className="wrap2"> 
            <i className="icon2"></i>
            <input type="password" className="password" 
              onChange={this.handlePswChange.bind(this)}  
              value={this.state.password} 
              name="password" />
          </div>
        </div>

        <div className="delu1">
          <input type="submit" name="submit" value="Sign" className="delu"
            onClick={this.save.bind(this)}/>
        </div>
      </section>
    )
  }
}