import Loader2 from 'lucide-react/dist/esm/icons/loader-2';

export function GlobalLoading() {
    return (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="relative">
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
                <Loader2 className="h-10 w-10 text-indigo-500 animate-spin relative z-10" />
            </div>
        </div>
    );
}
