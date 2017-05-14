import Group from './group.model';
import User from '../user/user.model';

export function getGroupsInfo (req, res) {
  Group.find().populate('creator').exec((err, groups) => {
    if (err) {
      res.send({code: err.code, error: err})
    } else {
      res.send({code: 1, data: groups})
    }
  })
}

export function addGroupsByUser (req, res) {
  if (!req.session.user) { 
    res.send({code: -1, msg: '用户未登录'}) 
    return
  }
  const name = req.body.groupInfo.groupName
  const info = req.body.groupInfo.info
  const maxPeople = req.body.groupInfo.maxPeople
  const creator = req.session.user.username
  const data = {} // 用来存放异步数据

  const userPromise = User.findOne({username: creator}).exec()
  userPromise.then((user) => {
    const newGroup = new Group({
      name,
      info,
      maxPeople,
      creator: user._id
    })
    data.user = user
    
    return newGroup.save()
  }).then((group) => {
    const groups = data.user.groups
    groups.push(group._id)
    data.group = group

    return User.updateOne({username: creator}, { groups })
  }).then((user) => {
    res.send({code: 1, msg: '新建聊天室成功', data: data.group})
  }).catch((err) => {
    res.send({code: err.code, error: err})
  })
}