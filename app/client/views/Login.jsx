import React, { Component } from 'react'

import LoginSub from '../components/login/login'

export default class Login extends Component {
  render () {
    return (
      <div>
        <LoginSub {...this.props} />
      </div>
    )
  }
}