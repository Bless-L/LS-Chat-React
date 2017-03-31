import React, { Component } from 'react';
import scss from './history.scss';

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            msgs: []
        }
    }

    componentWillMount() {
        socket.on('system', (data) =>{
            this.setState({num: data.len});
            let msg = '', msgs = this.state.msgs;

            if (data.type === 'loginIn') {
                msg = `${data.nickname} 进入了聊天室`;
            }else if (data.type === 'loginOut') {
                msg = `${data.nickname} 离开了聊天室`;
            }
            msg && msgs.push(msg);

            this.setState({msgs});
        })
    }

    render() {
        return (
            <div className="history">
                <p className="num">{this.state.num} 人在线</p>
                <div className="msgs_wp">
                    {
                        this.state.msgs.map((msg, index) =>{
                            return <p key={index}>{msg}</p>
                        })
                    }
                </div>
            </div>
        )
    }
}