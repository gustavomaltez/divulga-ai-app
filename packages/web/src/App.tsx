import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { AppRouter } from 'router';

export function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        theme='dark'
        newestOnTop
        icon
        bodyClassName="bg-gray-900"
      />
    </>
  );
}