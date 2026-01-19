import { useQuery } from '@tanstack/react-query';
import { coinGeckoApi, type Token, type TokenPrices } from '@/services/coingecko';
import { QUERY_KEYS } from '@/constants/api';
import { QUERY_TIME } from '@/constants';

export const useTokenList = () => {
    return useQuery<Token[]>({
        queryKey: QUERY_KEYS.TOKENS,
        queryFn: coinGeckoApi.getTopTokens,
    });
};

export const useTokenPrices = (tokenIds: string[]) => {
    return useQuery<TokenPrices>({
        queryKey: QUERY_KEYS.PRICES(tokenIds),
        queryFn: () => coinGeckoApi.getTokenPrices(tokenIds),
        enabled: tokenIds.length > 0,
        refetchInterval: QUERY_TIME,
    });
};
