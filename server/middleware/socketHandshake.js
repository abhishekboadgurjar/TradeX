import jwt from "jsonwebtoken";
import { NotFoundError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";

const socketHandshake = async (socket, next) => {
  try {
    const token = socket.handshake.headers.access_token;
    if (!token) {
      throw new UnauthenticatedError("Authentication Failed");
    }
    const decoded = jwt.verify(token, process.env.SOCKET_TOKEN_SECRET);
    if (!decoded) {
      throw new UnauthenticatedError("invalid token");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    socket.user = user;
    next();
  } catch (error) {
    console.log("Socket authentication error:", error.message);
    next(new UnauthenticatedError("Authentication invalid"));
  }
};

export default socketHandshake;
