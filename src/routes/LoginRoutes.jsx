import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const ForgotPass = Loadable(lazy(() => import('pages/authentication/forgotpass')));
// const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '',
      element: <AuthLogin />
    },
    {
      path: '/forgot-password',
      element: <ForgotPass />
    }
  ]
};

export default LoginRoutes;
