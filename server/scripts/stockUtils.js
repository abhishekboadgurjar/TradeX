import { NotFoundError } from "../errors/index.js";
import Stock from "../models/Stock.js";

const roundToTwoDecimals = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const generateStockData = async (symbol) => {
  const stock = await Stock.findOne({ symbol }); // lowercase field
  if (!stock) throw new NotFoundError(`Stock with symbol ${symbol} not found`);

  const now = new Date();
  const currentPrice = stock.currentPrice;

  // Random trend
  const trendChange = 0.005;
  const trendType = Math.random();
  const trendModifier = trendType < 0.33 ? 0 : trendType < 0.66 ? trendChange : -trendChange;

  // Random daily change
  const minChange = -0.02;
  const maxChange = 0.02;
  const changePercentage = Math.random() * (maxChange - minChange) + minChange + trendModifier;

  const close = roundToTwoDecimals(currentPrice * (1 + changePercentage));

  // High/Low calculation
  let high, low;
  if (Math.random() < 0.5) {
    high = Math.max(currentPrice, close) + Math.random() * 2;
    low = Math.min(currentPrice, close) - Math.random() * 2;
  } else {
    high = Math.max(currentPrice, close) + Math.random() * 4;
    low = Math.min(currentPrice, close) - Math.random() * 4;
  }
  high = roundToTwoDecimals(high);
  low = roundToTwoDecimals(low);

  const timestamp = now.toISOString();
  const time = now.getTime() / 1000;

  const lastItem = stock.dayTimeSeries[stock.dayTimeSeries.length - 1];

  if (!lastItem || now - new Date(lastItem.timestamp) > 60 * 1000) {
    // New 1-min candle
    stock.dayTimeSeries.push({
      timestamp,
      time,
      _internal_originalTime: time,
      open: roundToTwoDecimals(currentPrice),
      high,
      low,
      close,
    });
  } else {
    // Update existing candle
    stock.dayTimeSeries[stock.dayTimeSeries.length - 1] = {
      ...lastItem,
      high: Math.max(lastItem.high, high),
      low: Math.min(lastItem.low, low),
      close,
    };
  }

  stock.currentPrice = close; // always update current price

  try {
    await stock.save();
  } catch (error) {
    console.log("Skipping conflicts", error.message);
  }
};

const store10Min = async (symbol) => {
  const stock = await Stock.findOne({ symbol });
  if (!stock) throw new NotFoundError(`Stock with symbol ${symbol} not found`);

  const now = new Date();
  const latestItem = stock.dayTimeSeries[stock.dayTimeSeries.length - 1];
  if (!latestItem) return;

  stock.tenMinTimeSeries.push({
    timestamp: now.toISOString(),
    time: now.getTime() / 1000,
    _internal_originalTime: latestItem._internal_originalTime,
    open: roundToTwoDecimals(latestItem.open),
    high: roundToTwoDecimals(latestItem.high),
    low: roundToTwoDecimals(latestItem.low),
    close: roundToTwoDecimals(latestItem.close),
  });

  try {
    await stock.save();
  } catch (error) {
    console.log("Skipping conflicts", error.message);
  }
};

export { generateStockData, store10Min };
