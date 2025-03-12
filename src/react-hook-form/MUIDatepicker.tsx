import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// Reusable DatePicker Component
export const MUIDatepicker = ({
  name,
  label,
  minDate,
  maxDate,
  shouldDisableDate,
  ...other
}: DatePickerProps<Dayjs> & {
  name: string;
  label: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  shouldDisableDate?: any;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={dayjs(value)}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            minDate={minDate ? dayjs(minDate) : undefined}
            maxDate={maxDate ? dayjs(maxDate) : undefined}
            shouldDisableDate={shouldDisableDate}
            renderInput={(params: any) => <TextField {...params} fullWidth error={!!error} helperText={error ? error.message : ''} />}
            {...other}
          />
        </LocalizationProvider>
      )}
    />
  );
};
