import Redis from "ioredis"

export const redis = new Redis(process.env.REDIS_URL!, {
  tls: {}   // REQUIRED for Upstash
})

export const pushToQueue = async (data: any) => {
  await redis.lpush("events", JSON.stringify(data))
}

export const WORKER_HEARTBEAT_KEY = "pulseboard:worker:heartbeat"

export async function getWorkerHeartbeatStatus() {
  const [exists, ttlSeconds, lastSeenRaw] = await Promise.all([
    redis.exists(WORKER_HEARTBEAT_KEY),
    redis.ttl(WORKER_HEARTBEAT_KEY),
    redis.get(WORKER_HEARTBEAT_KEY),
  ])

  const active = exists === 1 && ttlSeconds > 0
  const lastSeenMs = lastSeenRaw ? Number(lastSeenRaw) : null

  return {
    active,
    ttlSeconds: ttlSeconds > 0 ? ttlSeconds : null,
    lastSeenMs: Number.isFinite(lastSeenMs as number) ? lastSeenMs : null,
  }
}
