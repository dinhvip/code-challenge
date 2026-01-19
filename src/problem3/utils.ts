import { BLOCKCHAIN_PRIORITY, DEFAULT_PRIORITY } from './constants';

export function getPriority(blockchain: string): number {
    return BLOCKCHAIN_PRIORITY[blockchain] ?? DEFAULT_PRIORITY;
}

export function formatAmount(amount: number): string {
    return amount.toFixed(2);
}
