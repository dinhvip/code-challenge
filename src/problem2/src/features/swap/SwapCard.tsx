import { Form } from '@/components/ui/form';
import { useSwapForm } from './hooks/useSwapForm';
import { SwapField } from './components/SwapField';
import { SwapInfo } from './components/SwapInfo';
import { SwapButton } from './components/SwapButton';
import { SwapDirectionButton } from './components/SwapDirectionButton';

export function SwapCard() {
    const {
        form,
        handleSubmit,
        handleSwapDirection,
        handleMaxClick,
        fromToken,
        toToken,
        fromAmount,
        toAmount,
        exchangeRate,
        fromBalance,
        toBalance,
        getUsdValue,
        insufficientBalance,
        canSwap,
        isConnected,
        isPending,
        connectWallet,
        handleFromAmountChange,
        handleFromTokenChange,
        handleToTokenChange,
        NotificationContainer,
    } = useSwapForm();

    return (
        <div className="w-full max-w-lg mx-auto relative z-10">
            <NotificationContainer />

            <Form {...form}>
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-900/60 backdrop-blur-2xl border border-white/8 rounded-3xl p-6 shadow-2xl shadow-black/50 transition-all duration-300 hover:border-white/12"
                >
                    <SwapField
                        type="from"
                        tokenFieldName="fromToken"
                        amountFieldName="fromAmount"
                        disabled={!isConnected}
                        excludedToken={toToken}
                        balance={fromBalance}
                        usdValue={getUsdValue(fromToken, fromAmount)}
                        onMaxClick={handleMaxClick}
                        onAmountChange={handleFromAmountChange}
                        onTokenChange={handleFromTokenChange}
                    />

                    <SwapDirectionButton
                        disabled={!isConnected}
                        onClick={handleSwapDirection}
                    />

                    <SwapField
                        type="to"
                        tokenFieldName="toToken"
                        amountFieldName="toAmount"
                        disabled={!isConnected}
                        excludedToken={fromToken}
                        balance={toBalance}
                        usdValue={getUsdValue(toToken, toAmount)}
                        onTokenChange={handleToTokenChange}
                    />

                    <SwapInfo
                        fromToken={fromToken}
                        toToken={toToken}
                        exchangeRate={exchangeRate}
                    />

                    <SwapButton
                        isConnected={isConnected}
                        isPending={isPending}
                        canSwap={canSwap}
                        insufficientBalance={insufficientBalance}
                        hasTokens={!!(fromToken && toToken)}
                        hasAmount={!!(fromAmount && parseFloat(fromAmount) > 0)}
                        onConnect={connectWallet}
                    />
                </form>
            </Form>
        </div>
    );
}
