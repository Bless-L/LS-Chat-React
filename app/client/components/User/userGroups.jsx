import React, { Component } from 'react'

export default class UserTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGroup: {
        creator: {}
      },
      showGroupsDetail: false,
      groupEdit: false,
      detailTop: 0
    }
  }

  render () {
    const groups = this.props.groupsInfo || []
    const groupsDom = groups.map((group) => {
      return (
          <li className="member" 
            onMouseOver={(e) => {
              console.log(group)
              this.setState({
                currentGroup: group,
                showGroupsDetail: true,
                detailTop: e.currentTarget.offsetTop 
              })
            }}
            onMouseOut={() => {
              this.setState({
                showGroupsDetail: false,
              })
            }}
            key={group._id}
          >
            <img src="../../assets/touxiang2.jpg"/>
            <div className="shuoming"> <b>{group.name}</b>
              <br/>
              {group.info}
            </div>
          </li>
        )
    })
    return (
      <div className="groups_main">
        <div className="message-list" id="messageList">
         <ul>
            {groupsDom}
            <li className="member">
              <img src="../../assets/touxiang3.jpg"/>
              <div className="shuoming"><b>党支部</b><br/>华华：三只松鼠。</div>
            </li>
            <li className="member">
              <img src="../../assets/touxiang2.jpg"/>
              <div className="shuoming"><b>科技部</b><br/>青城：我叫林城青。</div>
            </li>
          </ul>
        </div>
        <div style={{marginLeft: '60px', marginTop: '15px'}}>
         <label>发起多人聊天</label>
         <button className="add-someone" id="group_set_btn" onClick={() => {
            this.setState({groupEdit: true})
         }}>+</button>
        </div>
        <div className="group-set" id="group-set" style={{
            display: this.state.groupEdit ? 'block' : 'none',
          }}>
          <div style={{height:'21px',width:'100%'}}>
            <button className="touxiang_page-close" id="touxiang_page-close" onClick={()=> this.setState({groupEdit: false})}>X</button>
          </div>
          <div className="group_cont">
            <div className="group_cont_div"><label><strong>群名：</strong></label><input type="text" className="group_name"  id="group_name" name="group_name"/>
            </div>
            <div className="group_cont_div">
            <label><strong>群人数：</strong></label><input type="text" className="group_number"  id="group_number" name="group_number"/>
            </div>
            <div className="groupset_time">
            <label><strong>建群时间：</strong>{new Date().toLocaleString()}</label>
            </div>
              
            <div className="group_owner">
            <label><strong>群主：</strong>{this.props.userInfo.nickName}</label>
            </div>
            <div className="group_cont_div">
              <label><strong>群介绍：</strong></label><input type="text" className="group_tag"  id="group_tag" name="group_tag"/>
            </div>
            <div className="grouptip_cotrol_retain">
              <input type="submit" onClick={(e) => {
                  this.props.addGroup()
                  this.setState({groupEdit: false})
                }} value="保留" id="retain" style={{border: 'none', fontFamily:'Cursive',marginRight: '5px'}} />
              <input type="submit" onClick={()=> this.setState({groupEdit: false}) } 
                  value="取消" id="messtouxiang_age_cansel" style={{border: 'none', fontFamily:'Cursive'}}/>
            </div>
          </div>
        </div>
        <div className="group_edit" id="group_edit" style={{
            display: this.state.showGroupsDetail ? 'block' : 'none',
            top: this.state.detailTop
          }}>
          <div className="group_edit_cont">
            <div className="group_editname">
              <label><strong>群名：</strong>{this.state.currentGroup.name}</label>
            </div>
            <div className="group_editnumber">
              <label><strong>群人数：</strong>{this.state.currentGroup.maxPeople}</label>
            </div>
            <div className="groupset_edittime">
              <label><strong>建群时间：</strong>{this.state.currentGroup.creatTime}</label>
            </div>
            <div className="group_editowner">
              <label><strong>群主：</strong>{this.state.currentGroup.creator.nickName}</label>
            </div>
            <div className="group_edittag">
             <label><strong>群介绍：</strong></label>{this.state.currentGroup.info}</div>
          </div>
        </div>
      </div>
    )
  }
}