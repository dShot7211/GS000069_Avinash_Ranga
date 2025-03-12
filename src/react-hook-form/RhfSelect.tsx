// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { InputAdornment, SxProps, TextField } from '@mui/material';

import { ReactNode } from 'react';
import SpinnerMUI from '../components/loaders/SpinnerMUI';

// ----------------------------------------------------------------------
interface rhfSelectProps {
  name: string;
  children: ReactNode;
  loading?: boolean;
  readOnly?: any;
  other?: Record<string, any>;
  label: string;
  sx?: SxProps;
  fullWidth?: boolean;
  onChange?: any;
}
export default function RhfSelect({ name, children, loading, readOnly, label, fullWidth, sx, onChange, ...other }: rhfSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          label={label}
          error={!!error}
          helperText={error?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SpinnerMUI loading={loading} />
              </InputAdornment>
            ),
            readOnly: readOnly
          }}
          sx={{ color: 'white', ...sx }}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
