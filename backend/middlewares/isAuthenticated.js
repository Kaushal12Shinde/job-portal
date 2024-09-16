import jwt from  'jsonwebtoken';

export const isAuthenticated = async (req,res ,next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401)
            .json({
                message: 'Authentication failed',
                status:false
            });
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY); 
        if(!decoded){
            return res.status(401)
            .json({
                message: 'Authentication failed',
                status:false
            });
        }

        req.id = decoded.userId
        next();
    }
    catch (error) {
        return res.status(401).json({message: 'Authentication failed'})
    }
}