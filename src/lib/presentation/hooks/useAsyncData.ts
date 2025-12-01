/**
 * Custom Hook for Async Data Fetching
 * Presentation Layer - Reusable data fetching logic
 * Implements React best practices for async operations
 */
import { useState, useEffect, useCallback } from 'react';
import { LoggerFactory } from '../../infrastructure/logger/Logger';

const logger = LoggerFactory.getLogger();

export interface UseAsyncDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching async data with loading and error states
 */
export function useAsyncData<T>(
  fetchFn: () => Promise<T>,
  dependencies: unknown[] = []
): UseAsyncDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      logger.debug('Fetching data...');
      const result = await fetchFn();
      setData(result);
      logger.debug('Data fetched successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      logger.error('Error fetching data', error);
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

