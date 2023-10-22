import { TextFieldProps } from '@mui/material';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { ReactNode } from 'react';
import { FieldError, FieldValues, UseControllerProps } from 'react-hook-form';

type TDatePickerForm = {
  label: string;
  restOnChange?: Function;
  toolbarTitle?: string;
  icon?: ReactNode;
  dateFormat?: string;
};

export type RhfDatePickerProps<T extends FieldValues> = Omit<
  DatePickerProps<T, Date>,
  'value' | 'onChange' | 'renderInput'
> &
  UseControllerProps<T> &
  TDatePickerForm;

type TTextField = {
  onChangeInterceptor?: (value: string) => string;
};

export type RhfTextFieldProps<T extends FieldValues> = TextFieldProps &
  TTextField &
  UseControllerProps<T>;

type TPassword = {
  onChangeInterceptor?: (value: string) => string;
};

export type RhfPasswordProps<T extends FieldValues> = TextFieldProps &
  TPassword &
  UseControllerProps<T>;

type TCKEditor = {};

export type RhfCKEditorProps<T extends FieldValues> = TCKEditor & UseControllerProps<T>;

type FileAcceptTypes = '*' | '.jpg' | '.png' | '.jpeg';

type TImageUploader = {
  accept?: FileAcceptTypes[];
  label?: string;
  maxSize?: number;
};

export type PresentionalUploadProps = {
  value: any;
  onChange: (file?: File, callback?: () => void) => void;
  error?: FieldError;
  label?: string;
  maxSize?: number;
  accept?: FileAcceptTypes[];
  acceptDisplayer?: string;
  onShowFile: (fileToShow?: File) => void;
};

export type RhfImageUploaderProps<T extends FieldValues> = TImageUploader & UseControllerProps<T>;
