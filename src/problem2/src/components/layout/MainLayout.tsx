import { PortfolioSidebar } from '@/features/Portfolio';
import type { MainLayoutProps } from '@/types';

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen w-full flex flex-col overflow-hidden overflow-x-hidden relative bg-background-main text-primary">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex flex-1 overflow-hidden relative z-10">
                <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto min-w-0">
                    {children}
                </main>
                <div className="relative z-10 hidden lg:block">
                    <PortfolioSidebar />
                </div>
            </div>
        </div>
    );
}
