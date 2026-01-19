import React from 'react';

export interface BoxProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export interface WalletBalance {
    blockchain: string;
    currency: string;
    amount: number;
}

export interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
    usdValue: number;
}

export interface Props extends BoxProps { }