const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.UPSTASH_REDIS_REST_URL
});

redisClient.on("connect", () => {
    console.log("✅ Redis Connected");
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

const connectRedis = async () => {
    await redisClient.connect();
};

module.exports = {
    redisClient,
    connectRedis,
};