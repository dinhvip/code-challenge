import { Button } from '@/components/common';
import type { SwapButtonProps } from '@/types';

export function SwapButton({
    isConnected,
    isPending,
    canSwap,
    insufficientBalance,
    hasTokens,
    hasAmount,
    onConnect,
}: SwapButtonProps) {
    const getButtonText = () => {
        if (!isConnected) return 'Connect wallet to continue';
        if (isPending) return 'Processing';
        if (!hasTokens) return 'Select token';
        if (!hasAmount) return 'Enter amount';
        if (insufficientBalance) return 'Insufficient balance';
        return 'Swap';
    };

    return (
        <Button
            type={!isConnected ? "button" : "submit"}
            onClick={!isConnected ? onConnect : undefined}
            disabled={isConnected && !canSwap}
            isLoading={isPending}
            variant="gradient"
            fullWidth
            size="lg"
            className="mt-8 rounded-2xl text-lg font-bold active:scale-[0.98] transition-all duration-200 disabled:shadow-none"
        >
            {getButtonText()}
        </Button>
    );
}
