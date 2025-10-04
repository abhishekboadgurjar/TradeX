import dotenv from "dotenv";
import connectDB from "../config/connect.js";
import Stock from "../models/Stock.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const seedStocks = async () => {
  try {
    console.log("🔌 Connecting to database...");
    await connectDB(process.env.MONGO_URI);
    console.log("✅ Connected to database successfully!");

    // 🧹 Drop any invalid/mismatched indexes
    const indexes = await Stock.collection.indexes();
    for (const idx of indexes) {
      if (idx.key.Symbol || idx.key.SYMBOL || idx.key.SYMBOLS) {
        console.log(`⚠️ Dropping bad index: ${idx.name}`);
        await Stock.collection.dropIndex(idx.name);
      }
    }

    // Ensure correct indexes
    await Stock.syncIndexes();
    console.log("✅ Synced indexes with schema");

    // Read JSON
    const stocksDataPath = path.join(__dirname, "../data/stocks.json");
    const stocksData = JSON.parse(fs.readFileSync(stocksDataPath, "utf8"));
    console.log(`📊 Found ${stocksData.length} stocks to seed`);

    // Clear existing stocks
    console.log("🧹 Clearing existing stocks...");
    await Stock.deleteMany({});
    console.log("✅ Existing stocks cleared");

    // Insert new stocks
    console.log("🌱 Seeding stocks into database...");
    const result = await Stock.insertMany(stocksData);
    console.log(`✅ Successfully seeded ${result.length} stocks!`);

    // Display summary
    console.log("\n📋 Seeded Stocks:");
    result.forEach((stock, i) => {
      console.log(`${i + 1}. ${stock.symbol} - ${stock.companyName} ($${stock.currentPrice})`);
    });

    console.log("\n🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  }
};

seedStocks();
