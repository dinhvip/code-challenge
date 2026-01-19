import { Suspense } from 'react';
import { QueryClientProvider, WalletProvider } from '@/components/providers';
import { SwapCard } from '@/features/swap';
import { MainLayout } from '@/components/layout';
import { ErrorBoundary, GlobalLoading } from '@/components/common';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider>
        <WalletProvider>
          <MainLayout>
            <Suspense fallback={<GlobalLoading />}>
              <SwapCard />
            </Suspense>
          </MainLayout>
        </WalletProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;