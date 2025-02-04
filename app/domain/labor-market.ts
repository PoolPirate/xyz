import { faker } from "@faker-js/faker";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { EthAddressSchema } from "./address";

export const LaborMarketSchema = z.object({
  address: z.string(),
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  type: z.enum(["brainstorm", "analyze"]),
  launch: z.discriminatedUnion("access", [
    z.object({ access: z.literal("anyone") }),
    z.object({
      access: z.literal("delegates"),
      badgerAddress: EthAddressSchema,
      badgerTokenId: z.string().min(1, "Required"),
    }),
  ]),
  rewardCurveAddress: EthAddressSchema,
  submitRepMin: zfd.numeric(z.number()),
  submitRepMax: zfd.numeric(z.number()),
  reviewBadgerAddress: EthAddressSchema,
  reviewBadgerTokenId: z.string().min(1, "Required"),
  tokenSymbols: zfd.repeatable(z.array(z.string()).min(1, "Required")),
  projectIds: zfd.repeatable(z.array(z.string()).min(1, "Required")),
  sponsorAddress: EthAddressSchema,
});

// The properties of a LaborMarket that live off-chain (e.g IPFS). These are properties that are specific to the MDAO app.
export const LaborMarketMetaSchema = LaborMarketSchema.pick({
  title: true,
  description: true,
  type: true,
  projectIds: true,
  rewardTokens: true,
});

export const LaborMarketNewSchema = LaborMarketSchema.omit({ address: true, sponsorAddress: true });

// Generate a fake LaborMarketNew for testing using faker.
export function fakeLaborMarketNew(): LaborMarketNew {
  return {
    title: faker.commerce.productName(),
    description: faker.lorem.paragraphs(2),
    type: "brainstorm",
    launch: {
      access: "anyone",
    },
    rewardCurveAddress: faker.finance.ethereumAddress(),
    submitRepMin: faker.datatype.number(100),
    submitRepMax: faker.datatype.number(100),
    reviewBadgerAddress: faker.finance.ethereumAddress(),
    reviewBadgerTokenId: faker.datatype.number(100).toString(),
    tokenSymbols: ["ETH"],
    projectIds: [],
  };
}

// Schema for a labor market with an IPFS CID.
export const LaborMarketPreparedSchema = LaborMarketNewSchema.extend({ ipfsHash: z.string() });

// Used for searching and filtering marketplaces.
export const LaborMarketSearchSchema = z.object({
  q: z.string().optional().describe("Search query."),
  sortBy: z.enum(["title", "serviceRequests"]).default("title").describe("Sort by column."),
  type: z.enum(["brainstorm", "analyze"]).describe("Type of the labor market (MDAO specific)."),
  order: z.enum(["asc", "desc"]).default("desc").describe("Order of the results."),
  project: z.array(z.string()).optional().describe("Project IDs to filter by."),
  token: z.array(z.string()).optional().describe("Token symbols to filter by."),
  page: z.number().min(1).default(1).describe("Page number."),
  first: z.number().min(1).max(100).default(12).describe("The number of results to return."),
});

export type LaborMarket = z.infer<typeof LaborMarketSchema>;
export type LaborMarketNew = z.infer<typeof LaborMarketNewSchema>;
export type LaborMarketPrepared = z.infer<typeof LaborMarketPreparedSchema>;
export type LaborMarketMeta = z.infer<typeof LaborMarketMetaSchema>;
export type LaborMarketSearch = z.infer<typeof LaborMarketSearchSchema>;
