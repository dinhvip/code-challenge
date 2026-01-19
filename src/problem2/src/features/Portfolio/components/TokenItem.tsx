import { NumberTicker, TokenCard } from '@/components/common';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import TrendingDown from 'lucide-react/dist/esm/icons/trending-down';
import type { TokenItemProps } from '@/types';
import { formatCurrency, formatPercentage } from '@/utils';

export function TokenItem({ token, showBalance }: TokenItemProps) {
    return (
        <TokenCard
            image={token.image}
            symbol={token.symbol}
            className="cursor-pointer"
            leftContent={
                <div className="flex-1 min-w-0">
                    <div className="font-medium text-primary">{token.symbol}</div>
                    <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-muted">
                            ${formatCurrency(token.price, { maximumFractionDigits: 4 })}
                        </span>
                        <span className={`flex items-center gap-0.5 ${token.change24h >= 0 ? 'text-success' : 'text-error'}`}>
                            {token.change24h >= 0 ? (
                                <TrendingUp className="w-3 h-3" />
                            ) : (
                                <TrendingDown className="w-3 h-3" />
                            )}
                            {formatPercentage(token.change24h)}
                        </span>
                    </div>
                </div>
            }
            rightContent={
                <div className="text-right">
                    <div className="font-medium text-primary">
                        {showBalance ? (
                            <NumberTicker value={token.amount} decimals={4} />
                        ) : (
                            '••••'
                        )}
                    </div>
                    <div className="text-xs text-muted">
                        {showBalance ? (
                            <NumberTicker value={token.value} prefix="$" />
                        ) : (
                            '••••'
                        )}
                    </div>
                </div>
            }
        />
    );
}
