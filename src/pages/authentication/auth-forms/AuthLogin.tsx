import React, { startTransition, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Material-UI imports
import { Button, CircularProgress, Divider, Grid, IconButton, InputAdornment, InputLabel, Link, Stack, Typography } from '@mui/material';

// Third-party libraries
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Store';

// Project imports
import AnimateButton from '../../../../src/components/@extended/AnimateButton';
import FormProvider from '../../../react-hook-form/FormProvider';
import { loginApiCall } from '../../../redux/authSlice';

// Assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import RHFTextField from 'react-hook-form/RhfTextfield';

// ============================|| JWT - LOGIN ||============================ //

interface LoginFormInputs {
  email: string;
  password: string;
}

const defaultValues: LoginFormInputs = {
  email: '',
  password: ''
};

export default function AuthLogin(): JSX.Element {
  const { loading } = useSelector((store: RootState) => store.auth);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const methods = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const handleClick: SubmitHandler<LoginFormInputs> = async (data: any) => {
    try {
      await dispatch(loginApiCall(data)).unwrap();
      enqueueSnackbar('Login successful', { variant: 'success' });
      startTransition(() => {
        navigate('/store');
      });
    } catch (error: any) {
      // console.error('Error in login', error);
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleClick)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <RHFTextField name="email" placeholder="Email" fullWidth />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <RHFTextField
                name="password"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="primary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Link variant="h6" component={RouterLink} color="text.primary" to="/forgot-password">
                {/* Forgot Password? */}
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <AnimateButton>
              <Button disableElevation disabled={loading} fullWidth size="large" type="submit" variant="contained" color="primary">
                {loading ? <CircularProgress color="inherit" size={24} /> : 'Login'}
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography variant="caption">Don&apos;t have an account? Please contact admin</Typography>
            </Divider>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
