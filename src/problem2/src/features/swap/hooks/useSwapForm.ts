import { useEffect, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useWallet } from '@/components/providers';
import { useNotification } from '@/hooks/useNotification';

import { SwapFormSchema, SwapSubmitSchema } from '../schemas';
import type { SwapFormValues, Token } from '@/types';
import { SWAP_DEFAULT_SLIPPAGE } from '@/constants';
import { sleep } from '@/utils';
import { useSwapTokens } from './useSwapTokens';

export function useSwapForm() {
    const { showSuccess, showError, NotificationContainer } = useNotification();
    const { isConnected, executeSwap, connectWallet } = useWallet();
    const [isPending, startTransition] = useTransition();

    const form = useForm<SwapFormValues>({
        resolver: zodResolver(SwapFormSchema),
        mode: 'onChange',
        defaultValues: {
            fromToken: null,
            toToken: null,
            fromAmount: '',
            toAmount: '',
            slippage: SWAP_DEFAULT_SLIPPAGE,
        },
    });

    const { setValue, getValues, control } = form;

    const fromAmount = useWatch({ control, name: 'fromAmount' });
    const fromToken = useWatch({ control, name: 'fromToken' });
    const toToken = useWatch({ control, name: 'toToken' });
    const slippage = useWatch({ control, name: 'slippage' });
    const toAmount = useWatch({ control, name: 'toAmount' });

    const {
        prices,
        exchangeRate,
        fromBalance,
        toBalance,
        calculateBestTrade,
        getUsdValue
    } = useSwapTokens(fromToken, toToken);


    const insufficientBalance = !!(fromToken && parseFloat(fromAmount || '0') > fromBalance);

    const canSwap = !!(isConnected
        && fromToken
        && toToken
        && fromAmount
        && parseFloat(fromAmount) > 0
        && !insufficientBalance);

    // Helper to update amounts
    const updateAmounts = (amount: string, fToken: Token | null, tToken: Token | null) => {
        const result = calculateBestTrade(amount, fToken, tToken, slippage);
        setValue('toAmount', result);
    };

    // React to price updates (e.g. after fetching new token price)
    useEffect(() => {
        if (fromToken && toToken && fromAmount && prices) {
            updateAmounts(fromAmount, fromToken, toToken);
        }
    }, [prices, fromToken, toToken, fromAmount, updateAmounts]);

    // Handlers
    const handleFromAmountChange = (value: string) => {
        setValue('fromAmount', value);
        updateAmounts(value, fromToken, toToken);
    };

    const handleFromTokenChange = (token: Token) => {
        setValue('fromToken', token);
        if (token.id === toToken?.id) {
            setValue('toToken', null);
            setValue('toAmount', '');
        } else {
            updateAmounts(fromAmount, token, toToken);
        }
    };

    const handleToTokenChange = (token: Token) => {
        setValue('toToken', token);
        if (token.id === fromToken?.id) {
            setValue('fromToken', null);
            setValue('fromAmount', '');
            setValue('toAmount', '');
        } else {
            updateAmounts(fromAmount, fromToken, token);
        }
    };

    const handleSwapDirection = () => {
        const currentFromToken = getValues('fromToken');
        const currentToToken = getValues('toToken');
        const currentToAmount = getValues('toAmount');

        setValue('fromToken', currentToToken);
        setValue('toToken', currentFromToken);
        setValue('fromAmount', currentToAmount);

        // Recalculate based on new "from" amount (which was "to")
        // Note: Ideally, we should recalculate fresh, but using previous output is common "quick" swap behavior.
        // For accuracy, let's recalculate:
        updateAmounts(currentToAmount, currentToToken, currentFromToken);

    };

    const handleMaxClick = () => {
        if (fromToken && fromBalance > 0) {
            const maxAmount = fromBalance.toString();
            setValue('fromAmount', maxAmount);
            updateAmounts(maxAmount, fromToken, toToken);
        }
    };

    const handleSubmit = form.handleSubmit(async (data) => {
        const result = SwapSubmitSchema.safeParse(data);
        if (!result.success) return;

        const validData = result.data;

        startTransition(async () => {
            try {
                await sleep(2000);
                executeSwap(
                    validData.fromToken.id,
                    validData.toToken.id,
                    parseFloat(validData.fromAmount),
                    parseFloat(validData.toAmount)
                );

                showSuccess({ message: 'Your balance has been updated' });
                setValue('fromAmount', '');
                setValue('toAmount', '');
            } catch (error) {
                showError({ message: 'Swap failed' });
            }
        });
    });

    return {
        form,
        control,
        fromToken,
        toToken,
        fromAmount,
        toAmount,
        slippage,
        fromBalance,
        toBalance,
        exchangeRate,
        insufficientBalance,
        canSwap,
        isConnected,
        isPending,
        handleSubmit,
        handleSwapDirection,
        handleMaxClick,
        handleFromAmountChange,
        handleFromTokenChange,
        handleToTokenChange,
        connectWallet,
        getUsdValue,
        NotificationContainer,
    };
}
