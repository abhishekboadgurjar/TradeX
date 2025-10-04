import User from "../../models/User.js";

import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../../errors/index.js";
import { generateOtp, mailSender } from "../../services/mailSender.js";
import OTP from "../../models/Otp.js";

const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      console.log("Email received:", email);
      throw new BadRequestError("Email is required");
    }

    let isExist = true;
    let user = await User.findOne({ email });

    if (!user) {
      const otp = generateOtp();
      await OTP.create({ email, otp, otp_type: "email" });
      await mailSender(email, otp, "email"); //
      console.log("Generated OTP:", otp);
      isExist = false;
    }

    res.status(StatusCodes.OK).json({ isExist });
  } catch (error) {
    next(error);
  }
};

export { checkEmail };
