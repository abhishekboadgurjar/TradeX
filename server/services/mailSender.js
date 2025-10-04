import fs from "fs";
import InlineCss from "inline-css";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

export const mailSender = async (email, otp, otp_type) => {
  let htmlContent = fs.readFileSync("otp_template.html", "utf-8");
  htmlContent = htmlContent.replace("TradingApp_otp_type", otp_type);
  htmlContent = htmlContent.replace("TradingApp_otp_type2", otp_type);
  htmlContent = htmlContent.replace("TradingApp_otp", otp);

  const options = {
    url: "file:///",
  };

  htmlContent = await InlineCss(htmlContent, options);

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let result = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Trading APP - OTP Verification",
      html: htmlContent,
    });

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateOtp = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
};
