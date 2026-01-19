import { Button, NumberTicker } from '@/components/common';
import Eye from 'lucide-react/dist/esm/icons/eye';
import EyeOff from 'lucide-react/dist/esm/icons/eye-off';
import LogOut from 'lucide-react/dist/esm/icons/log-out';
import type { PortfolioHeaderProps } from '@/types';
import { PORTFOLIO_ACTIONS } from '@/constants/portfolio';
import { formatAddress } from '@/utils';

export function PortfolioHeader({
    address,
    totalBalance,
    showBalance,
    onToggleBalance,
    onDisconnect
}: PortfolioHeaderProps) {
    return (
        <div className="p-6 border-b border-default">
            {/* Address */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br bg-gradient-purple-pink flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                        {address ? address.slice(2, 4).toUpperCase() : '--'}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate text-primary">
                        {address ? formatAddress(address) : 'Unknown'}
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDisconnect}
                    className="w-8 h-8 text-muted transition-all duration-200"
                    title="Disconnect Wallet"
                >
                    <LogOut className="w-4 h-4 cursor-pointer" />
                </Button>
            </div>

            {/* Total Balance */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm mb-1 text-muted">
                    <span>Total Balance</span>
                    <button
                        onClick={onToggleBalance}
                        className="text-muted transition-colors"
                    >
                        {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                </div>
                <div className="text-3xl font-bold text-primary">
                    {showBalance ? (
                        <NumberTicker value={totalBalance} prefix="$" />
                    ) : (
                        '•••••'
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-2">
                {PORTFOLIO_ACTIONS.map(({ icon: Icon, label }) => (
                    <Button
                        key={label}
                        variant="ghost"
                        className="flex flex-col items-center gap-1.5 p-3 h-auto rounded-xl border transition-all duration-200 group bg-surface-subtle border-subtle"
                    >
                        <Icon className="w-5 h-5 text-muted transition-colors group-hover:text-primary" />
                        <span className="text-xs text-muted transition-colors group-hover:text-primary">{label}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}
