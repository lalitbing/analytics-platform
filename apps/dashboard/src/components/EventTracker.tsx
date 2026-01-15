import { useState } from 'react';
import { trackEvent } from '../api/analytics';

export default function EventTracker({ onTracked }: { onTracked?: () => void }) {
  const [eventName, setEventName] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [useRedis, setUseRedis] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventName.trim()) {
      return;
    }

    setIsTracking(true);
    setError(null);
    try {
      await trackEvent(eventName.trim(), useRedis);
      setIsTracking(false);
      setIsOpen(false);
      setEventName('');
      onTracked?.();
    } catch (error) {
      console.error('Failed to track event:', error);
      setError('Failed to track event. Please try again.');
      setIsTracking(false);
    }
  };

  return (
    <>
      {/* Floating button bottom-right */}
      <div className="fixed bottom-4 right-4 z-40 group">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center px-4 py-2.5 rounded-full shadow-lg bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Text appears on hover (doesn't affect base padding) */}
          <span className="hidden group-hover:inline-block mr-2 whitespace-nowrap text-sm sm:text-base">
            Track custom event
          </span>
          {/* Plus icon with spin animation */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title + toggle */}
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Track Event
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-600">Use Redis</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useRedis}
                    onChange={(e) => setUseRedis(e.target.checked)}
                    disabled={isTracking}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            </div>

            {/* Body with input + button */}
            <form onSubmit={handleSubmit} className="px-4 py-4 sm:px-6 sm:py-5 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="event-name" className="text-sm font-medium text-gray-700">
                  Event name
                </label>
                <input
                  id="event-name"
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Enter event name"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                  disabled={isTracking}
                />
              </div>

              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {error}
                </div>
              ) : null}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  disabled={isTracking}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!eventName.trim() || isTracking}
                  className={
                    'px-4 py-2 rounded-md text-sm font-medium transition ' +
                    (eventName.trim() && !isTracking
                      ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                  }
                >
                  {isTracking ? 'Tracking…' : 'Track'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
