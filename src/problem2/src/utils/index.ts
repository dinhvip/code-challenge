import { ADDRESS_DISPLAY_START, ADDRESS_DISPLAY_END, ADDRESS_PREFIX } from '@/constants';

export const formatCurrency = (
    value: number,
    options: Intl.NumberFormatOptions = {}
): string => {
    return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...options,
    });
};

export const formatNumber = (
    value: number,
    decimals: number = 2
): string => {
    return value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

export const formatPercentage = (value: number): string => {
    return `${Math.abs(value).toFixed(2)}%`;
};

export const formatAddress = (
    address: string,
    start: number = ADDRESS_DISPLAY_START,
    end: number = ADDRESS_DISPLAY_END
): string => {
    if (!address) return '';
    return `${address.slice(0, start)}...${address.slice(-end)}`;
};

export const calculateExchangeRate = (
    fromPrice: number,
    toPrice: number,
    decimals: number = 6
): string => {
    if (!fromPrice || !toPrice) return '0';
    return (fromPrice / toPrice).toFixed(decimals);
};

export const calculateUsdValue = (
    amount: string,
    price: number
): string => {
    const numAmount = parseFloat(amount || '0');
    if (isNaN(numAmount) || !price) return '$0.00';
    return `$${(numAmount * price).toFixed(2)}`;
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const generateMockAddress = (): string => {
    return ADDRESS_PREFIX + Math.random().toString(16).substr(2, 40);
};

export const isValidAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export * from './api-error';
