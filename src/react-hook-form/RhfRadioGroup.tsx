// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Radio, RadioGroup, FormHelperText, FormControlLabel } from '@mui/material';

// ----------------------------------------------------------------------

export default function RhfRadioGroup({ name, options, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row {...other}>
            {options.map((option: any) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    color={
                      ['error', 'primary', 'secondary', 'info', 'success', 'warning', 'default'].includes(option?.color)
                        ? option.color
                        : 'primary'
                    }
                  />
                }
                label={option.label}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
