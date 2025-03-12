/* eslint-disable react/no-unescaped-entities */
// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import { useTheme } from '@mui/material';
import ForgotPasswordView from './auth-forms/ForgotPasswordView';
import { Icon } from '@iconify/react';

// ================================|| LOGIN ||================================ //

export default function Login() {
  const theme = useTheme();
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item md={12} className="d-flex justify-content-center">
          <Icon icon="ph:fingerprint-light" style={{ fontSize: '34px' }} />
        </Grid>
        <Grid item xs={12} className="d-flex justify-content-center">
          <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography fontWeight={600} color={theme.palette.primary.main} sx={{ fontSize: '23px' }}>
              Forgot password?
            </Typography>
            <Typography color={theme.palette.primary.main} sx={{ fontSize: '13px', my: 0.4, color: theme.palette.grey[600] }}>
              No worries, we'll send you a new password.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ForgotPasswordView />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
