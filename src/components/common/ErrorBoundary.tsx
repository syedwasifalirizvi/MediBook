import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this as any).state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in MediBook UI:', error, errorInfo);
  }

  public handleReset = () => {
    (this as any).setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if ((this as any).state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#F8F7F5]">
          <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center space-y-6 border border-black/5 shadow-card">
            <div className="w-16 h-16 rounded-2xl bg-[#C62828]/10 text-[#C62828] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#C62828]">System Alert</span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2937] mt-1">Something Went Wrong</h1>
              <p className="text-xs text-[#6B7280] mt-3 leading-relaxed">
                An unexpected interface issue occurred. Your patient data remains safe and secured.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#0F3040] hover:bg-[#D99B7F] rounded-full shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-[#1F2937] bg-white border border-black/10 hover:border-[#0F3040] rounded-full transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 text-[#A56F63]" /> Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
