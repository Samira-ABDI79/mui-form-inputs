import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import FormDatePicker from '../FormDatePicker';
import AdapterJalali from '@date-io/date-fns-jalali';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MuiPickersAdapter } from '@mui/x-date-pickers/internals';

export interface FormTypes {
  fromUpdates: string;
}

class Adapter extends AdapterJalali {
  getWeekdays = () => {
    return ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  };
}

function DatePickerComponent({ submitFunc }: { submitFunc: (values: FormTypes) => void }) {
  const { handleSubmit, control } = useForm<FormTypes>({
    defaultValues: {
      fromUpdates: 'Mon Jul 25 2016 12:17:58 GMT+0430',
    },
  });

  const onSubmit = async (data: FormTypes) => {
    await submitFunc(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <FormDatePicker
        name="fromUpdates"
        control={control}
        label="Date"
        rules={{
          required: true,
        }}
      />
      <button type="submit">submit</button>
    </form>
  );
}

function RenderComponent() {
  const mock = jest.fn();

  render(
    <LocalizationProvider
      dateAdapter={Adapter as new (...args: any) => MuiPickersAdapter<unknown>}
      dateFormats={{ monthShort: 'MMMM', weekdayShort: 'dddd' }}
      localeText={{ okButtonLabel: 'تایید', cancelButtonLabel: 'انصراف' }}
    >
      <DatePickerComponent submitFunc={mock} />
    </LocalizationProvider>
  );
  return { mock };
}

test('render', async () => {
  RenderComponent();
  expect(
    screen.getByRole('textbox', {
      name: /date/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /submit/i,
    })
  ).toBeInTheDocument();
});

test('sending information', async () => {
  const { mock } = RenderComponent();
  fireEvent.change(
    screen.getByRole('textbox', {
      name: /date/i,
    }),
    { target: { value: '2023-10-24' } }
  );
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  // await waitFor(() => expect(mock).toHaveBeenCalled());
  await waitFor(() => expect(mock).toBeCalled());
});
