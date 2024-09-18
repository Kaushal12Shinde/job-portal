import { User } from "../models/user.models.js"
import bcrypt from "bcryptjs"

export const register  = async (req, res) => {

    try{

        const {fullname,  email, phoneNumber, password, role } = req.body;

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Please fill in all fields",
                status: false
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists",
                status:false,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        })
    }
    catch(error){
        console.log(error);
    }
}

export const login = async (req, res) =>{
    try{

        const {email, password , role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Please fill in all fields",
                status: false
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User not found",
                status:false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Please fill in all fields",
                status: false
            });
        }

        if(role!==user.role){
            return res.status(400).json({
                message: "You are not authorized to access this page",
                status: false
            });
        }


        const tokenData = {
            userId: user._id,
        }

        user = {
            id: user._id,
            email: user.email,
            role: user.role,
            fullname:user.fullname,
            phoneNumber:user.phoneNumber,
            profile:user.profile,
        }

        const token = await jwt.sign(tokenData,  process.env.SECRET_KEY, {expiresIn: '1d'});
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message: "Login successful",
            user,
            status: true,
        });
    }
    catch(error){
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try{
        res.clearCookie("token");
        return res.status(200)
            .cookie("token","", {maxAge:0})
            .json({
                message: "Logged out successfully",
                status: true,
            })
    }
    catch(error){
        console.log(error);
    }
}

export const updateProfile  = async (req, res) => {
    try{
        const {fullname, email , phoneNumber , bio , skills} = req.body;
        // if(!fullname || !email || !phoneNumber || !bio || !skills){
        //     return res.status(400).json({
        //         message: "Please fill all the fields",
        //         status: false,
        //     })
        // }

        let skillArr;
        if(skills){
            skillArr = skills.split(",");
        }
        

        const userId = req.id; //middleware
        let user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                message: "User not found",
                status:false
            })
        }

        if(fullname)
            user.fullname = fullname;
        if(email)
            user.email = email;
        if(phoneNumber)
            user.phoneNumber = phoneNumber;
        if(bio)
            user.profile.bio =  bio;
        if(skills)
            user.profile.skills = skillArr;
        
        // resume updation link 

        await user.save();

        user = {
            id: user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role:user.role,
            profile: user.profile
            
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            status: true,
            user,
        })
    }
    catch(error){
        console.log(error);
    }
}


