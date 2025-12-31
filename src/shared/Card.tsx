import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">{children}</div>
  );
}

export function CardHeader({
  title,
  right,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b px-5 py-4">
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-zinc-900">{title}</div>
        {subtitle ? (
          <div className="mt-0.5 truncate text-xs text-zinc-500">{subtitle}</div>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function CardBody({ children }: { children: ReactNode }) {
  return <div className="px-5 py-4">{children}</div>;
}
