export default function FloatingShapes({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute -left-16 top-10 h-64 w-64 rounded-full blur-3xl opacity-30 animate-floatSlow"
        style={{ background: "radial-gradient(circle, rgb(var(--accent-2)) 0%, transparent 70%)" }}
      />
      <div
        className="absolute right-[-4rem] top-1/3 h-80 w-80 rounded-full blur-3xl opacity-25 animate-floatSlower"
        style={{ background: "radial-gradient(circle, rgb(var(--accent-1)) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full blur-3xl opacity-20 animate-floatSlow"
        style={{ background: "radial-gradient(circle, rgb(var(--accent-3)) 0%, transparent 70%)" }}
      />
    </div>
  );
}
