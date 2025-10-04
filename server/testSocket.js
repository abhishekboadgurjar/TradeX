import { io } from "socket.io-client";

const socket = io("ws://localhost:4000", {
  extraHeaders: { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGRhMDI5YTM3NThhNWMyZTdiMmM5OWEiLCJpYXQiOjE3NTkxMjQ3MzIsImV4cCI6MTc2MTcxNjczMn0.w7D_6wr5qKUB3eLSTcOze-1KAH5jJEOM2d8RI-HjQuM" }
});

socket.on("connect", () => {
  console.log("✅ Connected to WebSocket:", socket.id);

  socket.emit("subscribeToMultipleStocks", ["AAPL", "GOOGL", "TSLA"]);
});

socket.on("AAPL", (data) => {
  console.log("AAPL Update:", data);
  
});

socket.on("GOOGL", (data) => {
  console.log("GOOGL update:", data);
});

socket.on("TSLA", (data) => {
  console.log("TSLA update:", data);
})