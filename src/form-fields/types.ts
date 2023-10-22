
import { TextFieldProps } from '@mui/material';
import { FieldValues, UseControllerProps } from 'react-hook-form';

type TTextField = {
    onChangeInterceptor?: (value: string) => string;
  };

  export type TSwitch = {
    onChangeInterceptor?: (value: boolean) => boolean;
  };
  export type RhfTextFieldProps<T extends FieldValues> = TextFieldProps &
  TTextField &
  UseControllerProps<T>;
  
  
  export type RhfSwitchProps<T extends FieldValues> =
  TSwitch &
    UseControllerProps<T>;
  


  