import { describe, it, expect } from 'vitest';
import {
    formatCurrency,
    formatNumber,
    formatPercentage,
    formatAddress,
    calculateExchangeRate,
    calculateUsdValue,
    isValidAddress,
    generateMockAddress
} from './index';
import { ADDRESS_PREFIX } from '@/constants';

describe('Utils', () => {
    describe('formatCurrency', () => {
        it('formats number with default options', () => {
            expect(formatCurrency(1234.56)).toBe('1,234.56');
        });

        it('formats number with custom options', () => {
            expect(formatCurrency(1234.5678, { minimumFractionDigits: 3, maximumFractionDigits: 3 })).toBe('1,234.568');
        });
    });

    describe('formatNumber', () => {
        it('formats number with default 2 decimals', () => {
            expect(formatNumber(1234.5678)).toBe('1,234.57');
        });

        it('formats number with custom decimals', () => {
            expect(formatNumber(1234.5678, 4)).toBe('1,234.5678');
        });
    });

    describe('formatPercentage', () => {
        it('formats percentage with 2 decimals and positive sign', () => {
            expect(formatPercentage(12.345)).toBe('12.35%');
            expect(formatPercentage(-5.678)).toBe('5.68%'); // Implementation takes Math.abs
        });
    });

    describe('formatAddress', () => {
        it('formats address correctly', () => {
            const addr = '0x1234567890abcdef1234567890abcdef12345678';
            // Default: start 6, end 4
            expect(formatAddress(addr)).toBe('0x1234...5678');
        });

        it('returns empty string for empty address', () => {
            expect(formatAddress('')).toBe('');
        });

        it('respects custom start and end lengths', () => {
            const addr = '0x1234567890abcdef1234567890abcdef12345678';
            expect(formatAddress(addr, 4, 2)).toBe('0x12...78');
        });
    });

    describe('calculateExchangeRate', () => {
        it('calculates rate correctly', () => {
            expect(calculateExchangeRate(100, 50)).toBe('2.000000');
        });

        it('handles zero prices', () => {
            expect(calculateExchangeRate(0, 50)).toBe('0');
            expect(calculateExchangeRate(100, 0)).toBe('0'); // Infinity check handled by internal logic returning '0'
        });

        it('respects decimal places', () => {
            expect(calculateExchangeRate(100, 3, 2)).toBe('33.33');
        });
    });

    describe('calculateUsdValue', () => {
        it('calculates USD value correctly', () => {
            expect(calculateUsdValue('10', 2.5)).toBe('$25.00');
        });

        it('handles invalid amount', () => {
            expect(calculateUsdValue('abc', 2.5)).toBe('$0.00');
        });

        it('handles zero price', () => {
            expect(calculateUsdValue('10', 0)).toBe('$0.00');
        });
    });

    describe('isValidAddress', () => {
        it('should validate correct address', () => {
            const valid = '0x' + 'a'.repeat(40);
            expect(isValidAddress(valid)).toBe(true);
        });

        it('should invalidate incorrect length', () => {
            const invalid = '0x' + 'a'.repeat(39);
            expect(isValidAddress(invalid)).toBe(false);
        });

        it('should invalidate non-hex characters', () => {
            const invalid = '0x' + 'g'.repeat(40);
            expect(isValidAddress(invalid)).toBe(false);
        });

        it('should invalidate missing prefix', () => {
            const invalid = 'a'.repeat(40);
            expect(isValidAddress(invalid)).toBe(false);
        });
    });

    describe('generateMockAddress', () => {
        it('should generate valid mock address format', () => {
            const address = generateMockAddress();
            expect(address.startsWith(ADDRESS_PREFIX)).toBe(true);
            expect(address.length).toBeGreaterThan(ADDRESS_PREFIX.length);
        });
    });
});
