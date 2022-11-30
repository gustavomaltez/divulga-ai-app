import { DashboardScreen, LoginScreen, RegisterScreen, SearchScreen } from '@screens';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Redirect } from './Redirect';

import { RouteWrapper } from './RouterWrapper';

// Routes definitions ----------------------------------------------------------

const RedirectElement = <Redirect />;
const LoginElement = <RouteWrapper element={<LoginScreen />} title='Divulga.ai | Login' ifAuthenticatedMoveTo='/dashboard' />;
const RegisterElement = <RouteWrapper element={<RegisterScreen />} title='Divulga.ai | Cadastro' ifAuthenticatedMoveTo='/dashboard' />;
const DashboardElement = <RouteWrapper element={<DashboardScreen />} title='Divulga.ai | Dashboard' isPrivate />;
const SearchElement = <RouteWrapper element={<SearchScreen />} title='Divulga.ai | Buscas' />;

// Router ----------------------------------------------------------------------

export function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={RedirectElement}
        />
        <Route
          path="/login"
          element={LoginElement}
        />
        <Route
          path="/register"
          element={RegisterElement}
        />
        <Route
          path="/dashboard"
          element={DashboardElement}
        />
        <Route
          path="/search"
          element={SearchElement}
        />
      </Routes>
    </BrowserRouter>
  );
}