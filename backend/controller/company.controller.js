import {Company} from "../models/company.models.js";

export const  registerCompany = async (req, res) =>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400)
            .json({
                message: "Company name is required",
                status: false
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400)
            .json({
                message: "Company already exists",
                status: false
            });
        }

        company = await Company.create({
            name:companyName,
            userID:req.id
        })

        return res.status(200)
        .json({
            message: "Company created successfully",
            status: true,
        })

    }
    catch (error) {
        console.log(error);
    }
}

export const getCompanies = async (req, res)=>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message: "No company found",
                status: false
            })
        }

        return  res.status(200).json({
            message: "Company found successfully",
            status: true,
            companies
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) =>{
    try {
        const conpandyId = req.params.id;
        const company = await Company.findById(conpandyId);
        if(!company){
            return res.status(404).json({
                message: "No company found",
                status: false
            })
        }

        return res.status(200).json({
            message:"Company found successfully",
            status:true,
            company
        })
    }
    catch (error){
        console.log(error);
    }
}

export const updateCompany = async (req, res) =>{
    try{
        const {name , description, website, loaction} = req.body;
        const logoFile = req.file;

        const updateData = {name , description, website, loaction};

        const company = await Company.findByIdAndUpdate(req.params.id , updateData , {new:true});

        if(!company){
            return res.status(404).json({
                message: "No company found",
                status: false
            })
        }

        return res.status(200).json({
            message:"Company Updated successfully",
            status:true,
            company
        });
        
    }
    catch(error){
        console.log(error);
    }
}