// import { StatusCodes } from "http-status-codes";

// import { BadRequestError } from "../../errors/index.js";
// import Holding from "../../models/Holding.js";
// import User from "../../models/User.js";
// import Order from "../../models/Order.js";
// import jwt from "jsonwebtoken";
// import Stock from "../../models/Stock.js";

// const buyStock = async (req, res) => {
//   const { stock_id, quantity } = req.body;
//   if (!stock_id || !quantity) throw new BadRequestError("Please provide all values");

//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) throw new BadRequestError("Authorization token missing");

//   const accessToken = authHeader.split(" ")[1];
//   const decoded = jwt.verify(accessToken, process.env.SOCKET_TOKEN_SECRET);
//   const userId = decoded.userId;

//   const stock = await Stock.findById(stock_id);
//   if (!stock) throw new BadRequestError("Stock not found");

//   const totalPrice = stock.currentPrice * quantity;

//   // Atomic balance deduction
//   const currentUser = await User.findOneAndUpdate(
//     { _id: userId, balance: { $gte: totalPrice } },
//     { $inc: { balance: -totalPrice } },
//     { new: true }
//   );
//   if (!currentUser) throw new BadRequestError("Insufficient balance");

//   const newHolding = new Holding({
//     user: userId,
//     stock: stock_id,
//     quantity,
//     buyPrice: stock.currentPrice,
//   });
//   await newHolding.save();

//   const newOrder = new Order({
//     user: userId,
//     stock: stock_id,
//     quantity,
//     price: stock.currentPrice,
//     type: "buy",
//     remainingBalance: Number(currentUser.balance.toFixed(2)), // ensure Number
//   });
//   await newOrder.save();

//   res.status(StatusCodes.CREATED).json({
//     msg: "Stock purchased successfully",
//     data: newHolding,
//   });
// };
// const sellStock = async (req, res) => {
//   const { holdingId, quantity } = req.body;
//   if (!holdingId || !quantity) {
//     throw new BadRequestError("Please provide all values");
//   }
//   try {
//     const holding = await Holding.findById(holdingId);
//     if (!holding) {
//       throw new BadRequestError("holding not found");
//     }
//     if (quantity > holding.quantity) {
//       throw new BadRequestError("You cannot sell more than you own");
//     }
//     const stock = await Stock.findById(holding.stock);
//     const sellPrice = quantity * stock.currentPrice;

//     holding.quantity -= quantity;
//     if (holding.quantity <= 0) {
//       await Holding.findByIdAndDelete(holdingId);
//     } else {
//       await holding.save();
//     }
//     const currentUser = await User.findById(holding.user);
//     if (!currentUser) {
//       throw new BadRequestError("User not found");
//     }
//     currentUser.balance += sellPrice;
//     await currentUser.save();

//     const newOrder = new Order({
//       user: holding.user,
//       stock: holding.stock,
//       quantity,
//       price: stock.currentPrice,
//       type: "sell",
//       remainingBalance: currentUser.balance,
//     });
//     await newOrder.save();

//     res.status(StatusCodes.OK).json({
//       msg: "Stock sold Successfully",
//       data: { orderId: newOrder._id, sellPrice },
//     });
//   } catch (error) {
//     throw new BadRequestError(error.message);
//   }
// };

// const getAllHoldings = async (req, res) => {
//   const accessToken = req.headers.authorization.split(" ")[1];
//   const decoded = jwt.verify(accessToken, process.env.SOCKET_TOKEN_SECRET);
//   const userId = decoded.userId;

//   try {
//     const holdings = await Holding.find({ user: userId }).populate({
//       path: "stock",
//       select: "-dayTimeSeries -tenMinTimeSeries",
//     });
//     res.status(StatusCodes.OK).json({
//       msg: "Holding retrieved successfully",
//       data: holdings,
//     });
//   } catch (error) {
//     throw new BadRequestError("Failed to retrieve holdings " + error.message);
//   }
// };

// export { buyStock, sellStock, getAllHoldings };




