import { RouterProvider } from 'react-router-dom';

// project import
// import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { useSelector } from 'react-redux';
import { router, unauthorizedRouter } from 'routes';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const { isAuthDone } = useSelector((store) => store.auth);
  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={isAuthDone ? router : unauthorizedRouter} />
      </ScrollTop>
    </ThemeCustomization>
  );
}
