import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Logger } from '../services/loggingService';
import { AlertTriangleIcon } from './IconComponents';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to our centralized logging service
    Logger.error("Uncaught error in React component tree:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Render a custom fallback UI
      return (
        <div className="flex items-center justify-center h-screen bg-slate-50 p-4">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-lg">
                <AlertTriangleIcon className="h-16 w-16 mx-auto text-red-500" />
                <h1 className="mt-4 text-3xl font-bold text-slate-800">Something went wrong.</h1>
                <p className="mt-2 text-slate-600">
                    We're sorry for the inconvenience. An unexpected error occurred. Please try refreshing the page. 
                    If the problem persists, our team has been notified.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                >
                    Refresh Page
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}
