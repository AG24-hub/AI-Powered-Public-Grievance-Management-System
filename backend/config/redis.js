const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
    console.log("✅ Redis Connected");
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("⚠️ Redis Connection Warning (continuing without cache):", err.message);
    }
};

module.exports = {
    redisClient,
    connectRedis,
};