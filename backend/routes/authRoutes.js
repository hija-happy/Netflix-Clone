import express from 'express';
import { isAutenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();
//api endpoints
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp',userAuth, sendVerifyOtp);
authRouter.post('/verify-account',userAuth, verifyEmail);
authRouter.post('/is-auth',userAuth, isAutenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);




export default authRouter;

