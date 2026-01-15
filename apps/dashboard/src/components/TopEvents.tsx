import { useMemo } from 'react';

export default function TopEvents({
  data,
  loading,
}: {
  data: any[];
  loading?: boolean;
}) {
  const maxCount = useMemo(() => Math.max(...data.map((e) => Number(e.count) || 0), 1), [data]);
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-3 bg-gray-50 p-3 rounded-xl animate-pulse"
          >
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-10 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white px-4 py-6 text-center">
        <p className="text-sm font-medium text-gray-900">No events to show</p>
        <p className="mt-1 text-xs text-gray-600">Try tracking an event or widening the date range.</p>
      </div>
    );
  }

  const visible = data.slice(0, 5);

  return (
    <div>
      <ul className="space-y-2">
        {visible.map((e) => (
          <li
            key={e.event_name}
            className="rounded-xl border border-gray-100 bg-white p-3 text-sm sm:text-base hover:border-gray-200 transition"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate font-medium text-gray-900">{e.event_name}</span>
              <span className="shrink-0 font-semibold text-gray-900 tabular-nums">{e.count}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gray-900/80"
                style={{ width: `${Math.round(((Number(e.count) || 0) / maxCount) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
