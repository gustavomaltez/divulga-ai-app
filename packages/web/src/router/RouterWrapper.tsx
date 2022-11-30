import { authenticationManager } from '@services';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Types -----------------------------------------------------------------------

interface RouteWrapperProps {
  /** Whether the route should be available only to authenticated users. **/
  isPrivate?: boolean;
  /** The element to be rendered. **/
  ifAuthenticatedMoveTo?: string;
  /** Element to be rendered when the user access the route. **/
  element: JSX.Element;
  /** Title to be displayed on the current tab. **/
  title?: string;
}

// Component -------------------------------------------------------------------

export function RouteWrapper(props: RouteWrapperProps): JSX.Element {

  const [isAuthenticated, setIsAuthenticated] = useState(authenticationManager.isAuthenticated());

  useEffect(() => {
    const unsubscribe = authenticationManager.on('update', () => {
      setIsAuthenticated(authenticationManager.isAuthenticated());
    });
    return unsubscribe;
  }, []);

  if (props.title) document.title = props.title;

  if (isAuthenticated && props.ifAuthenticatedMoveTo)
    return <Navigate to={props.ifAuthenticatedMoveTo} />;

  const shouldRender = props.isPrivate ? isAuthenticated : true;
  return shouldRender ? props.element : <Navigate to="/login" />;
}