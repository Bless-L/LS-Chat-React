import express from 'express';
import * as controller from './user.controller.js';

const router = express.Router();

router.post('/register', controller.loginUser);

export default router