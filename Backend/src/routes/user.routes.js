import express from 'express';
import { userRegister, userLogin, userLogout } from '../controllers/user.controllers.js';

const router  = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', userLogout)
// router.get('/profile', userProfile);

export default router;