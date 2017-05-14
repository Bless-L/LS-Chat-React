import express from 'express';
import * as controller from './user.controller.js';

const router = express.Router();

router.post('/register', controller.loginUser);
router.get('/getUserInfo/:username', controller.getUserByUsername);
router.post('/editUserInfo', controller.editUserInfo);
router.post('/addFriend', controller.addFriend);

export default router