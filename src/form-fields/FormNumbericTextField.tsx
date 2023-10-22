import { ChangeEvent, forwardRef, memo, JSX } from 'react';
import { InputBaseComponentProps, TextField, TextFieldProps } from '@mui/material';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { currencyFormatter, toEnDigit } from 'src/app/utils';
import { UseControllerProps, useController, FieldValues, FieldError } from 'react-hook-form';

type RhfNumericTextFieldProps<T extends FieldValues> = {
  useCurrencyFormatter?: boolean;
} & TextFieldProps &
  UseControllerProps<T>;

const NumericFormatCustom = forwardRef<InputBaseComponentProps, NumericFormatProps>(
  (props, ref) => {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          if (onChange) {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            } as ChangeEvent<HTMLInputElement>);
          }
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  }
);

function CustomNumericTextField<T extends FieldValues>({
  name,
  dir = 'rtl',
  label,
  control,
  useCurrencyFormatter,
  rules,
  ...props
}: RhfNumericTextFieldProps<T>) {
  const helperTextHandler = (value: string, error: FieldError | undefined) => {
    if (error?.message) return error?.message;
    if (useCurrencyFormatter) return currencyFormatter(value);
    return null;
  };

  const {
    field: { value, onChange, ...field },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    rules,
  });

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => {
        e.target.value = toEnDigit(e.target.value);
        onChange(e);
      }}
      {...field}
      label={label}
      error={!!error}
      helperText={helperTextHandler(value as string, error)}
      variant="outlined"
      fullWidth
      InputProps={{
        dir,
        color: 'primary',
        inputComponent: NumericFormatCustom as any,
        className: 'tracking-widest',
      }}
      InputLabelProps={{ color: 'primary' }}
      autoComplete="off"
    />
  );
}

export default memo(CustomNumericTextField) as <T extends FieldValues>(
  props: RhfNumericTextFieldProps<T>
) => JSX.Element;
