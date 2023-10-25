import { Button, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import FormRating from './FormRating';
import FormSwitch from './FormSwitch';
import FormTextField from './FormTextField';
import FormDatePicker from './FormDatePicker';
import FormSelectBox from './FormSelectBox';
import FormPassword from './FormPassword';
import CustomNumericTextField from './FormNumbericTextField';
import CustomCheckbox from './FormCkeckbox';

const formDefaultValues = {
  firstNameLastName: '',
  reservationDate: 'Mon Jul 25 2016 12:17:58 GMT+0430',
  password: undefined,
  amount: undefined,
  phoneNumber: 'vvfvffvfvfvfv',
  active: true,
  payment: true,
  City: 'tehran',
  Satisfaction: 4,
};

export interface FormTypes {
  firstNameLastName: string;
  reservationDate: string;
  password: string | number;
  amount: number;
  phoneNumber: string;
  active: boolean;
  payment: boolean;
  City: string;
  Satisfaction: number;
}

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#~&_])[A-Za-z\d@$!%*?#~&_]{8,}$/;

export default function FormComponent({ onUserAdd }: { onUserAdd: (data: FormTypes) => void }) {
  useTranslation('unstructured-data');

  const { control, handleSubmit } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues: formDefaultValues,
  });
  const submitFunc = (data: FormTypes) => {
    console.log(data);
    onUserAdd(data);
  };

  const dataFeedOptions = [
    {
      label: 'Tehran',
      value: 'tehran',
    },
    {
      label: 'Gilan',
      value: 'gilan',
    },
  ];
  return (
    <>
      <Paper className="p-20">
        <form onSubmit={handleSubmit(submitFunc)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormTextField
                name="firstNameLastName"
                control={control}
                label="نام و نام خانوادگی"
                type="text"
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormDatePicker
                name="reservationDate"
                control={control}
                label="تاریخ رزرو"
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormPassword
                control={control}
                name="password"
                label="رمز عبور"
                rules={{
                  pattern: {
                    value: passwordRegex,
                    message: 'لطفا یک گذرواژه معتبر وارد کنید',
                  },
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomNumericTextField
                control={control}
                name="amount"
                label="مبلغ"
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormTextField
                name="phoneNumber"
                control={control}
                label="شماره موبایل"
                type="number"
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormSwitch name="active" control={control} label="فعال" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomCheckbox name="payment" control={control} label="پرداخت" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormSelectBox
                name="City"
                control={control}
                label="شهر محل تولد"
                rules={{
                  required: true,
                }}
                options={dataFeedOptions}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormRating label="رضایت" control={control} name="Satisfaction" />
            </Grid>

            <Grid item xs={6} md={2}>
              <Button type="submit" fullWidth>
                submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
