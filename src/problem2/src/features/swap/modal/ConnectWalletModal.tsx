import Wallet from 'lucide-react/dist/esm/icons/wallet';
import { useWallet } from '@/components/providers';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common';
import type { ConnectWalletModalProps } from '@/types';

export function ConnectWalletModal({ isOpen, onOpenChange }: ConnectWalletModalProps) {
    const { connectWallet } = useWallet();

    const handleConnect = () => {
        connectWallet();
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] border-default bg-background-primary backdrop-blur-2xl shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-primary">Connect Wallet</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-muted">
                        You need to connect your wallet to select tokens. Would you like to connect now?
                    </p>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        onClick={handleConnect}
                        variant="gradient"
                        className="font-semibold rounded-xl px-5 py-2.5 transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 active:scale-95 flex items-center gap-2"
                    >
                        <Wallet className="w-4 h-4" />
                        Connect Wallet
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
