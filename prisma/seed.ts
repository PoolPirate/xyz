import { upsertLaborMarket } from "~/services/marketplace-service.server";
import { fakeLaborMarket, fakeServiceRequest, fakeSubmission } from "~/utils/fakes";
import { prisma } from "~/services/prisma.server";
import { faker } from "@faker-js/faker";
import { upsertServiceRequest } from "~/services/challenges-service.server";
import { upsertSubmission } from "~/services/submission-service.server";
import type { LaborMarket, ServiceRequest } from "@prisma/client";

async function main() {
  await prisma.project.createMany({
    data: [
      { slug: "solana", name: "Solana" },
      { slug: "metricsdao", name: "MetricsDAO" },
      { slug: "avalanche", name: "Avalanche" },
      { slug: "polygon", name: "Polygon" },
      { slug: "arbitrum", name: "Arbitrum" },
      { slug: "axelar", name: "Axelar" },
      { slug: "near", name: "Near" },
      { slug: "flow", name: "Flow" },
      { slug: "ethereum", name: "Ethereum" },
    ],
  });

  await prisma.token.createMany({
    data: [
      { symbol: "ETH", name: "Ethereum" },
      { symbol: "SOL", name: "Solana" },
      { symbol: "USDC", name: "USD Coin" },
      { symbol: "MATIC", name: "Polygon" },
      { symbol: "AXL", name: "Axelar" },
      { symbol: "NEAR", name: "Near" },
      { symbol: "FLOW", name: "Flow" },
      { symbol: "AVAX", name: "Avalanche" },
    ],
  });

  async function seedLaborMarkets() {
    const projectIds = (await prisma.project.findMany()).map((p) => p.id);
    const tokenSymbols = (await prisma.token.findMany()).map((t) => t.symbol);
    // create 100 fake labor markets in prisma
    for (let i = 0; i < 100; i++) {
      await upsertLaborMarket(
        fakeLaborMarket({
          projectIds: faker.helpers.arrayElements(faker.helpers.arrayElements(projectIds, 2)), // pick between 1-2 random projects
          tokenSymbols: faker.helpers.arrayElements(tokenSymbols), // pick a subset of random tokens
        })
      );
    }
  }

  // create 10 fake service requests/challenges for each labor market in Prisma
  async function seedServiceRequests(laborMarkets: LaborMarket[]) {
    for (const laborMarket of laborMarkets) {
      await upsertServiceRequest(fakeServiceRequest({}, laborMarket.address as string));
    }
  }

  function seedSubmissions(allChallenges: ServiceRequest[]) {
    for (const challenge of allChallenges) {
      // create 10 fake submissions for each challenge in Prisma
      for (let i = 0; i < 3; i++) {
        upsertSubmission(fakeSubmission({}, challenge.id));
      }
    }
  }

  seedLaborMarkets();
  seedServiceRequests(await prisma.laborMarket.findMany());
  seedSubmissions(await prisma.serviceRequest.findMany());
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
