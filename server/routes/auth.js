import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth/auth.js";

import authenticateUser from "../middleware/authentication.js";
import { checkEmail } from "../controllers/auth/email.js";
import { signInWithOauth } from "../controllers/auth/oauth.js";
import { sendOtp, verifyOtp } from "../controllers/auth/otp.js";
import {
  getProfile,
  setLoginPinFirst,
  updateProfile,
  verifyPin,

} from "../controllers/auth/user.js";
import {
  uploadBiometrics,
  verifyBiometrics,
} from "../controllers/auth/biometrics.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/check-email", checkEmail);
router.post("/oauth", signInWithOauth);
router.post("/verify-otp", verifyOtp);
router.post("/send-otp", sendOtp);
router.post("/refresh-token", refreshToken);
router.post("/logout", authenticateUser, logout);

router
  .route("/profile")
  .get(authenticateUser, getProfile)
  .put(authenticateUser, updateProfile);

router.post("/set-pin", authenticateUser, setLoginPinFirst);
router.post("/verify-pin", authenticateUser, verifyPin);
router.post("/upload-biometric", authenticateUser, uploadBiometrics);
router.post("/verify-biometric", authenticateUser, verifyBiometrics);

export default router;
