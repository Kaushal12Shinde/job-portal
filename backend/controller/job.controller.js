

export const postJob = async (req, res)=>{
    try {
        
        const { title, description, requierments, salary, location, jobType, experience, position, companyId } = req.body;

    }

    catch (error) {
        console.log(error);
    }
}