import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../../errors/index.js";
import jwt from "jsonwebtoken";
import NodeRSA from "node-rsa";
import User from "../../models/User.js";

const uploadBiometrics = async (req, res) => {
  const { public_key } = req.body;
  if (!public_key) {
    throw new BadRequestError("Public key is required");
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  const userId = decoded.userId;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      biometricKey: public_key,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "Biometric key uploaded successfully" });
};

const verifyBiometrics = async (req, res) => {
  const { signature } = req.body;
  if (!signature) {
    throw new BadRequestError("Signature is Required");
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  const userId = decoded.userId;
  const user = await User.findById(userId);
  if (!user.biometricKey) {
    throw new UnauthenticatedError("Biometric key not found");
  }

  const isVerifyingSignature = await verifySignature(
    signature,
    user._id,
    user.biometricKey
  );
  if (!isVerifyingSignature) {
    throw new UnauthenticatedError("Invalid Signature");
  }

  const access_token = jwt.sign(
    { userId: user._id },
    process.env.SOCKET_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  const refresh_token = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SOCKET_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_SOCKET_TOKEN_EXPIRY,
    }
  );

  res.status(StatusCodes.OK).json({
    access_token,
    refresh_token
  });
};

async function verifySignature(signature, userId, publickey) {
  const publickeyBuffer = Buffer.from(publickey, 'base64');
  const key = new NodeRSA();
  const signedData = key.importKey(publickeyBuffer, 'public-der');
  const signatureVerified = signedData.verify(Buffer.from(userId.toString()), signature, 'utf8', "base64");
  
  return signatureVerified;
}

export {uploadBiometrics,verifyBiometrics};