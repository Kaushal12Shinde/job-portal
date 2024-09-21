import { Job } from "../models/job.models.js";

// Recruters endpoint for posting job
export const postJob = async (req, res)=>{
    try {
        
        const { title, description, requierments, salary, location, jobType, experience, position, companyId } = req.body;

        const userId =  req.id;

        if(!title || !description || !requierments || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message: "Please fill all the fields",
                status: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requierments : requierments.split(","),
            salary : Number(salary),
            location,
            jobType,
            experience,
            position,
            company:companyId,
            created_by:userId,
        });

        return res.status(200).json({
            message: "Job posted successfully",
            job,
            status: true
        });
    }
    catch (error) {
        console.log(error);
    }
}

// student endpoint for applying for job
export const getAllJobs = async (req, res) =>{
    try {
        const keyword = req.query.keywords || '';

        const query = {
            $or:[
                {title:{$regex:keyword, $options:'i'}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        }

        const jobs = await Job.find(query).populate({
            path: 'company'
        }).sort({createdAt:-1});

        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                status: false
                });
        }

        return res.status(200).json({
            message: "Jobs found successfully",
            jobs,
            status: true
        });

    }
    catch(error){
        console.log(error);
    }
}

//student endpoint for getting job details
export const getJobById = async (req, res) =>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message: "Job not found",
                status: false
            });
        }

        return res.status(200).json({
            message: "Job found successfully",
            job,
            status: true
        });
        
    }
    catch(error){
        console.log(error);
    }
}

// Recruter endpoints to get all jobs posted by them
export const getAdminJobs = async (req, res) =>{
    try{
        const recruterId = req.id;
        const jobs = await Job.find({created_by:recruterId});

        if(!job){
            return res.status(404).json({
                message: "No jobs found",
                status: false
            });
        }

        return res.status(200).json({
            message: "Jobs found successfully",
            jobs,
            status: true
        });

    }
    catch (error){
        console.log(error);
    }
}