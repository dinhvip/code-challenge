import { useFormContext, useWatch } from 'react-hook-form';
import { Button, Input } from '@/components/common';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { TokenSelector } from './TokenSelector';
import type { SwapFormValues, SwapFieldProps } from '@/types';

export function SwapField({
    type,
    tokenFieldName,
    amountFieldName,
    disabled = false,
    balance,
    usdValue,
    onMaxClick,
    onAmountChange,
    onTokenChange,
}: SwapFieldProps) {
    const { control } = useFormContext<SwapFormValues>();
    const token = useWatch({ control, name: tokenFieldName });
    const isFromField = type === 'from';
    const isReadOnly = type === 'to';

    return (
        <div className="bg-background-primary backdrop-blur-sm border border-subtle rounded-2xl p-4 transition-all duration-200 hover:border-subtle focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/20">
            {/* Label */}
            <div className="flex justify-between items-center text-sm px-3">
                <span className="text-muted">
                    {isFromField ? 'Sell' : 'Buy'}
                </span>
            </div>

            {/* Input + Token Selector */}
            <div className="flex gap-3 items-center mb-2 mt-2">
                <FormField
                    control={control}
                    name={amountFieldName}
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        onAmountChange?.(e.target.value);
                                    }}
                                    type="number"
                                    placeholder="0"
                                    disabled={disabled}
                                    readOnly={isReadOnly}
                                    variant="ghost"
                                    size="huge"
                                    className="flex-1 text-primary placeholder-disabled px-0 focus-visible:ring-0 bg-transparent transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                                    autoComplete="off"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name={tokenFieldName}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <TokenSelector
                                    selectedToken={field.value}
                                    onSelect={(token) => {
                                        field.onChange(token);
                                        onTokenChange?.(token);
                                    }}
                                    label={isFromField ? 'From' : 'To'}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            <div className="flex justify-between items-center text-sm px-3">
                <span className="text-muted">
                    {usdValue}
                </span>
                {token && (
                    <div className="flex items-center gap-2">
                        <span className="text-muted">Balance: {balance.toFixed(4)}</span>
                        {isFromField && onMaxClick && (
                            <Button
                                type="button"
                                variant="link"
                                size="sm"
                                onClick={onMaxClick}
                                className="h-auto p-0 text-purple-400 font-semibold hover:text-purple-300 transition-colors"
                            >
                                MAX
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
