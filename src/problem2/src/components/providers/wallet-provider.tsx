import { createContext, useContext, useState } from 'react';
import type { WalletContextType, WalletProviderProps } from '@/types';
import { MOCK_WALLET_BALANCES } from '@/constants';
import { generateMockAddress } from '@/utils';

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: WalletProviderProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [balances, setBalances] = useState<Record<string, number>>({});

    const connectWallet = async () => {
        setAddress(generateMockAddress());
        setIsConnected(true);
        setBalances(MOCK_WALLET_BALANCES);
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setAddress(null);
        setBalances({});
    };

    const getBalance = (tokenId: string): number => {
        return balances[tokenId] || 0;
    };

    const updateBalance = (tokenId: string, amount: number) => {
        setBalances(prev => ({
            ...prev,
            [tokenId]: (prev[tokenId] || 0) + amount
        }));
    };

    const executeSwap = (fromTokenId: string, toTokenId: string, fromAmount: number, toAmount: number) => {
        updateBalance(fromTokenId, -fromAmount);
        updateBalance(toTokenId, toAmount);
    };

    return (
        <WalletContext.Provider value={{
            isConnected,
            address,
            balances,
            connectWallet,
            disconnectWallet,
            getBalance,
            executeSwap
        }}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet(): WalletContextType {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}
