import path from 'path';
import User from './user.model';

export function loginUser (req, res) {
/*  const reqUser = {
    username: req.body.username,
    password: req.body.password
  }
  const user = getUserByUsername(reqUser.username)
  if (user) {
    if (reqUser.password === user.password) {
      res.send({code: 0, msg: '登录成功', user: user})
    } else {
      res.send({code: -1, msg: '密码错误'})
    }
  } else {
    const result = addUser(reqUser)
    res.send(result)
  }*/
  const username = req.body.username
  const password = req.body.password
  User.findOne({username: username}, (err, user) => {
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
          res.session.user = user
          res.send({code: 0, msg: '注册成功', user: user})
        }
      })
    } else {
      if (password !== user.password) {
        res.send({code: -1, msg: '密码错误'})
      } else {
        delete user.password
        res.session.user = user
        res.send({code: 0, msg: '登录成功', user: user.delete(password)})
      }
      
    }
  })
}

function getUserByUsername (username) {
  User.findOne({username: username}, {password: 0}, (err, user) => {
    if (!user) {
      return null
    } else {
      return user
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
        code: 0, 
        msg: '注册成功', 
        user: user
      }
    }
  })
}