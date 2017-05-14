import React, { Component } from 'react'

import LoginSub from '../components/login/login'

export default class Login extends Component {
  render () {
    return (
      <div className="login_box">
        <LoginSub {...this.props} />
      </div>
    )
  }
}