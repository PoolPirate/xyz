export const PROJECT_ICONS: Record<string, string | undefined> = {
  Ethereum: "/img/icons/project-icons/eth.svg",
  Solana: "/img/icons/project-icons/sol.svg",
};

export const TOKEN_ICONS: Record<string, string | undefined> = {
  Algorand: "/img/icons/token-icons/algo.svg",
  Axelar: "/img/icons/token-icons/algo.svg",
  Ethereum: "/img/icons/token-icons/eth.svg",
  Flow: "/img/icons/token-icons/flow.svg",
  Near: "/img/icons/token-icons/near.svg",
  Rune: "/img/icons/token-icons/rune.svg",
  Solana: "/img/icons/token-icons/sol.svg",
  USDC: "/img/icons/token-icons/usdc.svg",
};

export const truncateAddress = (address: string) => {
  if (address.length < 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const SCORE_COLOR = {
  Great: "bg-lime-100",
  Good: "bg-violet-200",
  Average: "bg-neutral-200",
  Bad: "bg-amber-100",
  Spam: "bg-rose-200",
};

export const SCORE_COLOR_SECONDARY = {
  Great: "bg-lime-400",
  Good: "bg-blue-400",
  Average: "bg-zinc-500",
  Bad: "bg-orange-300",
  Spam: "bg-rose-400",
};
