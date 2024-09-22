import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";

const router = express.Router();

router.route('/apply/:id').get(isAuthenticated , applyJob);
router.route('/getAppliedJobs').get(isAuthenticated , getAppliedJobs);
router.route('/:id/getApplicants').get(isAuthenticated, getApplicants);
router.route('/status/:id/update').post(isAuthenticated, updateStatus);