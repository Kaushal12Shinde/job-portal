import express from 'express'
import { login, register, updateProfile } from '../controller/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update/profle").post(isAuthenticated,updateProfile);

export default router; 