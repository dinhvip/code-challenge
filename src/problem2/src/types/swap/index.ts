export interface SwapButtonProps {
    isConnected: boolean;
    isPending: boolean;
    canSwap: boolean;
    insufficientBalance: boolean;
    hasTokens: boolean;
    hasAmount: boolean;
    onConnect: () => void;
}

export interface SwapDirectionButtonProps {
    disabled?: boolean;
    onClick: () => void;
}

export interface SwapFieldProps {
    type: 'from' | 'to';
    tokenFieldName: 'fromToken' | 'toToken';
    amountFieldName: 'fromAmount' | 'toAmount';
    disabled?: boolean;
    excludedToken?: Token | null;
    balance: number;
    usdValue: string;
    onMaxClick?: () => void;
    onAmountChange?: (value: string) => void;
    onTokenChange?: (token: Token) => void;
}

export interface SwapInfoProps {
    fromToken: Token | null;
    toToken: Token | null;
    exchangeRate: string;
}

export interface TokenSelectorProps {
    selectedToken: Token | null;
    onSelect: (token: Token) => void;
    label: string;
    disabled?: boolean;
}

export interface ConnectWalletModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface TokenSelectorModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (token: Token) => void;
}

export interface Token {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
}

export interface SwapFormValues {
    fromToken: Token | null;
    toToken: Token | null;
    fromAmount: string;
    toAmount: string;
    slippage: number;
}

export interface SwapSubmitValues extends SwapFormValues {
    fromToken: Token;
    toToken: Token;
}
