import React, { Component } from 'react';
import scss from './login.scss';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            unLogin: true,
            msg: ''
        }
    }

    componentWillMount(){
        socket.on('login_cb',(type) =>{
            if (type === 'success') {
                this.setState({unLogin: false});
            }else if (type === 'fail') {
                this.setState({
                    msg: `这个昵称已经有人使用过了，请换一个`,
                    name: '',
                });
                document.getElementById('name').focus();
            }
        })
    }

    handleChange(e){
        this.setState({name: e.target.value});
    }

    save() {
        if (!this.state.name.trim()) {return};
        socket.emit('login', this.state.name);
    }

    render() {
        const showStyle = {
            display: this.state.unLogin ? 'block' : 'none',
        }
        return (
            <div className="login_wp" style={showStyle}>
                <div className="login">
                    <p>你的名字是：</p>
                    <div className="login_input">
                        <input type="text" onChange={this.handleChange.bind(this)} id="name" value={this.state.name} />
                        <button onClick={this.save.bind(this)}>确定</button>
                    </div>
                    <p>{this.state.msg}</p>
                </div>
                <div className="login_shade"></div>
            </div>
        )
    }
}