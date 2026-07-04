export { KNOWLEDGE_BASE } from "./knowledgeBase";
export { SYNONYM_MAP, expandWithSynonyms } from "./synonyms";
export { OFF_TOPIC_TOPICS, SENSITIVE_TOPICS, OFF_TOPIC_ANSWER, SENSITIVE_ANSWER, isOffTopic, isSensitive } from "./guardrails";
export { GREETING, FALLBACK_ANSWER, FAQ_SUGGESTIONS } from "./messages";
export { findAnswer } from "./matcher";
export type { KnowledgeEntry, GuardrailTopic } from "./types";
