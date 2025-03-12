// form
import { Stack } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker, Form } from 'rsuite';

// import { useResponsive } from 'hooks/useResponsive';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
interface feildProps {
  as: React.ElementType;
  field: any;
  name: string;
  error: string | undefined;
  label: string;
  other: Record<string, any>;
  minDate?: Date;
  maxDate?: Date;
}
const Field = ({ as: Component, field, name, error, label, other }: feildProps) => {
  return (
    <Form.Group>
      <Component
        style={{ width: '100%', minwidth: '270px' }}
        id={name}
        value={field.value}
        onChange={(value: any) => {
          field.onChange(value);
        }}
        placeholder={label}
        {...other}
      />
      <Form.ErrorMessage show={!!error} placement="bottomStart">
        {error}
      </Form.ErrorMessage>
    </Form.Group>
  );
};
interface rhfDatePickerProps {
  name: string;
  error?: string | undefined;
  label: string;
  other?: Record<string, any>;
  minDate?: Date;
  maxDate?: Date;
}
export function RhfDatePicker({ name, label, minDate, maxDate, ...other }: rhfDatePickerProps) {
  const { control } = useFormContext();
  // const isMobile = useResponsive('down', 'sm');

  return (
    <Stack style={{ position: 'relative' }}>
      {label && (
        <label
          htmlFor="startdate"
          style={{ marginLeft: '12px', fontSize: '11px', position: 'absolute', zIndex: 55, top: '-8px', backgroundColor: 'white' }}
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Field
            as={DatePicker}
            field={field}
            error={error?.message}
            name={name}
            minDate={minDate}
            maxDate={maxDate}
            label={label}
            other={{ oneTap: true, format: 'dd/MM/yyyy', ...other }}
          />
        )}
      />
    </Stack>
  );
}
