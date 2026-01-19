import { useWallet } from '@/components/providers';
import { useTokenPrices } from '@/hooks/useTokens';
import { calculateExchangeRate, calculateUsdValue } from '@/utils';
import type { Token } from '@/types';

export function useSwapTokens(fromToken: Token | null, toToken: Token | null) {
    const { getBalance } = useWallet();

    const tokenIds = [fromToken?.id, toToken?.id].filter((id): id is string => Boolean(id));
    const { data: prices } = useTokenPrices(tokenIds);

    const fromBalance = fromToken ? getBalance(fromToken.id) : 0;
    const toBalance = toToken ? getBalance(toToken.id) : 0;

    const exchangeRate = fromToken && toToken && prices
        ? calculateExchangeRate(prices[fromToken.id]?.usd, prices[toToken.id]?.usd)
        : '0';

    const calculateBestTrade = (
        amountIn: string,
        fToken: Token | null,
        tToken: Token | null,
        slippage: number
    ) => {
        if (!fToken || !tToken || !prices) return '';

        const numAmount = parseFloat(amountIn);
        if (isNaN(numAmount) || numAmount <= 0) return '';

        const fromPrice = prices[fToken.id]?.usd || 0;
        const toPrice = prices[tToken.id]?.usd || 0;

        if (!fromPrice || !toPrice) return '';

        const calculated = (numAmount * fromPrice) / toPrice;
        const withSlippage = calculated * (1 - slippage / 100);
        return withSlippage.toFixed(6);
    };

    const getUsdValue = (token: Token | null, amount: string) => {
        if (!token || !prices?.[token.id]) return '$0.00';
        return calculateUsdValue(amount, prices[token.id].usd);
    };

    return {
        prices,
        exchangeRate,
        fromBalance,
        toBalance,
        calculateBestTrade,
        getUsdValue
    };
}
