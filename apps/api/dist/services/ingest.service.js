"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestEvent = void 0;
const redis_service_1 = require("./redis.service");
const supabase_1 = require("../db/supabase");
const ingestEvent = async (payload, useRedis = false) => {
    if (useRedis) {
        await (0, redis_service_1.pushToQueue)(payload);
    }
    else {
        // Direct database insert without Redis
        await supabase_1.supabase.from("events").insert({
            project_id: payload.projectId,
            event_name: payload.event,
            user_id: payload.userId,
            session_id: payload.sessionId,
            properties: payload.properties
        });
    }
};
exports.ingestEvent = ingestEvent;
