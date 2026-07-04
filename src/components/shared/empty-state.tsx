import { Film } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="grid min-h-[360px] place-items-center rounded-lg border border-white/10 bg-white/[0.03] px-6 text-center">
      <div>
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
          <Film size={26} />
        </div>
        <h2 className="font-display text-3xl font-semibold text-white">{title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      </div>
    </div>
  );
}
