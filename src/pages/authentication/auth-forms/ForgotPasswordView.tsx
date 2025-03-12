import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { PATTERNS } from 'utils/validations';
import { geterrormessage } from 'utils/apiHelper';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { Apiendpoints, BASE_URL } from 'network/apiEndPoints';
import FormProvider from 'react-hook-form/FormProvider';
import RHFTextField from 'react-hook-form/RhfTextfield';

// ============================|| JWT - LOGIN ||============================ //

const defaultValues = {
  username: ''
};

export default function ForgotPasswordView() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  // const theme = useTheme();

  const login = Yup.object().shape({
    username: Yup.string().required('Email is required')
  });

  const methods = useForm({
    resolver: yupResolver(login),
    defaultValues
  });

  const { handleSubmit } = methods;

  const handleClick = async (data: any) => {
    console.log('data', data);
    setLoading(true);

    try {
      await axios.post(BASE_URL + Apiendpoints.FORGOT_PASSWORD, data);
      enqueueSnackbar('Password successfully reset', { variant: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1000);
      setLoading(false);
    } catch (error) {
      console.log('error in forgotpass', error);
      enqueueSnackbar(geterrormessage(error), { variant: 'error' });
      setLoading(false);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleClick)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <RHFTextField name="username" label="Email" fullWidth login />
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Link
                variant="h6"
                component={RouterLink}
                color="text.primary"
                className="d-flex align-items-center"
                to="/"
                // style={{ color: theme.palette.grey[500] }}
              >
                <Icon icon="ic:round-arrow-back" style={{ fontSize: '20px', marginRight: '6px' }} />
                Back to login
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <AnimateButton>
              <Button disableElevation disabled={loading} fullWidth size="large" type="submit" variant="contained" color="primary">
                {loading ? <CircularProgress color="inherit" size={24} /> : 'Reset password'}
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography variant="caption">Don&apos;t have an account? Please contact admin</Typography>
            </Divider>
          </Grid>
        </Grid>

        {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack> */}
      </FormProvider>
    </>
  );
}

ForgotPasswordView.propTypes = { isDemo: PropTypes.bool };
