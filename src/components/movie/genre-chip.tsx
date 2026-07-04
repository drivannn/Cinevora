export function GenreChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/82">
      {children}
    </span>
  );
}
