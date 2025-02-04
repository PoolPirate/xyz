export type Address = string;

export const Projects = [
  { slug: "solana", name: "Solana" },
  { slug: "ethereum", name: "Ethereum" },
  { slug: "thor", name: "Thorchain" },
  { slug: "axelar", name: "Axelar" },
  { slug: "aave", name: "AAVE" },
] as const;

export type ProjectSlug = typeof Projects[number]["slug"];

// Enum for the different types of projects MDAO supports.
export type ProgramType = "brainstorm" | "community";

// A Program is a collection of Challenges and related config.
export type Marketplace = {
  id: string;
  type: ProgramType;
  title: string;
  description: string;
  startsAt?: Date;
  endsAt?: Date;
  privacy: "public" | "private";
  creator: Address;
  authorRepMin: number;
  authorRepMax?: number;
  reviewerRepMin: number;
  reviewerRepMax?: number;
  rewardCurve: number;
  rewardTokens: string[];
  reviewMethod: "likert";
  rewardPool: number;
  reviewPriorityFactor: "cheap" | "normal" | "aggressive";
  project: string;
  entryCost: number;
  challengeCount: number;
  reviewDeadline?: Date;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  programId: string;
  payCurve: string;
  startsAt?: Date;
  endsAt?: Date;
  status: "pending" | "active" | "review" | "closed";
  sponsor: Address;
};

export type UnsavedChallenge = Omit<Challenge, "id">;

export type ChallengeWithMarketplace = Challenge & { marketplace: Marketplace };

export type Submission = {
  id: string;
  author: Address;
};

export type LikertReview = {
  type: "likert";
  submissionId: string;
  reviewer: Address;
  score: number;
};

export type Review = LikertReview;
