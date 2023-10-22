import { memo, JSX, useState, MouseEvent } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { RhfPasswordProps } from './types';

function FormPassword<T extends FieldValues>({
  name,
  control,
  rules,
  onChangeInterceptor,
  ...props
}: RhfPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    field: { onBlur, onChange, ...field },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    rules,
  });

  const handleClickShowPassword = (event: MouseEvent<HTMLButtonElement, MouseEvent>): void =>
    setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
  };

  return (
    <TextField
      {...props}
      {...field}
      onBlur={(event) => {
        if (typeof event.target.value === 'string' && /^\s+|\s+$/g.test(event.target.value)) {
          event.target.value = event.target.value.trim();
          onChange(event);
        }
        if (onChangeInterceptor) {
          event.target.value = onChangeInterceptor(event.target.value);
        }
        onBlur();
      }}
      onChange={(e) => {
        if (onChangeInterceptor) {
          onChange(onChangeInterceptor(e.target.value));
        } else {
          onChange(e.target.value);
        }
      }}
      type={showPassword ? 'text' : 'password'}
      error={!!error}
      helperText={error?.message || (error && `فیلد ${props.label} اجباری میباشد`)}
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword as any}
              onMouseDown={handleMouseDownPassword as any}
              edge="end"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default memo(FormPassword) as <T extends FieldValues>(
  props: RhfPasswordProps<T>
) => JSX.Element;
