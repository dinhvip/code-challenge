import { type ReactNode, type ButtonHTMLAttributes, type HTMLAttributes, type ComponentPropsWithoutRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export interface ErrorBoundaryProps {
    children?: ReactNode;
    fallback?: ReactNode;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export interface NumberTickerProps {
    value: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export interface TokenCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    image?: string;
    symbol: string;
    name?: string;
    leftContent?: ReactNode;
    rightContent?: ReactNode;
    asButton?: boolean;
    className?: string;
}

export interface MainLayoutProps {
    children: ReactNode;
}

export interface QueryClientProviderProps {
    children: ReactNode;
}

export interface WalletContextType {
    isConnected: boolean;
    address: string | null;
    balances: Record<string, number>;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    getBalance: (tokenId: string) => number;
    executeSwap: (fromTokenId: string, toTokenId: string, fromAmount: number, toAmount: number) => void;
}

export interface WalletProviderProps {
    children: ReactNode;
}

export interface NotificationConfig {
    id?: number;
    type: 'success' | 'error' | 'info' | 'warning';
    title?: string;
    message?: string;
    duration?: number;
    icon?: ReactNode;
    closable?: boolean;
}

export interface NotificationContainerProps {
    notifications: NotificationConfig[];
    onClose: (id: number) => void;
}

export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type DialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;
export type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    hideCloseButton?: boolean;
};
export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;
export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    error?: boolean;
}
