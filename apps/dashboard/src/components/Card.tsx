import type { ReactNode } from 'react';

export default function Card({
  title,
  subtitle,
  actions,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={
        'relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur shadow-sm ' +
        className
      }
    >
      <div className="flex flex-col gap-3 px-4 pt-4 sm:px-5 sm:pt-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {subtitle ? (
            <p className="mt-1 text-xs text-gray-600">{subtitle}</p>
          ) : null}
        </div>
        {actions ? <div className="min-w-0 w-full sm:w-auto sm:ml-auto">{actions}</div> : null}
      </div>

      <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">{children}</div>
    </section>
  );
}
