"use client";

import { RATING_SCALE } from "./ratingScale";

interface RatingQuestionProps {
  name: string;
  number: number;
  question: string;
  value: number | null;
  onChange: (value: number) => void;
  showError?: boolean;
}

export default function RatingQuestion({
  name,
  number,
  question,
  value,
  onChange,
  showError
}: RatingQuestionProps) {
  return (
    <fieldset
      className={`card-modern glass p-5 transition-shadow duration-300 sm:p-6 ${
        showError ? "ring-2 ring-clay/70" : ""
      }`}
    >
      <legend className="flex gap-3 pb-4 text-sm font-medium leading-relaxed sm:text-base">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-100 dark:bg-nightforest-surface2 font-display text-xs font-bold text-forest-700 dark:text-turmeric-light">
          {number}
        </span>
        <span>{question}</span>
      </legend>

      <div className="grid grid-cols-5 gap-2">
        {RATING_SCALE.map((item) => {
          const checked = value === item.value;
          return (
            <label
              key={item.value}
              className="rating-option group flex flex-col items-center gap-1.5"
            >
              <input
                type="radio"
                name={name}
                value={item.value}
                checked={checked}
                onChange={() => onChange(item.value)}
              />
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 sm:h-12 sm:w-12 ${
                  checked ? "scale-110 text-white shadow-glass" : "text-ink/70 dark:text-nightforest-text/70"
                }`}
                style={{
                  backgroundColor: checked ? item.color : item.bg,
                  outline: checked ? `2px solid ${item.color}` : "none",
                  outlineOffset: 2
                }}
              >
                {item.value}
              </span>
              <span className="text-center text-[10px] font-medium leading-tight text-ink-soft dark:text-nightforest-text/60 sm:text-[11px]">
                {item.short}
              </span>
            </label>
          );
        })}
      </div>
      {showError && (
        <p className="mt-3 text-xs font-medium text-clay">Pertanyaan ini wajib diisi.</p>
      )}
    </fieldset>
  );
}
