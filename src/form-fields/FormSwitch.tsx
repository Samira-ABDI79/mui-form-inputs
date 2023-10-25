import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import Switch, { SwitchProps } from '@mui/material/Switch';
import clsx from 'clsx';
import { memo, JSX } from 'react';
import { FormControl } from '@mui/material';

type TSwitchProps = {
  label: string;
  required?: boolean;
  options?: TSwitchProps;
  isCheckedhandler?: Function;
  onChangeInterceptor?: Function;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  onChangeEmit?: Function;
};

type RhfSwitchProps<T extends FieldValues> = UseControllerProps<T> & SwitchProps & TSwitchProps;

function FormSwitch<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  required = false,
  formControlLabelProps,
  isCheckedhandler: isCheckedCondition,
  onChangeInterceptor,
  onChangeEmit,
}: RhfSwitchProps<T>) {
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
            <Switch
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

export default memo(FormSwitch) as <T extends FieldValues>(props: RhfSwitchProps<T>) => JSX.Element;
