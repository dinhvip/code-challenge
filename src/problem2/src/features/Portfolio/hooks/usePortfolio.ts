import { useState } from 'react';
import { useWallet } from '@/components/providers';
import { useTokenList, useTokenPrices } from '@/hooks/useTokens';

export function usePortfolio() {
    const { isConnected, address, balances, connectWallet, disconnectWallet } = useWallet();
    const { data: tokens } = useTokenList();
    const [showBalance, setShowBalance] = useState(true);

    const tokenIds = Object.keys(balances);
    const { data: prices } = useTokenPrices(tokenIds);

    const portfolioTokens = (() => {
        if (!tokens || !prices) return [];

        return Object.entries(balances)
            .filter(([_, amount]) => amount > 0)
            .map(([tokenId, amount]) => {
                const token = tokens.find(t => t.id === tokenId);
                const price = prices[tokenId]?.usd || 0;
                const change24h = prices[tokenId]?.usd_24h_change || 0;
                const value = (amount as number) * price;

                return {
                    id: tokenId,
                    symbol: token?.symbol?.toUpperCase() || tokenId.toUpperCase(),
                    name: token?.name || tokenId,
                    image: token?.image || '',
                    amount: amount as number,
                    price,
                    value,
                    change24h
                };
            })
            .sort((a, b) => b.value - a.value);
    })();

    const totalBalance = portfolioTokens.reduce((sum, token) => sum + token.value, 0);

    const toggleBalanceVisibility = () => setShowBalance(prev => !prev);

    return {
        isConnected,
        address,
        portfolioTokens,
        totalBalance,
        showBalance,
        toggleBalanceVisibility,
        connectWallet,
        disconnectWallet
    };
}
