import type { Request, Response } from "express"
import { getWorkerHeartbeatStatus } from "../services/redis.service"

export async function getWorkerStatus(_req: Request, res: Response) {
  try {
    // This is a rapidly-changing status endpoint; do not allow caching/ETag-based 304s.
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    res.setHeader("Pragma", "no-cache")
    res.setHeader("Expires", "0")

    const status = await getWorkerHeartbeatStatus()
    return res.json(status)
  } catch (err) {
    // If Redis itself is down/unreachable, treat worker as inactive.
    console.error("Failed to read worker heartbeat:", err)
    return res.json({ active: false, ttlSeconds: null, lastSeenMs: null })
  }
}

