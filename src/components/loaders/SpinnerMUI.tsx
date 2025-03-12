import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

// Define the props type
interface SpinnerMUIProps {
  loading?: boolean;
  params?: { InputProps: { endAdornment?: React.ReactNode } };
  size?: number;
}

const SpinnerMUI: React.FC<SpinnerMUIProps> = ({ loading = false, params, size = 18 }) => {
  return (
    <React.Fragment>
      {loading && <CircularProgress color="inherit" size={size} />}
      {params?.InputProps?.endAdornment}
    </React.Fragment>
  );
};

export default SpinnerMUI;
