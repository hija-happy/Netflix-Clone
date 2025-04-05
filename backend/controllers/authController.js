import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/User.js';
import transporter from '../config/nodemailer.js';

export const register = async (req,res) => {
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'})
    }

    try {

        const existingUser = await userModel.findOne({email})
        
        if(existingUser){
            return res.json({ success:false , message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new userModel({name, email, password:hashedPassword});
        await user.save()


        //generate tioekn using JWT

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        //after genertaing toekn, it must be sent tothe users through cookies in res

        res.cookie('token',token,
             {
                httpOnly :true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
                maxAge: 7 *24 * 60 * 60 * 1000
            });

            // to send welcome email
            const mailOptions ={
                from: process.env.SENDER_EMAIL,
                to: email,
                subject:'Welcome to Netflix',
                text: `Hiiii ${name}, Welcome to Netflix. Your Account has been created with email 
                Happy Watching`
            }

            try {
                await transporter.sendMail(mailOptions);
                console.log("📩 Email sent successfully!");
            } catch (error) {
                console.error("❌ Email sending failed:", error);
            }
            

        res.status(200).json({
            message:"created ",
            success:true,
        })
        
    } catch (error) {
        res.json({success:false, message : error.message})
    }
}

export const login = async (req,res) => {
     const {email, password} = req.body;

     if(!email || !password){
        return res.json({
            success:false,
            message:'Email and password are required'
        })
     }

     try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:'Invalid email'})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message: 'Invalid password'})
        }


         //generate tioekn using JWT

         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

         //after genertaing toekn, it must be sent tothe users through cookies in res
 
         res.cookie('token',token,
              {
                 httpOnly :true,
                 secure: process.env.NODE_ENV === 'production',
                 sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
                 maxAge: 7 *24 * 60 * 60 * 1000
             });

             return res.json({
                success: true,
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            });
            
     }
     catch(error){
        return res.json({success:false, message:error.message});
     }
}

export const logout = async (req, res)=> {
    try {
        res.clearCookie('token', {
            httpOnly :true,
                 secure: process.env.NODE_ENV === 'production',
                 sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
        })

        return res.json({success:true, message:"Loggout out"})
    }
    catch(error){
        return res.json({success:false, message:error.message})
    }
}

/////////// controller to send otp for verificarion
export const sendVerifyOtp = async(req, res) => {

    
    try {
        const {userId} = req.body;

        
        
        if (!userId) {
            return res.json({ success: false, message: "User ID is missing" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.email) {
            return res.json({ success: false, message: "User email not found" });
        }

        console.log("✅ User found:", user); // Debugging
        console.log("📩 Sending email to:", user.email); // Debugging

        if(user.isAccountVerified){
            return res.json({success:false, message:"Already Verified"})
    }

     const otp = String(Math.floor( 100000 + Math.random() * 900000));

     // to add the otp to the database 
     user.verifyOtp = otp;
     //1 hr expiration
     user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000;   

     await user.save();

     const mailOption ={
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject:'NETFLIX - Account Verification OTP',
        text: `Hiiii ${user.name}, Your OTP is ${otp}. Verify your account within 1 hour.
        Happy Watching`
    }

    await transporter.sendMail(mailOption);
    console.log("📩 Email sent successfully for OTP verification!");

    return res.json({success:true, message:"OTP sent successfully"});

}
    catch(error){
        res.json({success:false, message:error.message})
    }
}

///////// to verify otp and verify account
export const verifyEmail = async(req, res) => {

    // user will send only otp with the request but not any userID , therefore we need to get the userId from middleware, the token
    const {userId, otp} = req.body;
    if(!userId|| !otp){
        return res.json({success:false, message:"Missing details"})
    }

    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        // for invalid otp
        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({success:false, message:"Invalid OTP"})
        }

        // for expired otp
        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false, message:"OTP expired"})
        }
        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        res.json({success:true, message:"Account verified successfully"}) 
    }
    catch(error){
        res.json({success:false, message:error.message})
    }
}

//////////////// to check whetehrn the user is authenticated or not
export const isAutenticated = async (req, res) => {
    try {
        // middle
        return res.json({success:true, message:"User is authenticated"})
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//////// SEND PASSWORD  reset OTP 
export const sendResetOtp = async (req, res) => {  
    const {email} = req.body;

    if(!email){
        return res.json({success:false, message:"Email is required"})
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        const otp = String(Math.floor( 100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;   

        await user.save();

        const mailOption= {
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Netflix - Password Reset OTP',
            text:`Your OTP for password reset is ${otp}. It is valid for 15 minutes.`
        };
        await transporter.sendMail(mailOption);
        return res.json({success:true, message:"OTP sent to email"})
    }
    catch (error) {
        res.json({success:false, message:error.message})
    }
}

////////// reset password

export const resetPassword = async(req,res)=>{
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success:false, message:"Missing details"})
    }

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User not found"})  
        }
        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.json({success:false, message:"Invalid OTP"})
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false, message:"OTP expired"})
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();
        res.json({success:true, message:"Password reset successfully"})
        }
    
    catch (error) {
        res.json({success:false, message:error.message})
    }
}