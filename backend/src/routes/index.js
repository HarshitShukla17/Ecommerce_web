import express from 'express';
import { userSignupController } from '../controllers/userSingnup.js';


const router = express.Router();

router.post('/signup', userSignupController);

export {router};