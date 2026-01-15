"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackSchema = void 0;
const zod_1 = require("zod");
exports.trackSchema = zod_1.z.object({
    event: zod_1.z.string(),
    userId: zod_1.z.string().optional(),
    sessionId: zod_1.z.string().optional(),
    properties: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional()
});
