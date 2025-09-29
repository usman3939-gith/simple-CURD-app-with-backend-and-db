require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/bdConn");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(require("cors")());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Health check route for Railway
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.use("/api", require("./routes/entry"));

// Connect DB and start server
const startServer = async () => {
  try {
    await connectDB(); // waits for DB to connect
    console.log("✅ MongoDB connected");

    // Listen on all network interfaces for Railway
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
