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
            origin: "http://localhost:5173",
            credentials: true
        })
    );

    app.use(express.json())  //middleware that parses the incoming req, without it the req will be undefined and backend will never recieve the data from frontend.

    app.use('/api/user', userRoutes)
    app.use('/api/grievances', grievanceRoutes)
    app.use('/api/chat', chatRoutes)

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})()
