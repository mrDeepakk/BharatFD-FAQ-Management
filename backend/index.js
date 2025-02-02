import express from "express";
import dotenv from "dotenv";
import FAQRouter from "./routes/faqs.js";
import connnectToMongoDB from "./db/connectToMongoDB.js";
import path from "path";

dotenv.config();
const app = express();

// Connect to MongoDB
connnectToMongoDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// API routes
app.use("/api/faq", FAQRouter);

const __dirname = path.resolve();

// Serve frontend assets in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // Serve the React frontend for any unmatched routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Global error handler to catch and handle errors
app.use((err, req, res, next) => {
    res.status(400).json({ error: err });
});

// Handle 404 errors for unmatched routes
app.use("*", (req, res) => {
    res.status(404).json({
        message: "404 Page not found",
    });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});

export default app;
