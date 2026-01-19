export * from './portfolio';
export * from './api';

export const POPULAR_TOKENS = [
    'ethereum',
    'usd-coin',
    'tether',
    'wrapped-bitcoin'
] as const satisfies readonly string[];

export const MOCK_WALLET_BALANCES: Record<string, number> = {
    'ethereum': 5.5,
    'bitcoin': 0.25,
    'tether': 10000,
    'usd-coin': 5000,
    'binancecoin': 2.8,
    'cardano': 1500,
    'solana': 45,
    'ripple': 8000,
    'polkadot': 350,
    'dogecoin': 25000,
} as const;

export const ADDRESS_LENGTH = 42;
export const ADDRESS_PREFIX = '0x';
export const ADDRESS_DISPLAY_START = 6;
export const ADDRESS_DISPLAY_END = 4;

export const SWAP_DEFAULT_SLIPPAGE = 0.5;
export const SWAP_SLIPPAGE_OPTIONS = [0.5, 1, 3] as const;
export const SWAP_MAX_SLIPPAGE = 100;
export const SWAP_MIN_SLIPPAGE = 0;

export const ANIMATION_DURATION = 1000;
export const TYPING_DEBOUNCE = 300;

export const NOTIFICATION_DEFAULT_DURATION = 4;
export const NOTIFICATION_MAX_DURATION = 60;

export const QUERY_TIME = 30000;
