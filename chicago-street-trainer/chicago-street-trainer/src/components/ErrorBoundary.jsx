// ErrorBoundary: catches render-time failures (e.g. map/geometry issues) so the
// whole app doesn't white-screen. Offers a path back home.

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Caught render error:", error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <div className="empty-card">
            <h2 className="empty-card__title">Something went sideways</h2>
            <p className="empty-card__body">
              The map or quiz hit an unexpected error. Your progress is saved —
              head home and start a fresh quiz.
            </p>
            <button className="btn btn--primary" onClick={this.reset}>
              Return home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
