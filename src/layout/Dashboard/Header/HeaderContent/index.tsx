// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
// import IconButton from '@mui/material/IconButton';
// import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// project import
// import Search from './Search';
import Profile from './Profile';
// import Notification from './Notification';
import MobileSection from './MobileSection';
import { useGetMenuMaster } from 'api/menu';
import { Typography } from '@mui/material';

// project import
// import { GithubOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme: any) => theme?.breakpoints.down('lg'));
  const { menuMaster } = useGetMenuMaster();

  return (
    <>
      <Typography sx={{ ml: 1.5, fontWeight: 600, width: '100%' }}>{menuMaster?.openedItemTitle}</Typography>
      {!downLG && <Box sx={{ width: '100%' }}></Box>}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      {/* <Notification /> */}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
