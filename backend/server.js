const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoutes = require("./Routes/userRoutes")

dotenv.config();
connectDB();

const app = express()

app.use(express.json())  //middleware that parses the incoming req, without it the req will be undefined and backend will never recieve the data from frontend.

app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));