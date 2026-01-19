import type { TokenCardProps } from '@/types';

export function TokenCard({
    image,
    symbol,
    name,
    leftContent,
    rightContent,
    asButton = false,
    className = '',
    ...props
}: TokenCardProps) {
    const baseClassName = 'flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150';

    const content = (
        <>
            {/* Avatar */}
            {image ? (
                <img src={image} alt={symbol} className="w-10 h-10 rounded-full" />
            ) : (
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold text-white">
                    {symbol.slice(0, 2).toUpperCase()}
                </div>
            )}

            {/* Left content (symbol + name) */}
            {leftContent || (
                <div className="flex-1 min-w-0 text-left">
                    <div className="font-semibold text-white">{symbol.toUpperCase()}</div>
                    {name && <div className="text-sm text-gray-400">{name}</div>}
                </div>
            )}

            {/* Right content */}
            {rightContent}
        </>
    );

    if (asButton) {
        return (
            <button
                className={`${baseClassName} w-full focus:outline-none focus:bg-white/5 cursor-pointer ${className}`}
                {...props}
            >
                {content}
            </button>
        );
    }

    return (
        <div className={`${baseClassName} ${className}`}>
            {content}
        </div>
    );
}
