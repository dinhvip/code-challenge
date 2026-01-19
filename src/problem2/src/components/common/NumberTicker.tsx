import { useEffect, useState, useRef } from 'react';
import type { NumberTickerProps } from '@/types';

export function NumberTicker({ value, className, prefix = '', suffix = '', decimals = 2 }: NumberTickerProps) {
    const [displayValue, setDisplayValue] = useState(value);
    const startValue = useRef(value);
    const startTime = useRef<number | null>(null);
    const duration = 1000;

    useEffect(() => {
        startValue.current = displayValue;
        startTime.current = null;

        const animate = (timestamp: number) => {
            if (!startTime.current) startTime.current = timestamp;
            const progress = timestamp - startTime.current;
            const percentage = Math.min(progress / duration, 1);

            const easeOutCubic = 1 - Math.pow(1 - percentage, 3);

            const nextValue = startValue.current + (value - startValue.current) * easeOutCubic;
            setDisplayValue(nextValue);

            if (percentage < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value]);

    return (
        <span className={className}>
            {prefix}{displayValue.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
        </span>
    );
}
