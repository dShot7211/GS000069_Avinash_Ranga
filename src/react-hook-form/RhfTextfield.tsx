import { useFormContext, Controller } from 'react-hook-form';
import { FormHelperText, OutlinedInput, TextField } from '@mui/material';

export default function RHFTextField({ login, name, multiline = false, rows = '', InputProps, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            {login ? (
              <>
                <OutlinedInput
                  {...field}
                  fullWidth
                  multiline={multiline}
                  rows={rows}
                  value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                  error={!!error}
                  //   helperText={error?.message}
                  {...other}
                />
                <FormHelperText error>{error?.message}</FormHelperText>
              </>
            ) : (
              <TextField
                {...field}
                fullWidth
                multiline={multiline}
                rows={rows}
                value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                error={!!error}
                helperText={error?.message}
                InputProps={InputProps}
                {...other}
              />
            )}
          </>
        );
      }}
    />
  );
}
