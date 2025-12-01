/**
 * App Providers
 * Centralized provider wrapper for React Query and other providers
 */
import React, { ReactNode } from 'react';
import { QueryProvider } from '../../infrastructure/query/QueryProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
};

