import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "cursor-pointer inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95 bg-origin-border overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-purple-pink text-white shadow-purple-500/20 hover:shadow-purple-500/30 hover:brightness-110 border border-transparent",
                gradient:
                    "bg-gradient-purple-pink text-white shadow-lg shadow-purple-500/20 hover:bg-gradient-purple-pink-light hover:shadow-purple-500/30 border border-transparent",
                destructive:
                    "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
                outline:
                    "border border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white",
                secondary:
                    "bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700",
                ghost: "hover:bg-gray-800/50 hover:text-white text-gray-400",
                link: "text-pink-500 underline-offset-4 hover:underline",
                pill: "rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700",
                "pill-active": "rounded-full bg-pink-500 text-white",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-12 rounded-2xl px-8 text-lg",
                icon: "h-10 w-10",
            },
            fullWidth: {
                true: "w-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            fullWidth: false,
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = ({
    className,
    variant,
    size,
    fullWidth,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ref,
    ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size, fullWidth, className }))}
            ref={ref}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};

Button.displayName = "Button";

export { Button, buttonVariants };
