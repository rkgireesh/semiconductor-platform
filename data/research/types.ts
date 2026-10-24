export type TopicDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type ResearchBadgeVariant = "teal" | "sky" | "blue" | "purple" | "amber" | "cyan";

export interface ResearchResource {
  title: string;
  type: "Journal" | "Conference" | "Standard / Book" | "Technical Whitepaper";
  sourceOrPublisher: string;
  url?: string;
}

export interface ResearchMetric {
  label: string;
  value: string;
}

export interface ResearchTopic {
  id: string;
  title: string;
  areaNumber: number; // 1 to 30
  area: string;       // e.g. "1. Semiconductor fundamentals and solid-state physics"
  category: string;   // High-level grouping or area name
  difficulty: TopicDifficulty;
  badgeVariant: ResearchBadgeVariant;
  year: string;
  source: string;
  explanation: string; // Concise but technically meaningful explanation
  abstract: string;    // Backward compatibility alias for explanation
  whyItMatters: string; // Why the topic matters in semiconductor engineering
  impact: string;       // Backward compatibility alias for whyItMatters
  researchQuestions: [string, string, string]; // Three key research questions or investigation points
  prerequisites: string[]; // Prerequisite knowledge
  nextSteps: string[];     // Suggested next learning steps
  applications: string[];  // Relevant applications and industry connections
  resources: ResearchResource[]; // Reliable learning resources / research paper references
  metrics: ResearchMetric[];
  keyInnovations: string[];
}

// Backward compatibility with previous interface
export type ResearchPaper = ResearchTopic;
