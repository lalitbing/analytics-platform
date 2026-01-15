import { Request, Response } from 'express';
import { ingestEvent } from '../services/ingest.service';

export const trackEvent = async (req: any, res: any) => {

  if (!req.project) {
    return res.status(500).json({
      error: 'Project not attached. Middleware failure.',
    });
  }

  // Check if useRedis query parameter or body parameter is set
  const useRedis = req.query.useRedis === 'true' || req.body.useRedis === true;

  await ingestEvent({
    ...req.body,
    projectId: req.project.id,
  }, useRedis);

  res.json({ success: true });
};
