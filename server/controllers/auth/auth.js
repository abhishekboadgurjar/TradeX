import User from "../../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../../errors/index.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
   const {email,password,register_token}=req.body;
   if(!email||!password||!register_token){
    throw new BadRequestError('Please provide all values');
   }
   const user=await User.findOne({email});
   if(user){
    throw new BadRequestError('User already exists');
   }
   try {
    const payload =jwt.verify(register_token,process.env.REGISTER_SECRET);
    if(payload.email!==email){
        throw new BadRequestError('Invalid register token');
    }
    const newUser=await User.create({email,password});
    const access_token=newUser.createAccessToken();
    const refresh_token=newUser.createRefreshToken();
    res.status(StatusCodes.CREATED).json({user:{email:newUser.email,userId:newUser.id},tokens:{access_token,refresh_token}});
   } catch (error) {
    console.error(error);
    throw new BadRequestError('Invalid register token');
   }
}

const login = async (req, res) => {
    const {email,password}=req.body;
    if(!email||!password){
        throw new BadRequestError('Please provide all values');
    }
    const user=await User.findOne({email});

    if(!user){
        throw new UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect=await user.comparePassword(password);
    if(!isPasswordCorrect){
        let message;
        if(user.blocked_until_password&& user.blocked_until_password>new Date()){
            const remainingMinutes=Math.ceil(
                (user.blocked_until_password-new Date())/(60*1000)
            );
            message=`Your account is blocked for password. please try again after ${remainingMinutes} minutes(s).`;
        }
        else{
            const attemptsRemaining=3-user.wrong_password_attempts;
            message=attemptsRemaining>0
            ?`Invalid password ${attemptsRemaining} attempts remaining`
            :"Invalid login attempts exceeds .please try after 30 minutes.";
        }
        throw new UnauthenticatedError(message);
    }
    const access_token=user.createAccessToken();
    const refresh_token=user.createRefreshToken();

    let phone_exist=false;
    let login_pin_exist=false;
    if(user.phone) phone_exist=true;

    if(user.phone_number){
        phone_exist=true;
    }
    if(user.login_pin){
        login_pin_exist=true;
    }

    res.status(StatusCodes.OK).json({
        user:{name:user.name,email:user.email,userId:user._id,phone_exist,login_pin_exist},
        tokens:{access_token,refresh_token},
    });

}

const refreshToken = async (req, res) => {
    const {type,refresh_token}=req.body;
    if(!type||!["socket","app"].includes(type)||!refresh_token){
     throw new BadRequestError("Invalid Body");   
    }
    try{
        let accessToken,newRefreshToken;
        if(type==="app"){
            ({access_token:accessToken,newRefreshToken}=await generateRefreshTokens(
                refresh_token,
                process.env.REFRESH_SECRET,
                process.env.REFRESH_EXPIRY,
                process.env.ACCESS_SECRET,
                process.env.ACCESS_EXPIRY
            ))
        }
        else if(type==="socket"){
            ({
                access_token:accessToken,newRefreshToken
            }=await generateRefreshTokens(
                refresh_token,
                process.env.SOCKET_REFRESH_SECRET,
                process.env.SOCKET_REFRESH_EXPIRY,
                process.env.SOCKET_ACCESS_SECRET,
                process.env.SOCKET_ACCESS_EXPIRY,
            ));
        }
        res.status(StatusCodes.OK).json({access_token:accessToken,refreshToken:newRefreshToken});
    }
    catch(error){
        console.error(error);
        throw new UnauthenticatedError("Invalid Token");
    }
}


async function generateRefreshTokens(
token ,
refresh_secret,
refresh_expiry,
access_secret,
access_expiry
)
{
    try {
        const payload=jwt.verify(token,refresh_secret);
        const user=await User.findById(payload.userId);
        if(!user){
            throw new NotFoundError("User not found");
        }
        const access_token=jwt.sign(
            {userId:payload.userId},
            access_secret,
            {expiresIn:access_expiry}
        );
        const newRefreshToken=jwt.sign(
            {userId:payload.userId},
            refresh_secret,
            {expiresIn:refresh_expiry}
        );
        return {access_token,newRefreshToken};
    } catch (error) {
        console.error(error);
        throw new UnauthenticatedError("Invalid Token");
    }

}

const logout = async (req, res) => {
    const accessToken=req.headers.authorization.split(" ")[1];
    const decodedToken=jwt.decode(accessToken,process.env.JWT_SECRET);
    const userId=decodedToken.userId;
    await User.updateOne({_id:userId},{$unset:{biometricKey:1}});
    res.status(StatusCodes.OK).json({message:"Logged out Successfully"});
}



export {register,login,refreshToken,logout};