/**
 * Utilitas pemrosesan teks untuk Smart Intent Matching:
 * - normalisasi teks
 * - tokenisasi
 * - fuzzy search berbasis Levenshtein distance (toleransi typo)
 */

/** Menghilangkan tanda baca, spasi berlebih, dan menyamakan huruf kecil. */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(" ")
    .filter((t) => t.length > 0);
}

/** Levenshtein distance klasik (dynamic programming). */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const prev: number[] = Array.from({ length: b.length + 1 }, (_, i) => i);
  const curr: number[] = new Array(b.length + 1).fill(0);

  for (let i = 1; i <= a.length; i += 1) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        curr[j - 1] + 1, // insertion
        prev[j] + 1, // deletion
        prev[j - 1] + cost // substitution
      );
    }
    for (let j = 0; j <= b.length; j += 1) prev[j] = curr[j];
  }
  return prev[b.length];
}

/**
 * Toleransi jarak fuzzy berdasarkan panjang kata, supaya kata pendek
 * tidak terlalu longgar dicocokkan (mengurangi false positive).
 */
function toleranceFor(length: number): number {
  if (length <= 3) return 0;
  if (length <= 6) return 1;
  return 2;
}

/** Mengecek apakah sebuah token pengguna "mirip" dengan sebuah kata kunci. */
export function isFuzzyMatch(userToken: string, keywordToken: string): boolean {
  if (userToken === keywordToken) return true;
  if (userToken.length < 3 || keywordToken.length < 3) return false;
  const distance = levenshtein(userToken, keywordToken);
  return distance <= toleranceFor(keywordToken.length);
}
