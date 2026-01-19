import { z } from 'zod';

export const TokenSchema = z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    image: z.string(),
    current_price: z.number(),
    market_cap: z.number(),
    market_cap_rank: z.number(),
    price_change_percentage_24h: z.number(),
});

export const SwapFormSchema = z.object({
    fromToken: TokenSchema.nullable(),
    toToken: TokenSchema.nullable(),
    fromAmount: z.string(),
    toAmount: z.string(),
    slippage: z.number().min(0).max(100),
});

export const SwapSubmitSchema = SwapFormSchema.extend({
    fromToken: TokenSchema,
    toToken: TokenSchema,
    fromAmount: z.string()
        .refine((val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num > 0;
        }, { message: 'Please enter a valid amount' }),
});
