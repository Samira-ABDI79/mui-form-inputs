import { memo, JSX } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';
import { RhfTextFieldProps } from './types';

function FormTextField<T extends FieldValues>({
  name,
  type = 'text',
  dir = 'rtl',
  label,
  control,
  InputProps,
  InputLabelProps,
  onChangeInterceptor,
  rules,
  ...props
}: RhfTextFieldProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    rules,
  });

  return (
    <TextField
      {...field}
      value={field.value}
      onChange={(e) => {
        field.onChange(e);
        if (onChangeInterceptor) {
          field.onChange(onChangeInterceptor(e.target.value));
        } else {
          field.onChange(e.target.value);
        }
      }}
      onBlur={(event) => {
        if (typeof event.target.value === 'string' && /^\s+|\s+$/g.test(event.target.value)) {
          event.target.value = event.target.value.trim();
          field.onChange(event);
        }
        if (onChangeInterceptor) {
          event.target.value = onChangeInterceptor(event.target.value);
        }
        field.onBlur();
      }}
      label={label}
      type={type}
      error={!!error}
      helperText={error && (error.message || `فیلد ${label} اجباری می باشد`)}
      variant="outlined"
      fullWidth
      InputProps={{ dir, color: 'primary', ...InputProps }}
      InputLabelProps={{ color: 'primary', ...InputLabelProps }}
      {...props}
    />
  );
}

export default memo(FormTextField) as <T extends FieldValues>(
  props: RhfTextFieldProps<T>
) => JSX.Element;
