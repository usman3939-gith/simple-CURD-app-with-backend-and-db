require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/bdConn");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api", require("./routes/entry"));

// Connect DB and start server
const startServer = async () => {
    try {
        await connectDB(); // wait until DB connects
        mongoose.connection.once("open", () => {
            console.log(" Connected to MongoDB");
            app.listen(PORT, () =>
                console.log(`🚀 Server running on http://localhost:${PORT}`)
            );
        });
    } catch (err) {
        console.error(" DB connection failed:", err.message);
        process.exit(1);
    }
};

startServer();
