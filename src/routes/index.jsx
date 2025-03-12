import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export const router = createBrowserRouter([MainRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });
export const unauthorizedRouter = createBrowserRouter([LoginRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

// export default router;
