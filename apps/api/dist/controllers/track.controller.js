"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackEvent = void 0;
const ingest_service_1 = require("../services/ingest.service");
const trackEvent = async (req, res) => {
    if (!req.project) {
        return res.status(500).json({
            error: 'Project not attached. Middleware failure.',
        });
    }
    // Check if useRedis query parameter or body parameter is set
    const useRedis = req.query.useRedis === 'true' || req.body.useRedis === true;
    await (0, ingest_service_1.ingestEvent)({
        ...req.body,
        projectId: req.project.id,
    }, useRedis);
    res.json({ success: true });
};
exports.trackEvent = trackEvent;
