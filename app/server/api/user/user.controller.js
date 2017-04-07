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
          res.send({code: 1, msg: '注册成功', user: user})
        }
      })
    } else {
      if (password !== user.password) {
        res.send({code: -1, msg: '密码错误'})
      } else {
        delete user.password
        req.session.user = user
        res.send({code: 1, msg: '登录成功', user: user})
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
      res.send({code: 1, msg: '查找成功', user: user})
    }
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