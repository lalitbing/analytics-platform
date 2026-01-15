import { useEffect, useState, type ReactNode } from 'react';
import EventTracker from './EventTracker';

function NavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'w-full cursor-pointer flex items-center justify-between rounded-xl px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-gray-900/10 ' +
        (active
          ? 'bg-gray-900 text-white hover:bg-gray-800'
          : 'text-gray-700 hover:bg-gray-100')
      }
    >
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default function AppShell({
  title,
  subtitle,
  right,
  sidebar,
  children,
  activeNav = 'Overview',
  onNavigate,
  onEventTracked,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
  activeNav?: 'Overview' | 'Events' | 'Settings';
  onNavigate?: (label: 'Overview' | 'Events' | 'Settings') => void;
  onEventTracked?: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (label: 'Overview' | 'Events' | 'Settings') => {
    onNavigate?.(label);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Subtle grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.08] bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[18px_18px]"
      />

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200/70 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold tracking-tight text-gray-900">Pulseboard</p>
            <span className="text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">
              beta
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="cursor-pointer rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 lg:hidden"
            style={{ zIndex: 100 }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl lg:hidden overflow-y-auto" style={{ zIndex: 101 }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold tracking-tight text-gray-900">Pulseboard</p>
                <span className="text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">
                  beta
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-6">
              <div className="space-y-2">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Navigation
                </p>
                <NavItem label="Overview" active={activeNav === 'Overview'} onClick={() => handleNavClick('Overview')} />
                <NavItem label="Events" active={activeNav === 'Events'} onClick={() => handleNavClick('Events')} />
                <NavItem label="Settings" active={activeNav === 'Settings'} onClick={() => handleNavClick('Settings')} />
              </div>

              <div className="rounded-2xl border border-gray-200/70 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-900">Tip</p>
                <p className="mt-1 text-xs text-gray-600">
                  Use the date range + search to isolate spikes.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 px-4 py-6 sm:px-6 lg:px-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur shadow-sm px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-gray-900">
                      Pulseboard
                    </p>
                    <p className="text-xs text-gray-600">Product analytics</p>
                  </div>
                  <span className="text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">
                    beta
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Navigation
                </p>
                <NavItem label="Overview" active={activeNav === 'Overview'} onClick={() => handleNavClick('Overview')} />
                <NavItem label="Events" active={activeNav === 'Events'} onClick={() => handleNavClick('Events')} />
                <NavItem label="Settings" active={activeNav === 'Settings'} onClick={() => handleNavClick('Settings')} />
              </div>

              <div className="rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur shadow-sm p-4">
                <p className="text-xs font-semibold text-gray-900">Tip</p>
                <p className="mt-1 text-xs text-gray-600">
                  Use the date range + search to isolate spikes.
                </p>
              </div>

              {sidebar ? (
                <div className="rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
                  {sidebar}
                </div>
              ) : null}
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0 relative">
            <header className="relative z-50 rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur shadow-sm px-4 py-4 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900">
                    {title}
                  </h1>
                  {subtitle ? (
                    <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
                  ) : null}
                </div>
                {right ? <div className="shrink-0">{right}</div> : null}
              </div>
            </header>

            <div className="relative mt-6">{children}</div>
          </main>
        </div>
      </div>

      <EventTracker onTracked={onEventTracked} />
    </div>
  );
}

