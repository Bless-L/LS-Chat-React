import User from './user.model';

export function loginUser (req, res) {
  const username = req.body.username
  const password = req.body.password
  User.findOne({username: username}).exec((err, user) => {
    if (!user) {
      const newUser = new User({
          username,
          password
        })
      newUser.save((err, user) => {
        if (err) {
          res.send({code: err.code, error: err})
        } else {
          delete user.password
          req.session.user = user
          res.send({code: 1, msg: '注册成功', data: user})
        }
      })
    } else {
      if (password !== user.password) {
        res.send({code: -1, msg: '密码错误'})
      } else {
        delete user.password
        req.session.user = user
        res.send({code: 1, msg: '登录成功', data: user})
      }
    }
  })
}

export function getUserByUsername (req, res) {
  const username = req.params.username
  User.findOne({username: username}, {password: 0}).populate('friends groups').exec((err, user) => {
    if (!user) {
      res.send({code: -1, msg: '没有找到该用户'})
    } else {
      res.send({code: 1, msg: '查找成功', data: user})
    }
  })
}

export function editUserInfo(req, res) {
  const username = req.session.user.username
  const updateInfo = req.body.info
  const userPromise = User.findOneAndUpdate({username: username}, updateInfo, {new: true})
  userPromise.then((user) => {
    res.send({code: 1, msg: '修改成功', data: user})
  }).catch((err) => {
    res.send({code: err.code, error: err})
  })
}

export function addFriend(req, res) {
  const username = req.session.user.username
  const friendName = req.body.friendName
  const data = {}

  const userPromise = User.findOne({username: username}).exec()
  userPromise.then((user) => {
    data.friendsArr = user.friends;
    return User.findOne({username: friendName}).exec()
  }).then((friend) => {
    const _id = friend._id
    if( data.friendsArr.indexOf(_id) > -1){
      res.send({code: 10002, msg: '你已添加该用户'})
      return
    }else {
      data.friendsArr.push(_id)
      return User.findOneAndUpdate({username: username}, { friends: data.friendsArr }, {new: true}).exec()
    }
  }).then((user) => {
    res.send({code: 1, msg: '添加成功'})
  }).catch((err) => {
    res.send({code: 10001, msg: '没有找到该用户'})
  })
}

function addUser (user) {
  const newUser = new User({
    username: user.username,
    password: user.password
  })
  newUser.save((err, user) => {
    if (err) {
      return {
        msg: "出现错误",
        code: err.code,
        err: err
      }
    } else {
      return {
        code: 1, 
        msg: '注册成功', 
        user: user
      }
    }
  })
}