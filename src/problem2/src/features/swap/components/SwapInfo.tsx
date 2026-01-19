import { useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@/components/common';
import type { SwapFormValues, SwapInfoProps } from '@/types';
import { SWAP_SLIPPAGE_OPTIONS } from '@/constants';

export function SwapInfo({ fromToken, toToken, exchangeRate }: SwapInfoProps) {
    const { setValue } = useFormContext<SwapFormValues>();
    const slippage = useWatch<SwapFormValues, 'slippage'>({ name: 'slippage' });

    if (!fromToken || !toToken) {
        return null;
    }

    return (
        <div className="mb-4 p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl space-y-3 text-sm">
            {/* Exchange Rate */}
            <div className="flex justify-between text-gray-400">
                <span>Exchange Rate</span>
                <span className="text-white font-medium">
                    1 {fromToken.symbol.toUpperCase()} = {exchangeRate} {toToken.symbol.toUpperCase()}
                </span>
            </div>

            {/* Slippage Selector */}
                    <div className="flex justify-between items-center text-gray-400">
                        <span>Slippage</span>
                        <div className="flex gap-1.5">
                            {SWAP_SLIPPAGE_OPTIONS.map((value) => (
                                <Button
                                    key={value}
                                    type="button"
                                    onClick={() => setValue('slippage', value)}
                                    variant={slippage === value ? "pill-active" : "pill"}
                                    size="sm"
                                    className="h-7 px-3 text-xs font-medium transition-all duration-200"
                                >
                                    {value}%
                                </Button>
                            ))}
                        </div>
                    </div>
        </div>
    );
}
