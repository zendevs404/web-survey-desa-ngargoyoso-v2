interface StepIndicatorProps {
  step: 1 | 2;
}

const STEPS = [
  { id: 1, label: "Data Diri" },
  { id: 2, label: "Kuesioner" }
];

export default function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <div className="mx-auto flex max-w-xs items-center justify-center gap-3 sm:max-w-sm">
      {STEPS.map((item, idx) => {
        const isDone = step > item.id;
        const isActive = step === item.id;
        return (
          <div key={item.id} className="flex flex-1 items-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-forest-600 text-white"
                    : isActive
                      ? "bg-turmeric text-forest-800 shadow-glow-turmeric"
                      : "bg-black/5 dark:bg-white/10 text-ink-soft dark:text-nightforest-text/60"
                }`}
              >
                {isDone ? "✓" : item.id}
              </div>
              <span
                className={`text-[11px] font-medium ${
                  isActive ? "text-ink dark:text-nightforest-text" : "text-ink-soft/70 dark:text-nightforest-text/50"
                }`}
              >
                {item.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className="mb-4 h-0.5 flex-1 rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-forest-500 to-turmeric transition-all duration-500"
                  style={{ width: isDone ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
