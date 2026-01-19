import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSwapForm } from './useSwapForm';
import { useWallet } from '@/components/providers';
import { useTokenPrices } from '@/hooks/useTokens';
import { useNotification } from '@/hooks/useNotification';
import { sleep } from '@/utils';
import type { Token } from '@/types';

// Mock dependencies
vi.mock('@/components/providers', () => ({
    useWallet: vi.fn()
}));

vi.mock('@/hooks/useTokens', () => ({
    useTokenPrices: vi.fn()
}));

vi.mock('@/hooks/useNotification', () => ({
    useNotification: vi.fn()
}));

vi.mock('@/utils', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/utils')>();
    return {
        ...actual,
        sleep: vi.fn(),
    };
});

// Test data
const MOCK_FROM_TOKEN: Token = {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    image: 'eth.png',
    current_price: 2000,
    market_cap: 1000000,
    market_cap_rank: 2,
    price_change_percentage_24h: 0.5
};

const MOCK_TO_TOKEN: Token = {
    id: 'tether',
    symbol: 'USDT',
    name: 'Tether',
    image: 'usdt.png',
    current_price: 1,
    market_cap: 500000,
    market_cap_rank: 3,
    price_change_percentage_24h: 0.01
};

describe('useSwapForm', () => {
    const mockShowSuccess = vi.fn();
    const mockShowError = vi.fn();
    const mockExecuteSwap = vi.fn();
    const mockConnectWallet = vi.fn();
    const mockGetBalance = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (useNotification as any).mockReturnValue({
            showSuccess: mockShowSuccess,
            showError: mockShowError,
            NotificationContainer: () => null
        });

        (useWallet as any).mockReturnValue({
            isConnected: true,
            getBalance: mockGetBalance,
            executeSwap: mockExecuteSwap,
            connectWallet: mockConnectWallet
        });

        (useTokenPrices as any).mockReturnValue({
            data: {
                'ethereum': { usd: 2000 },
                'tether': { usd: 1 }
            }
        });

        mockGetBalance.mockReturnValue(10);
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useSwapForm());

        expect(result.current.fromToken).toBeNull();
        expect(result.current.toToken).toBeNull();
        expect(result.current.fromAmount).toBe('');
        expect(result.current.toAmount).toBe('');
    });

    it('should update amounts when fromAmount changes', async () => {
        const { result } = renderHook(() => useSwapForm());

        // Set tokens first
        act(() => {
            result.current.handleFromTokenChange(MOCK_FROM_TOKEN);
            result.current.handleToTokenChange(MOCK_TO_TOKEN);
        });

        // Set fromAmount
        act(() => {
            result.current.handleFromAmountChange('1');
        });

        await waitFor(() => {
            expect(result.current.toAmount).toBe('1990.000000'); // 1 ETH * 2000 / 1 * 0.995 = 1990
        });
    });

    it('should handle insufficient balance', () => {
        mockGetBalance.mockReturnValue(0.5); // Balance less than amount

        const { result } = renderHook(() => useSwapForm());

        act(() => {
            result.current.handleFromTokenChange(MOCK_FROM_TOKEN);
            result.current.handleFromAmountChange('1');
        });

        expect(result.current.insufficientBalance).toBe(true);
        expect(result.current.canSwap).toBe(false);
    });

    it('should allow swap when conditions are met', () => {
        mockGetBalance.mockReturnValue(10);

        const { result } = renderHook(() => useSwapForm());

        act(() => {
            result.current.handleFromTokenChange(MOCK_FROM_TOKEN);
            result.current.handleToTokenChange(MOCK_TO_TOKEN);
            result.current.handleFromAmountChange('1');
        });

        expect(result.current.canSwap).toBe(true);
    });

    it('should execute swap successfully', async () => {
        const { result } = renderHook(() => useSwapForm());

        act(() => {
            result.current.handleFromTokenChange(MOCK_FROM_TOKEN);
            result.current.handleToTokenChange(MOCK_TO_TOKEN);
            result.current.handleFromAmountChange('1');
            // Wait for calculation
        });

        await act(async () => {
            await result.current.handleSubmit();
        });

        expect(sleep).toHaveBeenCalledWith(2000);
        expect(mockExecuteSwap).toHaveBeenCalledWith(
            MOCK_FROM_TOKEN.id,
            MOCK_TO_TOKEN.id,
            1,
            expect.any(Number) // toAmount
        );
        expect(mockShowSuccess).toHaveBeenCalled();

        // Should reset form
        await waitFor(() => {
            expect(result.current.fromAmount).toBe('');
            expect(result.current.toAmount).toBe('');
        });
    });

    it('should swap tokens when direction button is clicked', async () => {
        const { result } = renderHook(() => useSwapForm());

        act(() => {
            result.current.handleFromTokenChange(MOCK_FROM_TOKEN);
            result.current.handleToTokenChange(MOCK_TO_TOKEN);
            result.current.handleFromAmountChange('');
        });

        act(() => {
            result.current.handleSwapDirection();
        });

        await waitFor(() => {
            expect(result.current.fromToken?.id).toBe(MOCK_TO_TOKEN.id);
            expect(result.current.toToken?.id).toBe(MOCK_FROM_TOKEN.id);
        });
    });

    it('should set max balance when handleMaxClick is called', () => {
        const { result } = renderHook(() => useSwapForm());

        act(() => {
            result.current.handleFromTokenChange(MOCK_FROM_TOKEN);
            result.current.handleToTokenChange(MOCK_TO_TOKEN);
        });

        act(() => {
            result.current.handleMaxClick();
        });

        expect(result.current.fromAmount).toBe('10'); // mocked balance
    });
});
