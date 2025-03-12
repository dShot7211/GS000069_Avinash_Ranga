import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import Stack from '@mui/material/Stack';
import logoWide from '../../assets/images/GsynergyLogo.svg';
import config from 'config';

// project import

interface LogoSectionInterface {
  sx?: any;
  to?: string;
  isIcon?: boolean;
  width?: string;
}

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to, width = '100px' }: LogoSectionInterface) => {
  return (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* <Logo /> */}
        <img src={logoWide} alt="img" style={{ width: width, marginTop: '10px' }} />
        {/* <Chip
          label={import.meta.env.VITE_APP_VERSION}
          variant="outlined"
          size="small"
          color="secondary"
          sx={{ mt: 0.5,fontSize: '0.725rem', height: 20, }}
        /> */}
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
