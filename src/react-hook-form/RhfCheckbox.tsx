// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
// import { AnyObject } from 'yup';

// ----------------------------------------------------------------------

interface RhfCheckboxProps {
  name: string;
  label: string; // Add label prop here
  [key: string]: any; // Allow other props to be passed down
}

export function RhfCheckbox({ name, ...other }: RhfCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <FormControlLabel control={<Checkbox {...field} checked={field.value} />} {...other} />}
    />
  );
}

// ----------------------------------------------------------------------

export function RhfMultiCheckbox({ name, options, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: any) =>
          field.value.includes(option) ? field.value.filter((value: any) => value !== option) : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option: any) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox checked={field.value.includes(option.value)} onChange={() => field.onChange(onSelected(option.value))} />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
