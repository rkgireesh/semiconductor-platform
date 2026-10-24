export * from "./research";

import { RESEARCH_TOPICS, ResearchTopic } from "./research";

// Backward-compatibility export for components referencing RESEARCH_PAPERS
export const RESEARCH_PAPERS: ResearchTopic[] = RESEARCH_TOPICS;
