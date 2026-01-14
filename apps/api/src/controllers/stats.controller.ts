import { supabase } from '../db/supabase';

export const getEventStats = async (req: any, res: any) => {
  try {
    const { from, to } = req.query;

    let q = supabase
      .from('events')
      .select('created_at')
      .eq('project_id', req.project.id);

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      // move "to" date to end of day
      toDate.setHours(23, 59, 59, 999);

      q = q
        .gte('created_at', fromDate.toISOString())
        .lte('created_at', toDate.toISOString());
    }

    const { data, error } = await q;

    if (error) throw error;

    res.json(data || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch event stats' });
  }
};

export const getTopEvents = async (req: any, res: any) => {
  try {
    const { from, to } = req.query;

    let q = supabase
      .from('events')
      .select('event_name')
      .eq('project_id', req.project.id);

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      // move "to" date to end of day
      toDate.setHours(23, 59, 59, 999);

      q = q
        .gte('created_at', fromDate.toISOString())
        .lte('created_at', toDate.toISOString());
    }

    const { data, error } = await q;

    if (error) throw error;

    const grouped = (data || []).reduce((acc: any, e: any) => {
      acc[e.event_name] = (acc[e.event_name] || 0) + 1;
      return acc;
    }, {});

    res.json(
      Object.entries(grouped).map(([k, v]) => ({
        event_name: k,
        count: v,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch top events' });
  }
};
