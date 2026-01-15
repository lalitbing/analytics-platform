"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WORKER_HEARTBEAT_KEY = exports.pushToQueue = exports.redis = void 0;
exports.getWorkerHeartbeatStatus = getWorkerHeartbeatStatus;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default(process.env.REDIS_URL, {
    tls: {} // REQUIRED for Upstash
});
const pushToQueue = async (data) => {
    await exports.redis.lpush("events", JSON.stringify(data));
};
exports.pushToQueue = pushToQueue;
exports.WORKER_HEARTBEAT_KEY = "pulseboard:worker:heartbeat";
async function getWorkerHeartbeatStatus() {
    const [exists, ttlSeconds, lastSeenRaw] = await Promise.all([
        exports.redis.exists(exports.WORKER_HEARTBEAT_KEY),
        exports.redis.ttl(exports.WORKER_HEARTBEAT_KEY),
        exports.redis.get(exports.WORKER_HEARTBEAT_KEY),
    ]);
    const active = exists === 1 && ttlSeconds > 0;
    const lastSeenMs = lastSeenRaw ? Number(lastSeenRaw) : null;
    return {
        active,
        ttlSeconds: ttlSeconds > 0 ? ttlSeconds : null,
        lastSeenMs: Number.isFinite(lastSeenMs) ? lastSeenMs : null,
    };
}
