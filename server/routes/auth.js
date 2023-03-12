import express from 'express';

const router = express.Router();
import { requireSignin, isAdmin } from '../middwares/auth.js';

//controllers
import { register, login, secret } from '../controllers/auth.js';
router.post('/register', register);
router.post('/login', login);

//testing
router.get('/secret', requireSignin, isAdmin, secret);


export default router;