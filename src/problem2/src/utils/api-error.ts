export class ApiError extends Error {
    statusCode?: number;
    code?: string;
    originalError?: unknown;

    constructor(
        message: string,
        statusCode?: number,
        code?: string,
        originalError?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.code = code;
        this.originalError = originalError;
    }
}

export const handleApiError = (error: unknown): ApiError => {
    if (error instanceof ApiError) {
        return error;
    }

    if (error instanceof Error) {
        return new ApiError(error.message, undefined, 'UNKNOWN_ERROR', error);
    }

    if (typeof error === 'string') {
        return new ApiError(error);
    }

    return new ApiError('An unknown error occurred');
};

