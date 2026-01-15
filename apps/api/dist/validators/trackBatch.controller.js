"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackBatch = void 0;
const ingest_service_1 = require("../services/ingest.service");
const trackBatch = async (req, res) => {
    for (const e of req.body.events) {
        await (0, ingest_service_1.ingestEvent)({
            ...e,
            projectId: req.project.id
        });
    }
    res.json({ success: true });
};
exports.trackBatch = trackBatch;
