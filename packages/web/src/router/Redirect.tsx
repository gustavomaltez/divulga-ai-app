import { Fragment } from 'react';

/**
 * Redirects the user to login page.
 */
export function Redirect(): JSX.Element {
  window.location.pathname = '/login';
  return <Fragment />;
}