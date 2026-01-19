import { Button } from '@/components/common';
import { usePortfolio } from './hooks/usePortfolio';
import { DisconnectedState } from './components/DisconnectedState';
import { PortfolioHeader } from './components/PortfolioHeader';
import { TokenList } from './components/TokenList';

export function PortfolioSidebar() {
    const {
        isConnected,
        address,
        portfolioTokens,
        totalBalance,
        showBalance,
        toggleBalanceVisibility,
        connectWallet,
        disconnectWallet
    } = usePortfolio();

    if (!isConnected) {
        return <DisconnectedState onConnect={connectWallet} />;
    }

    return (
        <div className="w-80 backdrop-blur-2xl border-l flex flex-col h-full overflow-hidden bg-background-primary border-default">
            <PortfolioHeader
                address={address}
                totalBalance={totalBalance}
                showBalance={showBalance}
                onToggleBalance={toggleBalanceVisibility}
                onDisconnect={disconnectWallet}
            />

            {/* Tabs */}
            <div className="flex items-center gap-1 px-4 py-3 border-b border-default">
                <Button variant="ghost" className="px-4 py-1.5 h-auto text-sm font-medium rounded-full text-primary bg-surface-highlight">
                    Tokens
                </Button>
                <Button variant="ghost" className="px-4 py-1.5 h-auto text-sm font-medium text-muted transition-colors">
                    NFTs
                </Button>
                <Button variant="ghost" className="px-4 py-1.5 h-auto text-sm font-medium text-muted transition-colors">
                    Activity
                </Button>
            </div>

            {/* Token List */}
            <div className="flex-1 overflow-y-auto">
                <TokenList tokens={portfolioTokens} showBalance={showBalance} />
            </div>
        </div>
    );
}
