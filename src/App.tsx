import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Grid } from '@mui/material';
import FormTextField from './form-fields/FormTextField';
import { formDefaultValues, historyStorageOptions } from './form-fields/constants';
import { useForm } from 'react-hook-form';
import FormSwitch from './form-fields/FormSwitch';
import FormSelectBox from './form-fields/FormSelectBox';
import FormDatePicker from './form-fields/FormDatePicker';

export interface FormTypes {
  userName: string;
  active:boolean;
  historyStorage: string;
  update:string

}
const submitFunc = (data: FormTypes) => {
 console.log(data)
};

function App() {
  const { control, handleSubmit } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues: formDefaultValues,
  });
  return (
    <form onSubmit={handleSubmit(submitFunc)} noValidate>
    <Grid item container spacing={2} xs={12}>
      <Grid item xs={12} sm={6} md={4}>
        <FormTextField
          name="userName"
          control={control}
          variant="outlined"
          label="User Name"
          rules={{
            required: true,
          }}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <FormSwitch
          name="active"
          control={control}
         label='active'
 
    
          rules={{
            required: true,
          }}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <FormSelectBox
              name="historyStorage"
              control={control}
              label="historyStorage"
              options={historyStorageOptions}
              rules={{
                required: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormDatePicker
              name="update"
              control={control}
              label="update"
              rules={{
                required: true,
              }}
            />
          </Grid>
        <Grid item xs={12} md={4} className="flex justify-end">
            <Button type="submit" size="medium" variant="contained" fullWidth>
         
    submit
            </Button>
          </Grid>
        </Grid>
        </form>
  );
}

export default App;
