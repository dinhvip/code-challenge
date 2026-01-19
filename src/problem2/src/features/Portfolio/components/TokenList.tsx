import { TokenItem } from './TokenItem';
import type { TokenListProps } from '@/types';

export function TokenList({ tokens, showBalance }: TokenListProps) {
    if (tokens.length === 0) {
        return (
            <div className="p-6 text-center text-muted">
                No tokens in wallet
            </div>
        );
    }

    return (
        <>
            {tokens.map(token => (
                <TokenItem
                    key={token.id}
                    token={token}
                    showBalance={showBalance}
                />
            ))}
        </>
    );
}
