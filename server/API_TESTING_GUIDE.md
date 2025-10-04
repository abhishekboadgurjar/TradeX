# TradeX API Testing Guide

## Server Information
- **Base URL**: `http://localhost:3003`
- **WebSocket URL**: `ws://localhost:4003`
- **API Documentation**: `http://localhost:3003/api-docs`

## Authentication Flow

### 1. Check Email and Send OTP
```bash
curl -X POST http://localhost:3003/auth/check-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### 2. Send OTP
```bash
curl -X POST http://localhost:3003/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "otp_type": "email"}'
```

### 3. Verify OTP
```bash
curl -X POST http://localhost:3003/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "otp": "123456", "otp_type": "email"}'
```

### 4. Register User
```bash
curl -X POST http://localhost:3003/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "register_token": "YOUR_REGISTER_TOKEN_FROM_OTP_VERIFICATION"
  }'
```

### 5. Login User
```bash
curl -X POST http://localhost:3003/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

## Protected Endpoints (Require Bearer Token)

### User Management

#### Get Profile
```bash
curl -X GET http://localhost:3003/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Update Profile
```bash
curl -X PUT http://localhost:3003/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "gender": "male",
    "date_of_birth": "1990-01-01"
  }'
```

#### Set Login PIN
```bash
curl -X POST http://localhost:3003/auth/set-pin \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"login_pin": "1234"}'
```

#### Verify PIN
```bash
curl -X POST http://localhost:3003/auth/verify-pin \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"login_pin": "1234"}'
```

#### Upload Biometric Key
```bash
curl -X POST http://localhost:3003/auth/upload-biometric \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"public_key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."}'
```

#### Verify Biometric
```bash
curl -X POST http://localhost:3003/auth/verify-biometric \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"signature": "base64_encoded_signature_here"}'
```

#### Logout
```bash
curl -X POST http://localhost:3003/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Stock Management

#### Get All Stocks
```bash
curl -X GET http://localhost:3003/stocks \
  -H "Authorization: Bearer YOUR_SOCKET_TOKEN"
```

#### Get Stock by Symbol
```bash
curl -X GET "http://localhost:3003/stocks/stock?stock=AAPL" \
  -H "Authorization: Bearer YOUR_SOCKET_TOKEN"
```

#### Register New Stock
```bash
curl -X POST http://localhost:3003/stocks/register \
  -H "Authorization: Bearer YOUR_SOCKET_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BT",
    "companyName": "Boad Technologies, Inc.",
    "iconUrl": "https://example.com/boad-icon.png",
    "lastDayTradedPrice": "250.00",
    "currentPrice": 255.50
  }'
```

### Trading Operations

#### Buy Stock
```bash
curl -X POST http://localhost:3003/stocks/buy \
  -H "Authorization: Bearer YOUR_SOCKET_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stock_id": "STOCK_ID_HERE",
    "quantity": 10
  }'
```

#### Sell Stock
```bash
curl -X POST http://localhost:3003/stocks/sell \
  -H "Authorization: Bearer YOUR_SOCKET_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "holdingId": "HOLDING_ID_HERE",
    "quantity": 5
  }'
```

#### Get Holdings
```bash
curl -X GET http://localhost:3003/stocks/holding \
  -H "Authorization: Bearer YOUR_SOCKET_TOKEN"
```

#### Get Orders
```bash
curl -X GET http://localhost:3003/stocks/order \
  -H "Authorization: Bearer YOUR_SOCKET_TOKEN"
```

## OAuth Authentication

### Google OAuth
```bash
curl -X POST http://localhost:3003/auth/oauth \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "google",
    "id_token": "GOOGLE_ID_TOKEN_HERE"
  }'
```

### Apple OAuth
```bash
curl -X POST http://localhost:3003/auth/oauth \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "apple",
    "id_token": "APPLE_ID_TOKEN_HERE"
  }'
```

## Token Refresh

### Refresh App Token
```bash
curl -X POST http://localhost:3003/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "type": "app",
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

### Refresh Socket Token
```bash
curl -X POST http://localhost:3003/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "type": "socket",
    "refresh_token": "YOUR_SOCKET_REFRESH_TOKEN"
  }'
```

## WebSocket Connection

### Connect to WebSocket
```javascript
const socket = io('ws://localhost:4003', {
  extraHeaders: {
    'access_token': 'YOUR_SOCKET_TOKEN'
  }
});

// Subscribe to stock updates
socket.emit('SubscibeToStocks', 'AAPL');

// Subscribe to multiple stocks
socket.emit('subscribeToMultipleStocks', ['AAPL', 'GOOGL', 'TSLA']);

// Listen for stock updates
socket.on('AAPL', (data) => {
  console.log('AAPL Update:', data);
});
```

## Error Responses

All endpoints return errors in the following format:
```json
{
  "msg": "Error message here"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Testing Checklist

### Authentication Flow
- [ ] Check email (new user)
- [ ] Send OTP
- [ ] Verify OTP
- [ ] Register user
- [ ] Login user
- [ ] Refresh token
- [ ] Logout

### User Management
- [ ] Get profile
- [ ] Update profile
- [ ] Set PIN
- [ ] Verify PIN
- [ ] Upload biometric
- [ ] Verify biometric

### Stock Management
- [ ] Get all stocks
- [ ] Get stock by symbol
- [ ] Register new stock

### Trading
- [ ] Buy stock
- [ ] Sell stock
- [ ] Get holdings
- [ ] Get orders

### WebSocket
- [ ] Connect to WebSocket
- [ ] Subscribe to single stock
- [ ] Subscribe to multiple stocks
- [ ] Receive real-time updates

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGO_URI=mongodb://localhost:27017/trading-app

# JWT Secrets (use long, secure random strings)
JWT_SECRET=your_jwt_secret_key_here_very_long_and_secure
SOCKET_TOKEN_SECRET=your_socket_token_secret_here_very_long_and_secure
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here_very_long_and_secure
REFRESH_SOCKET_TOKEN_SECRET=your_socket_refresh_token_secret_here_very_long_and_secure
REGISTER_SECRET=your_register_secret_here_very_long_and_secure

# Token Expiry
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
SOCKET_ACCESS_SECRET=your_socket_access_secret_here
SOCKET_ACCESS_EXPIRY=1h
SOCKET_REFRESH_SECRET=your_socket_refresh_secret_here
SOCKET_REFRESH_EXPIRY=7d
REGISTER_SECRET_EXPIRY=10m

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password_here
MAIL_FROM=your_email@gmail.com

# Server Configuration
PORT=3003
SOCKET_PORT=4003
WEBSERVER_URI=http://localhost:3001
```

### 2. Database Setup
Make sure MongoDB is running on your system:
```bash
# Start MongoDB (if using local installation)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGO_URI in .env file
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Server
```bash
npm start
# or
npm run dev
```

### 5. Verify Setup
- Server should start on port 3003 (HTTP) and 4003 (WebSocket)
- API documentation available at: http://localhost:3003/api-docs
- Basic endpoint: http://localhost:3003/
