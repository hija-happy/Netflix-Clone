import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const {token} = req.cookies; 
    // console.log(token)

    if(!token){
        return res.json({success:false, message:"Not Authorised, Login Again"})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)

        if (!req.body) {
            req.body = {}; // Ensure req.body exists
        }

        if(decodedToken.id){
            req.body.userId= decodedToken.id;
        }
        else{
            return res.json({success:false, message:"Not Authorised, Login Again"})
        }
        next();
    }
    catch (error) {
        return res.json({success:false, message:error.message})
    }
}   

export default userAuth;