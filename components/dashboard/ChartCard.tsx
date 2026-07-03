import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({
  title,
  description,
  action,
  children,
  className = ""
}: ChartCardProps) {
  return (
    <div className={`card-modern glass h-full p-6 sm:p-7 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
          {description && (
            <p className="mt-1 text-xs text-ink-soft dark:text-nightforest-text/60">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}
