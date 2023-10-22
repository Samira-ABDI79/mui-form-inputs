import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import Switch from '@mui/material/Switch';
import { Grid, Typography } from '@mui/material';

interface CustomSwitchProps<T extends FieldValues> {
  name: string;
  label: string;
  control: any; // Replace "any" with the appropriate type for your form library
  dir?: 'rtl' | 'ltr';
  [key: string]: any;
}

function FormSwitch<T extends FieldValues>({
  name,
  label,
  control,
  dir = 'rtl',
  ...props
}: CustomSwitchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Grid
          container
          item
          spacing={4}
          dir={dir}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="w-[300px]"
        >
          <Grid item xs={8}>
            <Typography>{label}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch
              {...props}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
       
             
        
            />
          </Grid>
        </Grid>
      )}
    />
  );
}

export default React.memo(FormSwitch);