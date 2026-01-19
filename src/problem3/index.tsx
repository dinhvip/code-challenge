import React, { memo, useMemo } from 'react';
import { Props, FormattedWalletBalance } from './types';
import { DEFAULT_PRIORITY } from './constants';
import { getPriority, formatAmount } from './utils';
import { useWalletBalances, usePrices } from './useWallet';

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
    const balances = useWalletBalances();
    const prices = usePrices();

    const processedBalances = useMemo<FormattedWalletBalance[]>(() => {
        if (!balances?.length) return [];

        return balances
            .map((balance) => {
                const priority = getPriority(balance.blockchain);
                const price = prices[balance.currency] ?? 0;

                return {
                    ...balance,
                    priority,
                    formatted: formatAmount(balance.amount),
                    usdValue: price * balance.amount,
                };
            })
            .filter(
                (balance) =>
                    balance.priority > DEFAULT_PRIORITY && balance.amount > 0
            )
            .sort((a, b) => b.priority - a.priority);
    }, [balances, prices]);

    const rows = useMemo(
        () =>
            processedBalances.map((balance) => (
                <WalletRow
                    key={`${balance.blockchain}-${balance.currency}`}
                    amount={balance.amount}
                    usdValue={balance.usdValue}
                    formattedAmount={balance.formatted}
                    className="wallet-row"
                />
            )),
        [processedBalances]
    );

    return <div {...rest}>{rows}</div>;
};

export default WalletPage;

const WalletRow = memo(function WalletRow({
    amount,
    usdValue,
    formattedAmount,
    className,
}: {
    amount: number;
    usdValue: number;
    formattedAmount: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <div>{formattedAmount}</div>
            <div>{amount}</div>
            <div>${usdValue.toFixed(2)}</div>
        </div>
    );
});
