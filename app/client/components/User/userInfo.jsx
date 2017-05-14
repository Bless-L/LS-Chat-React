import React, { Component } from 'react'

export default class userInfo extends Component {
	constructor(props) {
    super(props);

    this.state = {
      infoEdit: false,
    }
  }

  render () {
    return (
    	<div style={{position: 'relative'}}>
		    <div className="tab-btn">
					<button className="page-close">X</button>
				</div>
				<div className="self-show">
							<img src="../../assets/touxiang1.jpg" id="selfShow" 
								onClick={()=> this.setState({infoEdit: true}) }/>
							<p className="name">{this.props.userInfo.nickName || '用户昵称'}</p>
							<p className="signature">{this.props.userInfo.signature || '心若琉璃，易碎难留。'}</p>
				</div>
				<form action="" className="form-search">
						<input type="text" className="_search" placeholder="搜索" style={{outline: 'none'}} />
						<input type="submit"  value="" className="_sub" style={{outline: 'none'}}/>
				</form>
				<div className="touxiangmessage_edit" id="touxiangmessage_edit" style={{display: this.state.infoEdit ? 'block' : 'none'}}>
					<div className="touxiangmessage_edit_close">
						<button className="touxiang_page-close" id="touxiang_page-close" onClick={()=> this.setState({infoEdit: false}) }>X</button>
					</div>
					<div className="touxiangmessagecont">
						<div className="touxiang_box">
							<label> <strong>昵称：</strong></label>
							<input type="text" className="touxaing_niname"  id="touxaing_niname" name="touxaing_niname"/>
						</div>
						<div className="touxiang_box">
							<label> <strong>性别：</strong></label>
							<select id="touxiang_dender">
								<option value="1">男</option>
								<option value="2">女</option>
							</select>
						</div>
						<div className="touxiang_box">
							<label>
								<strong>所在地：</strong>
							</label>
							<input type="text" className="touxiang_city"  id="touxiang_city" name="touxiang_city"/>
						</div>

						<div className="touxiang_box">
							<label>
								<strong>年龄：</strong>
							</label>
							<input type="number" className="touxiang_age"  id="touxiang_age" name="touxiang_age"/>
						</div>

						<div className="touxiang_box">
							<label>
								<strong>个性签名：</strong>
							</label>
							<input type="text" className="touxiang_person_write"  id="touxiang_person_write" name="touxiang_person_write"/>
						</div>

						<div className="touxiang_cotrol_retain" style={{marginTop: '6px'}}>
							<input type="submit" onClick={(e) => {
									this.props.editInfo()
									this.setState({infoEdit: false})
								}} value="保留" id="retain" style={{border: 'none', fontFamily:'Cursive',marginRight: '5px'}} />
							<input type="submit" onClick={()=> this.setState({infoEdit: false}) } 
									value="取消" id="messtouxiang_age_cansel" style={{border: 'none', fontFamily:'Cursive'}}/>
						</div>
					</div>
				</div>
			</div>
    )
  }
}