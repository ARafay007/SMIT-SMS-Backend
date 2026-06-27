
import jwt from 'jsonwebtoken';

export const authorize = async (req, res, next) => {
    try{
        let token = req.headers?.authorization?.split(' ');
        let verify = 'Token expire';

        if(token?.length){
            verify = await jwt.verify(token[1], process.env.JWT_SECRET);
        }
        else{
            res.status(400).json({message: 'Access denied', access: false});
        }

        if(verify.data){
            next();
        }
        else{
            res.status(400).json({message: 'Token Expired', access: false});
        }

    }
    catch(error){
        console.log(error.message, error.access);
        res.status(400).json({message: error.message, access: false});
    }
}