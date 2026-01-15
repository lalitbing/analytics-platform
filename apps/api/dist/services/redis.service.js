"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushToQueue = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default(process.env.REDIS_URL, {
    tls: {} // REQUIRED for Upstash
});
const pushToQueue = async (data) => {
    await redis.lpush("events", JSON.stringify(data));
};
exports.pushToQueue = pushToQueue;