// import { StatusCodes } from "http-status-codes";
// import { BadRequestError } from "../../errors/index.js";
// import Holding from "../../models/Holding.js";
// import User from "../../models/User.js";
// import Order from "../../models/Order.js";
// import jwt from "jsonwebtoken";
// import Stock from "../../models/Stock.js";

// // ---------------- BUY STOCK ----------------
// const buyStock = async (req, res) => {
//   const { stock_id, quantity } = req.body;
//   if (!stock_id || !quantity) throw new BadRequestError("Please provide all values");

//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) throw new BadRequestError("Authorization token missing");

//   const accessToken = authHeader.split(" ")[1];
//   const decoded = jwt.verify(accessToken, process.env.SOCKET_TOKEN_SECRET);
//   const userId = decoded.userId;

//   const stock = await Stock.findById(stock_id);
//   if (!stock) throw new BadRequestError("Stock not found");

//   const totalPrice = stock.currentPrice * quantity;

//   // Atomic balance deduction
//   const currentUser = await User.findOneAndUpdate(
//     { _id: userId, balance: { $gte: totalPrice } },
//     { $inc: { balance: -totalPrice } },
//     { new: true }
//   );
//   if (!currentUser) throw new BadRequestError("Insufficient balance");

//   const newHolding = new Holding({
//     user: userId,
//     stock: stock_id,
//     quantity,
//     buyPrice: stock.currentPrice,
//   });
//   await newHolding.save();

//   const newOrder = new Order({
//     user: userId,
//     stock: stock_id,
//     quantity,
//     price: stock.currentPrice,
//     type: "buy",
//     remainingBalance: currentUser.balance, // store as number
//   });
//   await newOrder.save();

//   res.status(StatusCodes.CREATED).json({
//     msg: "Stock purchased successfully",
//     data: {
//       holding: newHolding,
//       remainingBalance: currentUser.balance.toFixed(2), // formatted for display
//     },
//   });
// };

// // ---------------- SELL STOCK ----------------
// const sellStock = async (req, res) => {
//   const { holdingId, quantity } = req.body;
//   if (!holdingId || !quantity) throw new BadRequestError("Please provide all values");

//   const holding = await Holding.findById(holdingId);
//   if (!holding) throw new BadRequestError("Holding not found");
//   if (quantity > holding.quantity) throw new BadRequestError("You cannot sell more than you own");

//   const stock = await Stock.findById(holding.stock);
//   if (!stock) throw new BadRequestError("Stock not found");

//   const sellPrice = quantity * stock.currentPrice;

//   // Update holding
//   holding.quantity -= quantity;
//   if (holding.quantity <= 0) {
//     await Holding.findByIdAndDelete(holdingId);
//   } else {
//     await holding.save();
//   }

//   const currentUser = await User.findById(holding.user);
//   if (!currentUser) throw new BadRequestError("User not found");

//   currentUser.balance += sellPrice;
//   await currentUser.save();

//   const newOrder = new Order({
//     user: holding.user,
//     stock: holding.stock,
//     quantity,
//     price: stock.currentPrice,
//     type: "sell",
//     remainingBalance: currentUser.balance, // store as number
//   });
//   await newOrder.save();

//   res.status(StatusCodes.OK).json({
//     msg: "Stock sold successfully",
//     data: {
//       orderId: newOrder._id,
//       sellPrice,
//       remainingBalance: currentUser.balance.toFixed(2), // formatted for display
//     },
//   });
// };

// // ---------------- GET ALL HOLDINGS ----------------
// const getAllHoldings = async (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) throw new BadRequestError("Authorization token missing");

//   const accessToken = authHeader.split(" ")[1];
//   const decoded = jwt.verify(accessToken, process.env.SOCKET_TOKEN_SECRET);
//   const userId = decoded.userId;

//   const holdings = await Holding.find({ user: userId })
//     .populate({ path: "stock", select: "-dayTimeSeries -tenMinTimeSeries" })
//     .lean();

//   res.status(StatusCodes.OK).json({
//     msg: "Holdings retrieved successfully",
//     data: holdings,
//   });
// };

