import { Application } from "../models/application.models.js";
import { Job } from "../models/job.models.js";

export const applyJob = async (req, res) =>{
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message: "Job id is required",
                status:false,
            })
        }

        const existingApplication = await Application.findOne({job:jobId , applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                status:false,
            })
        }

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                status:false,
            })
        }

        const newApplication = await  Application.create({
            job:jobId,
            applicant:userId,
        })

        job.application.push(newApplication._id);
        await  job.save();
        return res.status(201).json({
            message: "Application submitted successfully",
            status:true,
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async  (req, res) =>{
    try {

        const userId = req.id;

        const appliedJobs = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            option:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                option:{sort:{createdAt:-1}},
            }
        });

        if(!appliedJobs){
            return res.status(404).json({
                message: "No jobs applied",
                status:false,
            })
        }

        return res.status(200).json({
            message:"List Application found successfully",
            status:true,
            appliedJobs,
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const getApplicants  = async (req, res) => {
    try{
        const jobId = req.params.id;
        const applicants = await Job.findById(jobId).populate({
            path:'application',
            option:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })

        if(!applicants){
            return res.status(404).json({
                message: "No applicants found",
                status:false,
            })
        }

        return res.status(200).json({
            message:"List of applicants found successfully",
            status:true,
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) =>{
    try{
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status){
            return res.status(400).json({
                message: "Status is required",
                status:false,
            })
        }

        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: "Application not found",
                status:false,
            })
        }

        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Application status updated successfully",
            status:true,
        })
    }
    catch (error) {
        console.log(error);
    }
}