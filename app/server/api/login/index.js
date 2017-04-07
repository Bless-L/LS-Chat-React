import express from 'express';

import User from '../user/user.model'

const router = express.Router();

router.post('/isLogin', (req, res) => {
  const user = req.session.user
  if (user && user.username) {
    res.send({code: 0, isLogin: true, user: user})
  } else {
    res.send({code: -1, isLogin: false})
  }
});

export default router