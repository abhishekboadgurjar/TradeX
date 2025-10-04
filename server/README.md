# TradeX API - Trading Platform Backend

A comprehensive trading platform API built with Node.js, Express, MongoDB, and WebSocket for real-time stock trading.

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Run the setup script to create .env file with secure keys
npm run setup

# Or manually create .env file (see API_TESTING_GUIDE.md)
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Database
```bash
# Make sure MongoDB is running
mongod
```

### 4. Start Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### 5. Access API
- **API Base URL**: `http://localhost:3003`
- **WebSocket URL**: `ws://localhost:4003`
- **API Documentation**: `http://localhost:3003/api-docs`

## 📋 Features

### Authentication & Security
- ✅ JWT-based authentication
- ✅ OTP email verification
- ✅ Biometric authentication (RSA)
- ✅ OAuth integration (Google, Apple)
- ✅ Account lockout protection
- ✅ Token refresh mechanism

### Stock Management
- ✅ Real-time stock price updates
- ✅ Stock registration and management
- ✅ Historical price data (1-min & 10-min intervals)
- ✅ WebSocket live updates

### Trading Operations
- ✅ Buy/Sell stocks
- ✅ Portfolio management
- ✅ Order history tracking
- ✅ Balance management

### User Management
- ✅ Profile management
- ✅ Login PIN system
- ✅ Phone number verification
- ✅ Biometric key management

## 🔧 API Endpoints

### Authentication (Non-Protected)
- `POST /auth/check-email` - Check email and send OTP
- `POST /auth/send-otp` - Send OTP to email
- `POST /auth/verify-otp` - Verify OTP code
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/oauth` - OAuth authentication
- `POST /auth/refresh-token` - Refresh access token

### User Management (Protected)
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `POST /auth/set-pin` - Set login PIN
- `POST /auth/verify-pin` - Verify login PIN
- `POST /auth/upload-biometric` - Upload biometric key
- `POST /auth/verify-biometric` - Verify biometric signature
- `POST /auth/logout` - User logout

### Stock Management (Protected)
- `GET /stocks` - Get all stocks
- `GET /stocks/stock` - Get stock by symbol
- `POST /stocks/register` - Register new stock

### Trading (Protected)
- `POST /stocks/buy` - Buy stock
- `POST /stocks/sell` - Sell stock
- `GET /stocks/holding` - Get user holdings
- `GET /stocks/order` - Get user orders

## 📚 Documentation

- **[API Testing Guide](API_TESTING_GUIDE.md)** - Complete API testing instructions
- **[API Status Report](API_STATUS_REPORT.md)** - Current status and features
- **[Swagger Documentation](http://localhost:3003/api-docs)** - Interactive API docs

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io
- **Authentication**: JWT, OAuth, Biometric
- **Email**: Nodemailer
- **Documentation**: Swagger UI
- **Security**: bcryptjs, RSA encryption

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- OTP email verification
- Biometric RSA key authentication
- Account lockout after failed attempts
- CORS protection
- Input validation and sanitization

## 📊 Real-time Features

- Live stock price updates via WebSocket
- 5-second price update intervals
- 10-minute candle data
- Daily market reset at 9:15 AM
- Trading hours validation

## 🧪 Testing

All APIs are tested and working. Use the provided curl commands in `API_TESTING_GUIDE.md` to test endpoints.

## 📝 Environment Variables

Required environment variables (see `.env.example`):
- Database connection (MongoDB)
- JWT secrets for authentication
- Email configuration for OTP
- OAuth credentials
- Server configuration

## 🚀 Deployment

The API is production-ready with:
- Error handling middleware
- Request validation
- Security headers
- Rate limiting (configurable)
- Health check endpoints

## 📞 Support

For API documentation and testing, visit:
- **Swagger UI**: `http://localhost:3003/api-docs`
- **API Testing Guide**: See `API_TESTING_GUIDE.md`
- **Status Report**: See `API_STATUS_REPORT.md`

---

**Status**: ✅ All APIs working correctly and ready for production use!
