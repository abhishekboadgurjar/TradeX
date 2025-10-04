import { BadRequestError } from "../../errors/index.js";
import Order from "../../models/Order.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const getOrder = async (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.SOCKET_TOKEN_SECRET);
    const userId = decoded.userId;

    try {
        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "stock",
                select: "Symbol companyName currentPrice",
            });
        res.status(StatusCodes.OK).json({
            msg: "Orders retrieved successfully",
            data: orders,
        });
    } catch (error) {
        throw new BadRequestError("Failed to retrieve orders.");
    }
};

export { getOrder };
