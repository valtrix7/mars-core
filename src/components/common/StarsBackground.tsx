export default function StarsBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[var(--theme-bg)] transition-colors duration-500">
      <div className="absolute top-8 left-8 border-l-2 border-t-2 border-[var(--theme-border)] w-16 h-16 pointer-events-none" />
      <div className="absolute top-8 right-8 border-r-2 border-t-2 border-[var(--theme-border)] w-16 h-16 pointer-events-none" />
      <div className="absolute bottom-8 left-8 border-l-2 border-b-2 border-[var(--theme-border)] w-16 h-16 pointer-events-none" />
      <div className="absolute bottom-8 right-8 border-r-2 border-b-2 border-[var(--theme-border)] w-16 h-16 pointer-events-none" />
      <div className="absolute -inset-10 bg-grid-pattern animate-grid opacity-10 pointer-events-none" />
    </div>
  );
}
