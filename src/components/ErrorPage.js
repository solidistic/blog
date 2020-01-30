import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: true
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log("Error boundary triggered");
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Oops, something went wrong!</h1>
          <Link to="/" >Back to dashboard</Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
