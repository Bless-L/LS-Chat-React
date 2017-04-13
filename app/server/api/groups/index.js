import express from 'express';
import * as controller from './group.controller.js';

const router = express.Router();

router.get('/getGroupsInfo', controller.getGroupsInfo);
router.post('/addGroup', controller.addGroupsByUser);

export default router