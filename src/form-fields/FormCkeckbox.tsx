import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import clsx from 'clsx';
import { memo, JSX } from 'react';
import { FormControl } from '@mui/material';

type TCheckBoxProps = {
  label: string;
  required?: boolean;
  options?: TCheckBoxProps;
  isCheckedhandler?: Function;
  onChangeInterceptor?: Function;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  onChangeEmit?: Function;
};

type RhfCheckBoxProps<T extends FieldValues> = UseControllerProps<T> &
  CheckboxProps &
  TCheckBoxProps;

function CustomCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  required = false,
  formControlLabelProps,
  isCheckedhandler: isCheckedCondition,
  onChangeInterceptor,
  onChangeEmit,
}: RhfCheckBoxProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <FormControl required={required} error={!!error} component="fieldset">
      <FormGroup>
        <FormControlLabel
          {...formControlLabelProps}
          className={clsx('ml-auto', formControlLabelProps?.className)}
          control={
            <Checkbox
              {...field}
              checked={
                typeof isCheckedCondition === 'function'
                  ? isCheckedCondition(field.value)
                  : field.value
              }
              onChange={(_, isChecked) => {
                if (onChangeInterceptor) {
                  if (typeof onChangeEmit === 'function') {
                    onChangeEmit(onChangeInterceptor(isChecked));
                  }
                  field.onChange(onChangeInterceptor(isChecked));
                } else {
                  if (typeof onChangeEmit === 'function') {
                    onChangeEmit(isChecked);
                  }
                  field.onChange(isChecked);
                }
              }}
            />
          }
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
}

export default memo(CustomCheckbox) as <T extends FieldValues>(
  props: RhfCheckBoxProps<T>
) => JSX.Element;
