import { useState } from 'react';
import Search from 'lucide-react/dist/esm/icons/search';
import { useTokenList } from '@/hooks/useTokens';
import { useWallet } from '@/components/providers';
import { Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, TokenCard } from '@/components/common';
import type { Token, TokenSelectorModalProps } from '@/types';
import { POPULAR_TOKENS } from '@/constants';

export function TokenSelectorModal({ isOpen, onOpenChange, onSelect }: TokenSelectorModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: tokens } = useTokenList();
    const { getBalance } = useWallet();

    const filteredTokens = tokens?.filter(token =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleSelect = (token: Token) => {
        onSelect(token);
        onOpenChange(false);
        setSearchTerm('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 border-default bg-background-primary backdrop-blur-2xl gap-0 overflow-hidden sm:rounded-3xl max-w-md shadow-2xl">
                <DialogHeader className="p-6 border-b border-subtle">
                    <DialogTitle className="text-lg font-semibold">Select a token</DialogTitle>
                </DialogHeader>

                {/* Search */}
                <div className="p-4">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        startAdornment={<Search className="w-5 h-5 text-muted" />}
                        className="flex-1 text-primary placeholder-disabled px-0 focus-visible:ring-0 bg-transparent"
                    />
                </div>

                {/* Popular tokens */}
                <div className="px-4 pb-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-around">
                        {tokens?.filter(t => (POPULAR_TOKENS as readonly string[]).includes(t.id)).map(token => (
                            <Button
                                key={token.id}
                                onClick={() => handleSelect(token)}
                                variant="outline"
                                size="sm"
                                className="rounded-2xl bg-surface-subtle border-subtle hover:bg-surface-highlight hover:border-subtle h-9 shrink-0 transition-all duration-200"
                            >
                                <img src={token.image} alt={token.symbol} className="w-5 h-5 rounded-full mr-2" />
                                <span className="text-xs font-semibold text-primary">{token.symbol.toUpperCase()}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Token list header */}
                <div className="px-4 pb-2">
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <span className="flex-1">Tokens by 24h trading volume</span>
                    </div>
                </div>

                {/* Token list */}
                <div className="overflow-y-auto h-[400px] py-0">
                    {filteredTokens.length === 0 ? (
                        <div className="p-8 text-center text-muted">No tokens found</div>
                    ) : (
                        filteredTokens.map(token => {
                            const balance = getBalance(token.id);
                            return (
                                <TokenCard
                                    key={token.id}
                                    asButton
                                    image={token.image}
                                    symbol={token.symbol}
                                    name={token.name}
                                    onClick={() => handleSelect(token)}
                                    rightContent={
                                        <div className="text-right">
                                            {balance > 0 && (
                                                <div className="text-sm font-medium text-primary">{balance.toFixed(4)}</div>
                                            )}
                                            <div className="text-xs text-muted">
                                                ${token.current_price.toLocaleString()}
                                            </div>
                                        </div>
                                    }
                                />
                            );
                        })
                    )}
                </div>


            </DialogContent>
        </Dialog>
    );
}


