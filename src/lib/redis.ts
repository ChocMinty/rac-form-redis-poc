import { createClient, RedisClientType } from "redis";

let client: RedisClientType;

export function getRedisClient(): RedisClientType {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL,
    });

    client.on("error", (err) => {
      console.error("Redis client error:", err);
    });

    client.connect();
  }

  return client;
}
