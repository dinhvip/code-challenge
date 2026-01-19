import Plus from 'lucide-react/dist/esm/icons/plus';
import ArrowLeftRight from 'lucide-react/dist/esm/icons/arrow-left-right';
import Send from 'lucide-react/dist/esm/icons/send';
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down';

export const PORTFOLIO_ACTIONS = [
    { id: 'fund', label: 'Fund', icon: Plus },
    { id: 'swap', label: 'Swap', icon: ArrowLeftRight },
    { id: 'send', label: 'Send', icon: Send },
    { id: 'receive', label: 'Receive', icon: ArrowDown }
] as const;

export type PortfolioAction = typeof PORTFOLIO_ACTIONS[number];
export type PortfolioActionIcon = typeof PORTFOLIO_ACTIONS[number]['icon'];

