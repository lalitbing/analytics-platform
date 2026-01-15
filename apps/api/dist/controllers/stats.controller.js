"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopEvents = exports.getEventStats = void 0;
const supabase_1 = require("../db/supabase");
const getEventStats = async (req, res) => {
    try {
        const { from, to } = req.query;
        let q = supabase_1.supabase
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
        if (error)
            throw error;
        res.json(data || []);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch event stats' });
    }
};
exports.getEventStats = getEventStats;
const getTopEvents = async (req, res) => {
    try {
        const { from, to } = req.query;
        let q = supabase_1.supabase
            .from('events')
            .select('event_name, created_at')
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
        if (error)
            throw error;
        const events = (data || []).filter((e) => e?.event_name && e?.created_at);
        const grouped = events.reduce((acc, e) => {
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
        const top = Object.entries(grouped).map(([event_name, v]) => ({
            event_name,
            count: v.count,
            last_seen: v.last_seen,
        }));
        res.json({
            top,
            events,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch top events' });
    }
};
exports.getTopEvents = getTopEvents;
