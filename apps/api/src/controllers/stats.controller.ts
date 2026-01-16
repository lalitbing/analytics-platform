import { supabase } from '../db/supabase';

const toIsoStartUtc = (d: string) => {
  // If a full ISO timestamp is provided, respect it.
  if (d.includes('T')) return new Date(d).toISOString();
  // `YYYY-MM-DD` should be treated as UTC day boundary.
  return new Date(`${d}T00:00:00.000Z`).toISOString();
};

const toIsoEndUtc = (d: string) => {
  if (d.includes('T')) return new Date(d).toISOString();
  return new Date(`${d}T23:59:59.999Z`).toISOString();
};

export const getEventStats = async (req: any, res: any) => {
  try {
    const { from, to } = req.query;

    let q = supabase.from('events').select('created_at').eq('project_id', req.project.id);

    if (from && to) {
      q = q.gte('created_at', toIsoStartUtc(String(from))).lte('created_at', toIsoEndUtc(String(to)));
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
    const TOP_LIMIT = 5;

    let q = supabase.from('events').select('event_name, created_at').eq('project_id', req.project.id);

    if (from && to) {
      q = q.gte('created_at', toIsoStartUtc(String(from))).lte('created_at', toIsoEndUtc(String(to)));
    }

    const { data, error } = await q;

    if (error) throw error;

    const events = (data || []).filter((e: any) => e?.event_name && e?.created_at);

    const grouped = events.reduce((acc: any, e: any) => {
      const key = e.event_name;
      if (!acc[key]) {
        acc[key] = { count: 0, last_seen: e.created_at };
      }

      acc[key].count += 1;
      if (e.created_at > acc[key].last_seen) {
        acc[key].last_seen = e.created_at;
      }

      return acc;
    }, {});

    const top = Object.entries(grouped).map(([event_name, v]: any) => ({
      event_name,
      count: v.count,
      last_seen: v.last_seen,
    }));

    // Sort by frequency (descending), then recency (descending), then name (ascending)
    top.sort((a: any, b: any) => {
      if (b.count !== a.count) return b.count - a.count;
      if (b.last_seen !== a.last_seen) return String(b.last_seen).localeCompare(String(a.last_seen));
      return String(a.event_name).localeCompare(String(b.event_name));
    });

    res.json({
      top: top.slice(0, TOP_LIMIT),
      events,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch top events' });
  }
};
