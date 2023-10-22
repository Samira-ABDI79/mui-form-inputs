import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import React from 'react';

type TAutocompleteOption = {
  value: string;
  label: string;
};

type TSelectBox = {
  options: TAutocompleteOption[];
  loading?: boolean;
  label: string;
  disabled?: boolean;
  emitOnChange?: Function; // TODO: Function Type
};

type RhfSelectBoxProps<T extends FieldValues> = Omit<
  AutocompleteProps<TAutocompleteOption, boolean, boolean, boolean>,
  'options' | 'renderInput'
> &
  TSelectBox &
  UseControllerProps<T>;

function FormSelectBox<T extends FieldValues>({
  name,
  loading,
  label,
  disabled,
  control,
  options,
  rules,
  defaultValue,
  emitOnChange,
  ...props
}: RhfSelectBoxProps<T>) {
  const {
    field: { value, ref, onChange, ...field },
    fieldState: { error },
  } = useController<T>({
    control,
    name,
    rules,
  });
  const [openSelect, setOpenSelect] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState<TAutocompleteOption | null>(null);
  const [multipleSelectValue, setMultipleSelectValue] = React.useState<TAutocompleteOption[] | []>(
    []
  );

  React.useEffect(() => {
    if (props.multiple) {
      const tempValue: TAutocompleteOption[] = [];
      value.forEach((_v: any) => {
        // eslint-disable-next-line eqeqeq
        const t = options.find((option) => option.value == _v);
        if (t) tempValue.push(t);
      });
      setMultipleSelectValue(tempValue);
    } else {
      setSelectValue(options.find((option) => option.value === value) || null);
    }
  }, [options, props.multiple, value]);

  function openSelectBox() {
    setOpenSelect(true);
  }

  function closeSelectBox() {
    setOpenSelect(false);
  }

  return (
    <Autocomplete
      open={openSelect}
      ref={ref}
      disableClearable
      onChange={(event: any, option: any) => {
        if (props.multiple) {
          onChange(option.map((_option: TAutocompleteOption) => _option.value));
          setMultipleSelectValue(option);
        } else {
          setSelectValue(option);
          onChange(option.value);
        }

        if (typeof emitOnChange === 'function' && option?.value !== value) {
          emitOnChange(option?.value);
        }
      }}
      value={props.multiple ? multipleSelectValue : selectValue}
      disablePortal
      defaultValue={props.multiple ? multipleSelectValue : selectValue}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
      disabled={disabled}
      isOptionEqualToValue={(option, currentValue) => option.label === currentValue.label}
      noOptionsText="داده ای موجود نیست"
      loading={loading}
      loadingText="درحال دریافت اطلاعات، لطفا صبور باشید..."
      options={options}
      onClose={closeSelectBox}
      onOpen={openSelectBox}
      openText="باز"
      closeText="بسته"
      renderInput={({ inputProps: restInputProps, ...params }: any) => (
        <TextField
          {...params}
          inputProps={{ ...restInputProps }}
          label={label}
          error={!!error}
          helperText={error?.message || (error && `فیلد ${label} اجباری می باشد`)}
          onFocus={openSelectBox}
          onBlur={closeSelectBox}
        />
      )}
      {...props}
      {...field}
    />
  );
}

export default React.memo(FormSelectBox) as <T extends FieldValues>(
  props: RhfSelectBoxProps<T>
) => React.JSX.Element;
