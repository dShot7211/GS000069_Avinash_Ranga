import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker, Form } from 'rsuite';

export function RhfTimePicker({ name, label, disableTime, meetingDate, ...other }) {
  const { control } = useFormContext();

  return (
    <Form.Group>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <DatePicker
              {...field}
              format="HH:mm" // Show only hours and minutes
              hideSeconds={true} // Hide seconds
              style={{ width: '100%', minwidth: '270px' }}
              placeholder={label}
              disabledTime={disableTime ? disableTime(meetingDate) : undefined}
              onChange={(value) => field.onChange(value)} // Ensure `onChange` passes the value correctly
              {...other}
            />
            {error && (
              <Form.ErrorMessage show placement="bottomStart">
                {error.message}
              </Form.ErrorMessage>
            )}
          </>
        )}
      />
    </Form.Group>
  );
}
