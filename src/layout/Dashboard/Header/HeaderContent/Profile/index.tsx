import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import logo from '../../../../../../fav-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from 'redux/authSlice';

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  dir?: 'ltr' | 'rtl'; // Add the dir prop, which can be either 'ltr' or 'rtl'
  [key: string]: any; // Allow other props to be passed (e.g., `sx` or `className`)
}

// tab panel wrapper
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
  const { user } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef?.current?.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = () => {
    // console.log('here in log');
    dispatch(logout());
    navigate('/'); // Navigate to the /login route
  };

  const iconBackColorOpen = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
        }}
        component="button"
        ref={anchorRef}
        aria-label="open profile"
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
          {/* <Avatar alt="profile user" src={avatar1} size="sm" /> */}
          <Avatar alt="profile user" src={logo} size="xs" sx={{ bgcolor: 'white' }} />
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {`${user?.first_name} ${user.last_name}`}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: 290, minwidth: 240, maxWidth: { xs: 250, md: 290 } }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          {/* <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} /> */}
                          <Avatar alt="profile user" src={logo} sx={{ width: 28, height: 28, bgcolor: 'white' }} />
                          <Stack>
                            <Typography variant="h6"> {`${user?.first_name} ${user.last_name}`}</Typography>
                            {/* <Typography variant="body2" color="text.secondary">
                             Gsynergy
                            </Typography> */}
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton size="large" sx={{ color: 'text.primary' }} onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
