import { Component, type ErrorInfo } from 'react';
import { Button } from './Button';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '@/types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
                    <div className="max-w-md w-full space-y-6 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Something went wrong
                            </h1>
                            <p className="text-gray-400">
                                An unexpected error occurred. We've been notified and are working on a fix.
                            </p>
                        </div>
                        {this.state.error && (
                            <pre className="p-4 bg-zinc-900 rounded-lg text-left text-xs text-red-400 overflow-auto max-h-[200px] border border-zinc-800">
                                {this.state.error.message}
                            </pre>
                        )}
                        <Button
                            onClick={this.handleReset}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            Try again
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
