import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const API_KEY = import.meta.env.VITE_API_KEY;

export const getEventStats = async (range: any) => {
  const q = new URLSearchParams(range).toString();

  const { data } = await axios.get(`${API}/stats/events?${q}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  return data;
};

export const getTopEvents = async (range: any) => {
  const q = new URLSearchParams(range).toString();

  const { data } = await axios.get(`${API}/stats/top-events?${q}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  return data;
};

export const trackEvent = async (
  eventName: string,
  useRedis: boolean = false,
  properties?: Record<string, unknown>
) => {
  const { data } = await axios.post(
    `${API}/track`,
    { event: eventName, useRedis, properties },
    {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
};

export const getWorkerStatus = async (signal?: AbortSignal) => {
  // Cache-bust to avoid browser 304s for this dynamic endpoint.
  const url = `${API}/worker-status?_=${Date.now()}`;
  const res = await axios.get(url, {
    headers: {
      'x-api-key': API_KEY,
    },
    signal,
    // Treat 304 as a "no update" response (some environments may still return it).
    validateStatus: (s) => (s >= 200 && s < 300) || s === 304,
  });

  if (res.status === 304) return null;
  return res.data as { active: boolean; ttlSeconds: number | null; lastSeenMs: number | null };
};
