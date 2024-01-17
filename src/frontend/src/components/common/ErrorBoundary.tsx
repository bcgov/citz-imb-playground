import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | string;
  context: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  notifyOpen: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '', notifyOpen: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ errorMessage: error.message, notifyOpen: true });
    console.error(error, info);
  }

  handleClose = () => {
    this.setState({ notifyOpen: false });
  };

  render() {
    if (this.state.hasError) {
      // Render fallback component.
      if (this.props.fallback) return this.props.fallback;
      else {
        return (
          <div>
            <h4>ErrorBoundary: {this.props.context}</h4>
            <p>{this.state.errorMessage}</p>
          </div>
        );
      }
    }

    return this.props.children;
  }
}
