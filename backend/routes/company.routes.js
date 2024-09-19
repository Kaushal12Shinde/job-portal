import express from 'express'
import { registerCompany, getCompanies, getCompanyById, updateCompany  } from '../controller/company.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompanies);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").post(isAuthenticated,updateCompany);


export default router; 