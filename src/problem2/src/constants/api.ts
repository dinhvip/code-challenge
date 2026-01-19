export const QUERY_KEYS = {
    TOKENS: ['tokens'] as const,
    PRICES: (tokenIds: string[]) => ['prices', tokenIds] as const,
} as const;

export const API_CONFIG = {
    COINGECKO_BASE_URL: 'https://api.coingecko.com/api/v3',
    DEFAULT_TIMEOUT: 10000,
    RETRY_COUNT: 3,
} as const;


