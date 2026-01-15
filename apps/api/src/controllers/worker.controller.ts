import type { Request, Response } from "express"
import { getWorkerHeartbeatStatus } from "../services/redis.service"

export async function getWorkerStatus(_req: Request, res: Response) {
  try {
    const status = await getWorkerHeartbeatStatus()
    return res.json(status)
  } catch (err) {
    // If Redis itself is down/unreachable, treat worker as inactive.
    console.error("Failed to read worker heartbeat:", err)
    return res.json({ active: false, ttlSeconds: null, lastSeenMs: null })
  }
}

