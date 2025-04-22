import { useRouteError } from 'react-router-dom';

// HOC to inject router error prop
export function withRouter(Component) {
  // Named component for Fast Refresh compatibility
  function WithRouterComponent(props) {
    const error = useRouteError();
    return <Component {...props} error={error} />;
  }
  // Assign a display name for better debugging and Fast Refresh tracking
  WithRouterComponent.displayName = `WithRouter(${Component.displayName || Component.name || 'Component'})`;
  return WithRouterComponent;
}