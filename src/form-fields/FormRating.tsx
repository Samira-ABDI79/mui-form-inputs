import { useController } from 'react-hook-form';
import Rating from '@mui/material/Rating';
import { FormControl, FormControlLabel, FormControlLabelProps } from '@mui/material';
import clsx from 'clsx';

interface FormRatingProps {
  control: any;
  name: string;
  label: string;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  required?: boolean;
  precision?: number;
  size?: 'large' | 'small' | 'medium';
}
export default function FormRating({
  control,
  name,
  label,
  formControlLabelProps,
  required,
  precision = 1,
  size = 'large',
}: FormRatingProps) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: 2,
  });

  return (
    <>
      <FormControl required={required} error={!!error} component="fieldset">
        <FormControlLabel
          className={clsx('ml-auto', formControlLabelProps?.className)}
          control={
            <Rating
              name={name}
              value={value}
              precision={precision}
              size={size}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
            />
          }
          label={label}
        />
      </FormControl>
    </>
  );
}
