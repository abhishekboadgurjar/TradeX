import cron from "node-cron";
import Stock from "../models/Stock.js";
import { store10Min, generateStockData } from "../scripts/stockUtils.js";

const holidays = ["2025-08-24", "2025-08-31"];

// Check if now is trading hour
const isTradingHour = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const isWeekday = dayOfWeek > 0 && dayOfWeek < 6; // Mon-Fri
  const isTradingTime =
    (now.getHours() === 9 && now.getMinutes() >= 30) ||
    (now.getHours() > 9 && now.getHours() < 15) ||
    (now.getHours() === 15 && now.getMinutes() <= 30);

  const today = now.toISOString().slice(0, 10);
  return isWeekday && isTradingTime && !holidays.includes(today);
};

// Reset day series at 9:15 AM
const scheduleDayReset = () => {
  cron.schedule("15 9 * * 1-5", async () => {
    if (isTradingHour()) {
      try {
        await Stock.updateMany(
          {},
          {
            $set: {
              dayTimeSeries: [],
              tenMinTimeSeries: [],
              lastDayTradedPrice: "$currentPrice",
            },
          }
        );
        console.log("✅ Day reset completed at 9:15 AM");
      } catch (err) {
        console.error("❌ Error during day reset:", err.message);
      }
    }
  });
};

// Update 10-minute candle
const update10minCandle = () => {
  cron.schedule("*/10 * * * *", async () => {
    if (isTradingHour()) {
      try {
        const stocks = await Stock.find();
        for (const s of stocks) {
          // Pass lowercase symbol
          await store10Min(s.symbol);
        }
      } catch (err) {
        console.error("❌ Error updating 10-min candles:", err.message);
      }
    }
  });
};

// Generate random stock data every 5 seconds
// const generateRandomDataEvery5Second = () => {
//   cron.schedule("*/5 * * * * *", async () => {
//     if (isTradingHour()) {
//       try {
//         const stocks = await Stock.find();
//         for (const s of stocks) {
//           // Pass lowercase symbol
//           await generateStockData(s.symbol);
//         }
//       } catch (err) {
//         console.error("❌ Error generating random stock data:", err.message);
//       }
//     }
//   });
// };
const generateRandomDataEvery5Second = (io) => {
  cron.schedule("*/5 * * * * *", async () => {
    const stocks = await Stock.find();
    for (const s of stocks) {
      await generateStockData(s.symbol); // make sure your model uses 'symbol'
      const updatedStock = await Stock.findOne({ symbol: s.symbol });
      io.emit(s.symbol, updatedStock); // emit to all connected clients
    }
  });
};

export { scheduleDayReset, update10minCandle, generateRandomDataEvery5Second };
