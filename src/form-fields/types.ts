
import { TextFieldProps } from '@mui/material';
import { FieldValues, UseControllerProps } from 'react-hook-form';

type TTextField = {
    onChangeInterceptor?: (value: string) => string;
  };
  
  export type RhfTextFieldProps<T extends FieldValues> = TextFieldProps &
    TTextField &
    UseControllerProps<T>;
  


  