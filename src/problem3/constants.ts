export const BLOCKCHAIN_PRIORITY: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
} as const;

export const DEFAULT_PRIORITY = -99;
