import React from "react";

// Catches render errors so one broken component doesn't blank the whole app
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI error:", error, info?.componentStack);
  }

  componentDidUpdate(prevProps) {
    // Navigating to another page clears the error
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 text-center px-4 text-gray-700 dark:text-gray-200">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-gray-500 dark:text-gray-400">
          This page hit an error. Try reloading it.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">
          Reload
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
