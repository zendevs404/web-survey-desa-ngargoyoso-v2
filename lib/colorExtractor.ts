export interface RGB {
  r: number;
  g: number;
  b: number;
}

function rgbToHsl({ r, g, b }: RGB) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }

  return { h: h * 360, s, l };
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (hp >= 0 && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  const m = l - c / 2;
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255)
  };
}

/**
 * Menganalisis gambar dan mengembalikan tiga warna aksen yang harmonis
 * (accent-1: gelap/dasar, accent-2: warna dominan, accent-3: pelengkap hangat)
 * berdasarkan warna yang paling sering muncul pada gambar, sambil
 * mengabaikan piksel yang nyaris putih/hitam/abu-abu netral.
 */
export function extractAccentColors(image: HTMLImageElement): {
  accent1: RGB;
  accent2: RGB;
  accent3: RGB;
} {
  const canvas = document.createElement("canvas");
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const fallback = {
    accent1: { r: 31, g: 77, b: 61 },
    accent2: { r: 227, g: 168, b: 87 },
    accent3: { r: 184, g: 92, b: 50 }
  };

  if (!ctx) return fallback;

  try {
    ctx.drawImage(image, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
    const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = data[i + 3];
      if (alpha < 200) continue;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const isNearGray = max - min < 18;
      const isNearWhite = min > 225;
      const isNearBlack = max < 30;
      if (isNearGray || isNearWhite || isNearBlack) continue;

      const step = 24;
      const key = `${Math.round(r / step)}-${Math.round(g / step)}-${Math.round(b / step)}`;
      const existing = buckets.get(key);
      if (existing) {
        existing.count += 1;
        existing.r += r;
        existing.g += g;
        existing.b += b;
      } else {
        buckets.set(key, { count: 1, r, g, b });
      }
    }

    let best: { count: number; r: number; g: number; b: number } | null = null;
    for (const bucket of buckets.values()) {
      if (!best || bucket.count > best.count) best = bucket;
    }

    if (!best) return fallback;

    const bestBucket = best;
    const dominant: RGB = {
      r: Math.round(bestBucket.r / bestBucket.count),
      g: Math.round(bestBucket.g / bestBucket.count),
      b: Math.round(bestBucket.b / bestBucket.count)
    };

    const { h, s } = rgbToHsl(dominant);
    const boostedS = Math.min(0.75, Math.max(0.45, s));

    const accent1 = hslToRgb(h, boostedS * 0.8, 0.22);
    const accent2 = hslToRgb(h, boostedS, 0.62);
    const accent3 = hslToRgb(h + 28, boostedS * 0.85, 0.5);

    return { accent1, accent2, accent3 };
  } catch {
    return fallback;
  }
}

export function applyAccentColors(colors: { accent1: RGB; accent2: RGB; accent3: RGB }) {
  const root = document.documentElement;
  root.style.setProperty("--accent-1", `${colors.accent1.r}, ${colors.accent1.g}, ${colors.accent1.b}`);
  root.style.setProperty("--accent-2", `${colors.accent2.r}, ${colors.accent2.g}, ${colors.accent2.b}`);
  root.style.setProperty("--accent-3", `${colors.accent3.r}, ${colors.accent3.g}, ${colors.accent3.b}`);
}
