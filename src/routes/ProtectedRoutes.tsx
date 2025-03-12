import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export function ProtectedRoutes({ component }: { component: any }) {
  const { isAuthDone } = useSelector((store: any) => store.auth);

  // console.log('allGroupPermissions', allGroupPermissions);

  return isAuthDone ? component : <Navigate to="/unauthorized" />;
}
