import * as redis from "redis";
const REDIS_HOST = process.env?.REDIS_URL || "redis://redis:6379";
export const redisClient = redis.createClient({
  url: REDIS_HOST,
});
