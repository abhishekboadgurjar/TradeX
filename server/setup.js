#!/usr/bin/env node

import fs from "fs";
import crypto from "crypto";

console.log("🚀 TradeVault API Setup Script\n");

// Generate secure random secrets
function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString("hex");
}

const envContent = `# Database
MONGO_URI=mongodb://localhost:27017/trading-app

# JWT Secrets (auto-generated secure keys)
JWT_SECRET=${generateSecret()}
SOCKET_TOKEN_SECRET=${generateSecret()}
REFRESH_TOKEN_SECRET=${generateSecret()}
REFRESH_SOCKET_TOKEN_SECRET=${generateSecret()}
REGISTER_SECRET=${generateSecret()}

# Token Expiry
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
SOCKET_ACCESS_SECRET=${generateSecret()}
SOCKET_ACCESS_EXPIRY=1h
SOCKET_REFRESH_SECRET=${generateSecret()}
SOCKET_REFRESH_EXPIRY=7d
REGISTER_SECRET_EXPIRY=10m

# OAuth (replace with your actual credentials)
GOOGLE_CLIENT_ID=your_google_client_id_here

# Email Configuration (replace with your actual email settings)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password_here
MAIL_FROM=your_email@gmail.com

# Server Configuration
PORT=3003
SOCKET_PORT=4003
WEBSERVER_URI=http://localhost:3001
`;

try {
  // Check if .env already exists
  if (fs.existsSync(".env")) {
    console.log("⚠️  .env file already exists. Backing up to .env.backup");
    fs.copyFileSync(".env", ".env.backup");
  }

  // Create .env file
  fs.writeFileSync(".env", envContent);
  console.log("✅ .env file created successfully!");
  console.log("🔐 Secure JWT secrets generated automatically");
  console.log("📝 Please update the following in your .env file:");
  console.log("   - GOOGLE_CLIENT_ID (for OAuth)");
  console.log("   - MAIL_USER and MAIL_PASS (for email functionality)");
  console.log("   - MONGO_URI (if using MongoDB Atlas)");
  console.log("\n🚀 You can now start the server with: npm start");
} catch (error) {
  console.error("❌ Error creating .env file:", error.message);
  console.log(
    "\n📝 Please create the .env file manually using the template in API_TESTING_GUIDE.md"
  );
}
