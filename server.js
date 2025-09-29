require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/bdConn");

const app = express();
const PORT = process.env.PORT; // ❌ remove fallback 8080

// Middleware
app.use(require("cors")());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check route
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Frontend route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.use("/api", require("./routes/entry"));

// Start server after DB connects
const startServer = async () => {
    try {
        await connectDB();
        console.log("✅ MongoDB connected");

        // Listen on all network interfaces
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ DB connection failed:", err.message);
        process.exit(1);
    }
};

startServer();
