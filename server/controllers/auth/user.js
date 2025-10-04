import User from "../../models/User.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../../errors/index.js";
import bcrypt from "bcryptjs";

const updateProfile = async (req, res) => {
  const { name, gender, date_of_birth } = req.body;
  const accessToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  const userId = decoded.userId;
  const updatedFelds = {};
  if (name) updatedFelds.name = name;
  if (gender) updatedFelds.gender = gender;
  if (date_of_birth) updatedFelds.date_of_birth = date_of_birth;

  const updatedUser = await User.findByIdAndUpdate(userId, updatedFelds, {
    new: true,
    runValidators: true,
    select: "-password -biometricKey",
  });
  if (!updatedUser) {
    throw new NotFoundError(`No user with id: ${userId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, data: updatedUser });
};

const setLoginPinFirst = async (req, res) => {
  const { login_pin } = req.body;
  if (!login_pin || login_pin.length !== 4) {
    throw new BadRequestError("Login pin must be 4 digits");
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  const userId = decoded.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`No user with id : ${userId}`);
  }
  if (user.login_pin) {
    throw new BadRequestError("Login pin already set");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPin = await bcrypt.hash(login_pin, salt);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { login_pin: hashedPin },
    { new: true, runValidators: true }
  );

  const access_token = await jwt.sign(
    { userId: userId },
    process.env.SOCKET_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
  const refresh_token = await jwt.sign(
    { userId: userId },
    process.env.REFRESH_SOCKET_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_SOCKET_TOKEN_EXPIRY,
    }
  );
  res.status(StatusCodes.OK).json({
    success:true,
    socket_tokens:{
        socket_access_token:access_token,
        socket_refresh_token:refresh_token,
    }
  })
};


const verifyPin=async (req,res)=>{
  const {login_pin} =req.body;
  if(!login_pin||login_pin.length!==4){
    throw new BadRequestError("Login pin must be 4 digits");
  }
  const accessToken=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(accessToken,process.env.JWT_SECRET);
  const userId=decoded.userId;


  const user=await User.findById(userId);
  if(!user){
    throw new NotFoundError(`No user with id :${userId}`);
  }
  if(!user.login_pin){
    throw new BadRequestError("Login pin not set");
  }

  if(user.blocked_until_pin && user.blocked_until_pin>new Date()){
    throw new UnauthenticatedError(`Too many wrong attempts. Try again after ${Math.ceil(
      (user.blocked_until_pin-new Date())/60000
    )} minutes `);
  }

const isPinCorrect=await bcrypt.compare(login_pin,user.login_pin);
if(!isPinCorrect){
  user.wrong_pin_attempts+=1;
  if(user.wrong_pin_attempts>=5){
    user.blocked_until_pin=new Date(Date.now()+15*60*1000);
    await user.save();
    throw new UnauthenticatedError(
      "Too many wrong attempts . Try again after 15 minutes"
    );
  }
  user.blocked_until_pin=null;
  user.wrong_pin_attempts=0;
  await user.save();

  const access_token=await jwt.sign(
    {userId:userId},
    process.env.SOCKET_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
  );

  res.status(StatusCodes.OK).json({
    success:true,
    socket_tokens:{
      socket_access_token:access_token,
      socket_refresh_token:refresh_token,
    }
  });
} else {
  user.wrong_pin_attempts = 0;
  user.blocked_until_pin = null;
  await user.save();

  const access_token = await jwt.sign(
    {userId: userId},
    process.env.SOCKET_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
  );

  const refresh_token = await jwt.sign(
    {userId: userId},
    process.env.REFRESH_SOCKET_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_SOCKET_TOKEN_EXPIRY}
  );

  res.status(StatusCodes.OK).json({
    success: true,
    socket_tokens: {
      socket_access_token: access_token,
      socket_refresh_token: refresh_token,
    }
  });
}
}


const getProfile=async (req,res)=>{
  const accessToken=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(accessToken,process.env.JWT_SECRET);
  const userId=decoded.userId;

  const user=await User.findById(userId).select("-password -biometricKey");
  if(!user){
    throw new NotFoundError(`No user with id : ${userId}`);
  }

let pinExists=false;
let phoneExists=false;
if(user.login_pin)pinExists=true;
if(user.phone_number) phoneExists=true;

res.status(StatusCodes.OK).json({
  userId:user.id,
  email:user.email,
  phone_exists:phoneExists,
  name:user.name,
  login_pin_exist:pinExists,
  balance:user.balance.toFixed(2),
});
}

export {updateProfile,setLoginPinFirst,verifyPin,getProfile};