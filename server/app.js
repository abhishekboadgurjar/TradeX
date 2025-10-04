import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import cors from "cors";
import connectDB from "./config/connect.js";
import authRouter from "./routes/auth.js";
import stocksRouter from "./routes/stocks.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import authenticateSocketUser from "./middleware/socketAuth.js";
import socketHandshake from "./middleware/socketHandshake.js";
import {
  generateRandomDataEvery5Second,
  scheduleDayReset,
  update10minCandle,
} from "./services/cronJob.js";
import Stock from "./models/Stock.js";
import User from "./models/User.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

dotenv.config();

const holidays = ["2025-08-24", "2025-08-31"];

const isTradingHour = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
  const isTradingTime =
    (now.getHours() === 9 && now.getMinutes() >= 30) ||
    (now.getHours() > 9 && now.getHours() < 15) ||
    (now.getHours() === 15 && now.getMinutes() <= 30);

  const today = new Date().toISOString().slice(0, 10);
  const isTradingHour = isWeekday && isTradingTime && !holidays.includes(today);
  return isTradingHour;
};

const app = express();

app.use(cors());

app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.WEBSERVER_URI || "https://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["access_token"],
    credentials: true,
  },
});

io.use(socketHandshake);

io.on("connection", (socket) => {
  console.log("new client connected", socket.id);

  // Single stock subscription
  socket.on("SubscibeToStocks", async (stockSymbol) => {
    console.log(`Client ${socket.id} subscribe to stock: ${stockSymbol}`);
    try {
      const stock = await Stock.findOne({ symbol: stockSymbol }); // lowercase 'symbol'
      if (!stock) {
        console.error(`Stock with symbol ${stockSymbol} not found`);
        return;
      }
      socket.emit(stockSymbol, stock);
    } catch (error) {
      console.error("Error sending stock update", error);
    }
  });

  // Multiple stocks subscription
  socket.on("subscribeToMultipleStocks", async (stockSymbols) => {
    console.log(
      `Client ${socket.id} subscribed to multiple stocks: ${stockSymbols}`
    );
    try {
      for (const symbol of stockSymbols) {
        const stock = await Stock.findOne({ symbol }); // lowercase 'symbol'
        if (!stock) {
          console.log(`Stock with symbol ${symbol} not found.`);
          continue;
        }
        socket.emit(symbol, stock);
      }
    } catch (error) {
      console.error("Error handling multiple stock subscriptions", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

update10minCandle();
generateRandomDataEvery5Second(io);
scheduleDayReset();

//Log Websocket server status

// Remove duplicate server listening - will be handled in start function

app.get("/", (req, res) => {
  res.send('<h1>Trading API</h1><a href="/api-docs">Documentation</a>');
});

//SWAGGER UI DOCS

const swaggerDocument = YAML.load(join(_dirname, "./docs/swagger.yaml"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//ROUTES
app.use("/auth", authRouter);
app.use("/stocks", stocksRouter);

//Middleware
app.use(cors());
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//Start Server

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const PORT = process.env.PORT || 3000;
    const SOCKET_PORT = process.env.SOCKET_PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

    httpServer.listen(SOCKET_PORT, () => {
      console.log(
        `Websocket server is running and listening on port ${SOCKET_PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
