"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkerStatus = getWorkerStatus;
const redis_service_1 = require("../services/redis.service");
async function getWorkerStatus(_req, res) {
    try {
        // This is a rapidly-changing status endpoint; do not allow caching/ETag-based 304s.
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        const status = await (0, redis_service_1.getWorkerHeartbeatStatus)();
        return res.json(status);
    }
    catch (err) {
        // If Redis itself is down/unreachable, treat worker as inactive.
        console.error("Failed to read worker heartbeat:", err);
        return res.json({ active: false, ttlSeconds: null, lastSeenMs: null });
    }
}
