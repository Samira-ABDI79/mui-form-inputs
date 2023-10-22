import React from 'react';
import TextField from '@mui/material/TextField';
import { FieldValues, useController } from 'react-hook-form';
import { HiOutlineCalendar } from 'react-icons/hi';
import { IconButton, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RhfDatePickerProps } from './types';

function FormDatePicker<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  restOnChange,
  icon = <HiOutlineCalendar />,
  toolbarTitle,
  ...props
}: RhfDatePickerProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<T | null>(null);

  React.useEffect(() => {
    setInputValue(field.value);
  }, [field.value]);

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <DatePicker
      value={field.value || inputValue}
      open={open}
      closeOnSelect
      disableFuture
      onClose={onClose}
      onOpen={onOpen}
      openTo="year"
      views={['year', 'month', 'day']}
      toolbarTitle={toolbarTitle || label}
      disableMaskedInput
      label={label}
      toolbarFormat="d MMMM yyyy"
      inputFormat="d MMMM yyyy"
      PopperProps={{
        sx: (theme: any) => ({
          '& .MuiCalendarPicker-root': {
            button: { fontSize: '14px' },
          },
          '& .MuiPickersDay-root': {
            fontWeight: 400,
          },
        }),
      }}
      onChange={(newValue : any) => {
        setInputValue(newValue as unknown as T);
        if (newValue) {
          field.onChange(newValue);
        }
        if (newValue === null) {
          field.onChange(null);
        }
      }}
      onAccept={(newValue:any) => {
        if (newValue) {
          if (restOnChange) {
            restOnChange(newValue);
          }
          field.onChange(newValue);
        }
      }}
      renderInput={({ InputProps, ...params }: any) => {
        return (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={error?.message || (error && `فیلد ${label} اجباری می باشد`)}
            onClick={onOpen}
            autoComplete="off"
            InputProps={{
              ...InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color={error ? 'error' : 'default'} onClick={() => setOpen(true)}>
                    {icon}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      }}
      {...props}
    />
  );
}

export default React.memo(FormDatePicker) as <T extends FieldValues>(
  props: RhfDatePickerProps<T>
) => React.JSX.Element;
