const express = require('express')
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require('./config/db');
const userRoutes = require("./Routes/userRoutes");
const grievanceRoutes = require("./Routes/grievanceRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const { connectRedis } = require('./config/redis');

dotenv.config();
connectDB();

(async()=>{
    await connectRedis()
    const app = express()

    app.use(
        cors({
            origin: function (origin, callback) {
                // allow requests with no origin (like mobile apps, curl, or server-to-server)
                if (!origin) return callback(null, true);

                const allowedOrigins = [
                    "http://localhost:5173",
                    "http://localhost:4173",
                    process.env.FRONTEND_URL
                ].filter(Boolean);

                if (
                    allowedOrigins.includes(origin) ||
                    process.env.FRONTEND_URL === "*" ||
                    !process.env.FRONTEND_URL ||
                    process.env.NODE_ENV !== "production"
                ) {
                    return callback(null, origin);
                }

                return callback(null, origin);
            },
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
            allowedHeaders: ["Content-Type", "Authorization"]
        })
    );

    app.use(express.json())  //middleware that parses the incoming req, without it the req will be undefined and backend will never recieve the data from frontend.

    app.use('/api/user', userRoutes)
    app.use('/api/grievances', grievanceRoutes)
    app.use('/api/chat', chatRoutes)

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})()
