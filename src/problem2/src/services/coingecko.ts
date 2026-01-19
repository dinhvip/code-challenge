import { env } from '@/configs/env';
import { handleApiError, ApiError } from '@/utils/api-error';

import topTokensMock from './getTopTokensMock.json';
import tokenPricesMock from './getTokenPricesMock.json';

export interface Token {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
}

export interface TokenPriceData {
    usd: number;
    usd_24h_change?: number;
}

export type TokenPrices = Record<string, TokenPriceData>;

export const coinGeckoApi = {
    getTopTokens: async (): Promise<Token[]> => {
        try {
            const response = await fetch(
                `${env.COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false`
            );

            if (!response.ok) {
                const apiError = new ApiError(
                    'Failed to fetch tokens',
                    response.status,
                    'FETCH_ERROR'
                );
                throw apiError;
            }

            const data = await response.json();
            return data;
        } catch (error) {
            const apiError = handleApiError(error);
            console.warn('[CoinGecko API] Falling back to mock data:', apiError.message);
            return topTokensMock as unknown as Token[];
        }
    },

    getTokenPrices: async (tokenIds: string[]): Promise<TokenPrices> => {
        const ids = tokenIds.join(',');

        try {
            const response = await fetch(
                `${env.COINGECKO_API_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
            );

            if (!response.ok) {
                const apiError = new ApiError(
                    'Failed to fetch prices',
                    response.status,
                    'FETCH_ERROR'
                );
                throw apiError;
            }

            return await response.json();
        } catch (error) {
            const apiError = handleApiError(error);
            console.warn('[CoinGecko API] Falling back to mock data:', apiError.message);

            const mockPrices = tokenPricesMock as unknown as TokenPrices;
            const result: TokenPrices = {};

            tokenIds.forEach(id => {
                if (mockPrices[id]) {
                    result[id] = mockPrices[id];
                }
            });

            return result;
        }
    },
};
