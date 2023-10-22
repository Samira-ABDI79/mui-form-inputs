import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Grid } from '@mui/material';
import FormTextField from './form-fields/FormTextField';
import { formDefaultValues } from './form-fields/constants';
import { useForm } from 'react-hook-form';

export interface FormTypes {
  userName: string;

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