// export { buyStock, sellStock, getAllHoldings };



import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../../errors/index.js";
import Holding from "../../models/Holding.js";
import User from "../../models/User.js";
import Order from "../../models/Order.js";
import jwt from "jsonwebtoken";
import Stock from "../../models/Stock.js";

// Helper to round to 2 decimals
const roundToTwo = (num) => Math.round(num * 100) / 100;

// ---------------- BUY STOCK ----------------
const buyStock = async (req, res) => {
  const { stock_id, quantity } = req.body;
  if (!stock_id || !quantity) throw new BadRequestError("Please provide all values");

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) throw new BadRequestError("Authorization token missing");

  const accessToken = authHeader.split(" ")[1];
  const decoded = jwt.verify(accessToken, process.env.SOCKET_TOKEN_SECRET);
  const userId = decoded.userId;

  const stock = await Stock.findById(stock_id);
  if (!stock) throw new BadRequestError("Stock not found");

  const totalPrice = roundToTwo(stock.currentPrice * quantity);

  // Atomic balance deduction
  const currentUser = await User.findOneAndUpdate(
    { _id: userId, balance: { $gte: totalPrice } },
    { $inc: { balance: -totalPrice } },
    { new: true }
  );
  if (!currentUser) throw new BadRequestError("Insufficient balance");

  const newHolding = new Holding({
    user: userId,
    stock: stock_id,
    quantity,
    buyPrice: stock.currentPrice,
  });
  await newHolding.save();

  const remainingBalance = roundToTwo(currentUser.balance);

  const newOrder = new Order({
    user: userId,
    stock: stock_id,
    quantity,
    price: stock.currentPrice,
    type: "buy",
    remainingBalance,
  });
  await newOrder.save();

  res.status(StatusCodes.CREATED).json({
    msg: "Stock purchased successfully",
    data: {
      holding: newHolding,
      remainingBalance: remainingBalance.toFixed(2), // formatted for display
    },
  });
};

// ---------------- SELL STOCK ----------------
const sellStock = async (req, res) => {
  const { holdingId, quantity } = req.body;
  if (!holdingId || !quantity) throw new BadRequestError("Please provide all values");

  const holding = await Holding.findById(holdingId);
  if (!holding) throw new BadRequestError("Holding not found");
  if (quantity > holding.quantity) throw new BadRequestError("You cannot sell more than you own");

  const stock = await Stock.findById(holding.stock);
  if (!stock) throw new BadRequestError("Stock not found");

  const sellPrice = roundToTwo(quantity * stock.currentPrice);

  // Update holding
  holding.quantity -= quantity;
  if (holding.quantity <= 0) {
    await Holding.findByIdAndDelete(holdingId);
  } else {
    await holding.save();
  }

  const currentUser = await User.findById(holding.user);
  if (!currentUser) throw new BadRequestError("User not found");

  currentUser.balance = roundToTwo(currentUser.balance + sellPrice);
  await currentUser.save();

  const remainingBalance = currentUser.balance;

  const newOrder = new Order({
    user: holding.user,
    stock: holding.stock,
    quantity,
    price: stock.currentPrice,
    type: "sell",
    remainingBalance,
  });
  await newOrder.save();

  res.status(StatusCodes.OK).json({
    msg: "Stock sold successfully",
    data: {
      orderId: newOrder._id,
      sellPrice: sellPrice.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2), // formatted for display
    },
  });
};

// ---------------- GET ALL HOLDINGS ----------------
const getAllHoldings = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) throw new BadRequestError("Authorization token missing");

  const accessToken = authHeader.split(" ")[1];
  const decoded = jwt.verify(accessToken, process.env.SOCKET_TOKEN_SECRET);
  const userId = decoded.userId;

  const holdings = await Holding.find({ user: userId })
    .populate({ path: "stock", select: "-dayTimeSeries -tenMinTimeSeries" })
    .lean();

  res.status(StatusCodes.OK).json({
    msg: "Holdings retrieved successfully",
    data: holdings,
  });
};

export { buyStock, sellStock, getAllHoldings };
