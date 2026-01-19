import { useState } from 'react';
import { useWallet } from '@/components/providers';
import { Button } from '@/components/common';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import type { TokenSelectorProps } from '@/types';
import { TokenSelectorModal, ConnectWalletModal } from '../modal';

export function TokenSelector({ selectedToken, onSelect }: TokenSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showConnectPrompt, setShowConnectPrompt] = useState(false);
    const { isConnected } = useWallet();

    const handleTriggerClick = (e: React.MouseEvent) => {
        if (!isConnected) {
            e.preventDefault();
            e.stopPropagation();
            setShowConnectPrompt(true);
        } else {
            setIsOpen(true);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                onClick={handleTriggerClick}
                className="hover:bg-surface-highlight hover:scale-105 h-auto py-3 rounded-2xl bg-surface-subtle border-default min-w-[140px] justify-between transition-all duration-200"
            >
                {selectedToken ? (
                    <div className="flex items-center gap-2">
                        <img src={selectedToken.image} alt={selectedToken.symbol} className="w-6 h-6 rounded-full" />
                        <span className="font-semibold text-primary">{selectedToken.symbol.toUpperCase()}</span>
                    </div>
                ) : (
                    <span className="text-muted">Select token</span>
                )}
                <ChevronDown className="w-4 h-4 ml-2 text-muted" />
            </Button>

            <TokenSelectorModal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                onSelect={onSelect}
            />

            <ConnectWalletModal
                isOpen={showConnectPrompt}
                onOpenChange={setShowConnectPrompt}
            />
        </>
    );
}
