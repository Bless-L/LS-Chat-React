import express from 'express';
import * as controller from './group.controller.js';

const router = express.Router();

router.post('/register', controller.loginUser);

export default router