/**
 * Error Boundary Component
 * Presentation Layer - Error handling in React components
 */
import React, { Component } from 'react';
import { LoggerFactory } from '../../infrastructure/logger/Logger';

const logger = LoggerFactory.getLogger();

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error('Error caught by ErrorBoundary', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-primary-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-primary-800 mb-4">
              Algo salió mal
            </h1>
            <p className="text-primary-600 mb-4">
              Por favor, recarga la página o intenta más tarde.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-4 p-4 bg-primary-100 rounded text-sm text-left overflow-auto max-w-2xl">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

