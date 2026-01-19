import { Button } from '@/components/common';
import Wallet from 'lucide-react/dist/esm/icons/wallet';
import type { DisconnectedStateProps } from '@/types';

export function DisconnectedState({ onConnect }: DisconnectedStateProps) {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center p-6 backdrop-blur-2xl bg-background-primary">
            <Button
                onClick={onConnect}
                variant="gradient"
                size="icon"
                className="w-20 h-20 rounded-3xl shadow-xl shadow-purple-500/25 mb-6 group"
            >
                <Wallet className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            </Button>
            <h3 className="text-xl font-bold mb-2 text-primary">Portfolio</h3>
            <p className="text-sm mb-4 px-4 text-muted">Connect wallet to view your portfolio</p>
        </div>
    );
}
