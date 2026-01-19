export const env = {
    COINGECKO_API_URL: import.meta.env.VITE_COINGECKO_API_URL || 'https://api.coingecko.com/api/v3',
} as const;
