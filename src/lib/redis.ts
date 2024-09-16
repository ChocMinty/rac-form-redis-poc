import { createClient } from "redis";

let client: ReturnType<typeof createClient>;

export function getRedisClient() {
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
