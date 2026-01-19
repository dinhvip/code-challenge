import ArrowDownUp from 'lucide-react/dist/esm/icons/arrow-down-up';
import { Button } from '@/components/common';
import type { SwapDirectionButtonProps } from '@/types';

export function SwapDirectionButton({ disabled, onClick }: SwapDirectionButtonProps) {
    return (
        <div className="flex justify-center z-10 p-4">
            <Button
                type="button"
                onClick={onClick}
                disabled={disabled}
                size="icon"
                className="border-subtle rounded-xl bg-background-primary border-4 hover:bg-surface-highlight hover:scale-105 active:scale-95 h-12 w-12 transition-all duration-200"
            >
                <ArrowDownUp className="w-5 h-5 text-muted" />
            </Button>
        </div>
    );
}
