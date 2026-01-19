import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
    "flex w-full rounded-xl border bg-transparent !px-3 !py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "border-gray-700 bg-gray-800/50 text-white",
                ghost: "border-none bg-transparent shadow-none focus-visible:ring-0 px-0",
                error: "border-red-500 bg-red-500/5 text-red-500 placeholder:text-red-500/50 focus-visible:ring-red-500",
            },
            size: {
                default: "h-12 py-3",
                sm: "h-9 rounded-lg",
                lg: "h-14 text-lg",
                huge: "h-auto text-4xl font-semibold py-0 px-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    error?: boolean;
}

const Input = ({ className, variant, size, startAdornment, endAdornment, error, ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {
    return (
        <div className="relative flex items-center w-full">
            {startAdornment && (
                <div className="absolute left-3 text-gray-500 flex items-center pointer-events-none">
                    {startAdornment}
                </div>
            )}
            <input
                className={cn(
                    inputVariants({ variant: error ? "error" : variant, size, className }),
                    startAdornment && "!pl-10",
                    endAdornment && "!pr-10"
                )}
                ref={ref}
                {...props}
            />
            {endAdornment && (
                <div className="absolute right-3 text-gray-500 flex items-center pointer-events-none">
                    {endAdornment}
                </div>
            )}
        </div>
    );
};
Input.displayName = "Input";

export { Input, inputVariants };
