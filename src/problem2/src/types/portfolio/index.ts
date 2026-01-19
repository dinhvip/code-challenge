
export interface PortfolioToken {
    id: string;
    symbol: string;
    name?: string;
    image: string;
    price: number;
    change24h: number;
    amount: number;
    value: number;
}

export interface DisconnectedStateProps {
    onConnect: () => void;
}

export interface PortfolioHeaderProps {
    address: string | null;
    totalBalance: number;
    showBalance: boolean;
    onToggleBalance: () => void;
    onDisconnect: () => void;
}

export interface TokenItemProps {
    token: PortfolioToken;
    showBalance: boolean;
}

export interface TokenListProps {
    tokens: PortfolioToken[];
    showBalance: boolean;
}