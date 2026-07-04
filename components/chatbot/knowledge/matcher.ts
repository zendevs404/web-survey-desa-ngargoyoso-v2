import { KNOWLEDGE_BASE } from "./knowledgeBase";
import { expandWithSynonyms } from "./synonyms";
import { isFuzzyMatch, normalizeText, tokenize } from "./textUtils";
import { FALLBACK_ANSWER } from "./messages";
import { isOffTopic, isSensitive, OFF_TOPIC_ANSWER, SENSITIVE_ANSWER } from "./guardrails";
import type { KnowledgeEntry } from "./types";

const KEYWORD_SCORE = 3;
const SYNONYM_SCORE = 2;
const FUZZY_SCORE = 1;

/**
 * Menghitung skor kecocokan sebuah entry knowledge base terhadap pesan
 * pengguna, memakai tiga lapis Smart Intent Matching:
 * 1) Keyword Matching (substring langsung)
 * 2) Synonym Matching (variasi kata via SYNONYM_MAP)
 * 3) Fuzzy Search (toleransi typo via Levenshtein distance)
 */
function scoreEntry(entry: KnowledgeEntry, normalizedMessage: string, userTokens: string[], synonymHits: string[]): number {
  let score = 0;

  for (const keyword of entry.keywords) {
    if (normalizedMessage.includes(normalizeText(keyword))) {
      score += KEYWORD_SCORE;
    }
  }

  for (const synonym of entry.synonyms ?? []) {
    if (normalizedMessage.includes(normalizeText(synonym))) {
      score += SYNONYM_SCORE;
    }
  }

  // Synonym matching lintas-kamus: jika kata kunci kanonik yang terpicu
  // oleh SYNONYM_MAP muncul sebagai bagian dari keyword entry ini.
  for (const canonical of synonymHits) {
    if (entry.keywords.some((kw) => normalizeText(kw).includes(canonical))) {
      score += SYNONYM_SCORE;
    }
  }

  // Fuzzy search: bandingkan tiap token pengguna dengan tiap token keyword.
  const keywordTokens = entry.keywords.flatMap((kw) => tokenize(kw));
  for (const userToken of userTokens) {
    for (const kwToken of keywordTokens) {
      if (isFuzzyMatch(userToken, kwToken)) {
        score += FUZZY_SCORE;
        break;
      }
    }
  }

  return score;
}

/**
 * Mencari jawaban terbaik dari knowledge base untuk pesan pengguna.
 * Urutan prioritas:
 *  1. Guardrail off-topic -> tolak dengan pesan baku.
 *  2. Guardrail sensitif -> arahkan kembali tanpa opini.
 *  3. Smart Intent Matching terhadap knowledge base -> jawaban terbaik.
 *  4. Fallback response jika tidak ada kecocokan memadai.
 */
export function findAnswer(message: string): string {
  const normalized = normalizeText(message);
  if (!normalized) return FALLBACK_ANSWER;

  if (isOffTopic(normalized)) return OFF_TOPIC_ANSWER;
  if (isSensitive(normalized)) return SENSITIVE_ANSWER;

  const userTokens = tokenize(message);
  const synonymHits = expandWithSynonyms(normalized);

  let bestEntry: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    const score = scoreEntry(entry, normalized, userTokens, synonymHits);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // Ambang batas minimum supaya kecocokan acak (skor sangat rendah) tidak
  // dipaksakan menjadi jawaban yang kurang relevan.
  const MIN_SCORE_THRESHOLD = SYNONYM_SCORE; // hindari jawaban dari kecocokan fuzzy tunggal yang lemah
  if (bestEntry && bestScore >= MIN_SCORE_THRESHOLD) {
    return bestEntry.answer;
  }

  return FALLBACK_ANSWER;
}
