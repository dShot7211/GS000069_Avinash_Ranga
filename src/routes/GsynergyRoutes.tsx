import DashboardLayout from 'layout/Dashboard';
import Store from 'pages/store';
import { lazy } from 'react';
import { ProtectedRoutes } from './ProtectedRoutes';
const ProfilePage = lazy(() => import('pages/ems/profile/ProfilePage'));
const MixedChart = lazy(() => import('pages/chart/MixedChart'));
const UnAuthorized = lazy(() => import('components/error/UnAuthorized'));
const SKUView = lazy(() => import('pages/sku/SKUView'));
const PlanningView = lazy(() => import('pages/planning/PlanningView'));

const GsynergyRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/store',
      element: <ProtectedRoutes component={<Store />} />
    },
    {
      path: '/sku',
      element: <ProtectedRoutes component={<SKUView />} />
    },
    {
      path: '/planning',
      element: <ProtectedRoutes component={<PlanningView />} />
    },
    {
      path: '/chart',
      element: <ProtectedRoutes component={<MixedChart />} />
    },

    {
      path: '/profile',
      element: <ProtectedRoutes component={<ProfilePage />} />
    },
    {
      path: '/unauthorized',
      element: <UnAuthorized />
    }
  ]
};

export default GsynergyRoutes;
