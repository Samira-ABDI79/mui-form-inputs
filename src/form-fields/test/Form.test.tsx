import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormComponent from '../Form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MuiPickersAdapter } from '@mui/x-date-pickers/internals';
import AdapterJalali from '@date-io/date-fns-jalali';
import i18n from 'src/i18n';
import { I18nextProvider } from 'react-i18next';
import userEvent from '@testing-library/user-event';

class Adapter extends AdapterJalali {
  getWeekdays = () => {
    return ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  };
}
function RenderComponent() {
  const mock = jest.fn();
  render(
    <I18nextProvider i18n={i18n}>
      <LocalizationProvider
        dateAdapter={Adapter as new (...args: any) => MuiPickersAdapter<unknown>}
        dateFormats={{ monthShort: 'MMMM', weekdayShort: 'dddd' }}
        localeText={{ okButtonLabel: 'تایید', cancelButtonLabel: 'انصراف' }}
      >
        <FormComponent onUserAdd={mock} />
      </LocalizationProvider>
    </I18nextProvider>
  );
  const elements = [
    screen.getByRole('textbox', {
      name: /نام و نام خانوادگی/i,
    }),
    screen.getByRole('textbox', {
      name: /تاریخ رزرو/i,
    }),
    screen.getByLabelText(/رمز عبور/i),
    screen.getByRole('textbox', {
      name: /مبلغ/i,
    }),
    screen.getByRole('spinbutton', {
      name: /شماره موبایل/i,
    }),
    screen.getByRole('checkbox', {
      name: /فعال/i,
    }),
    screen.getByRole('checkbox', {
      name: /پرداخت/i,
    }),
    screen.getByRole('combobox', {
      name: /شهر محل تولد/i,
    }),
    screen.getByText(/رضایت/i),
  ];
  return { elements, mock };
}

test('render component', () => {
  const { elements } = RenderComponent();
  elements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});

test('display of name and family name field errors', async () => {
  RenderComponent();

  const firstNameLastName = screen.getByRole('textbox', {
    name: /نام و نام خانوادگی/i,
  });

  fireEvent.change(firstNameLastName, { target: { value: 'test-user' } });
  expect(firstNameLastName).toHaveValue('test-user');
  fireEvent.change(firstNameLastName, { target: { value: '' } });
  await waitFor(() => {
    expect(screen.getByText(/فیلد نام و نام خانوادگی اجباری می باشد/i)).toBeInTheDocument();
  });
});
test('display password field errors', async () => {
  RenderComponent();

  const password = screen.getByLabelText(/رمز عبور/i);

  fireEvent.change(password, { target: { value: 'test-user' } });
  expect(password).toHaveValue('test-user');
  await waitFor(() => {
    expect(screen.getByText(/لطفا یک گذرواژه معتبر وارد کنید/i)).toBeInTheDocument();
  });

  fireEvent.change(password, { target: { value: '' } });
  await waitFor(() => {
    expect(screen.getByText(/فیلد رمز عبور اجباری میباشد/i)).toBeInTheDocument();
  });
});

test('sending information', async () => {
  const { mock } = RenderComponent();
  fireEvent.change(screen.getByLabelText(/نام و نام خانوادگی/i), { target: { value: 'John Doe' } });

  fireEvent.change(screen.getByLabelText(/رمز عبور/i), { target: { value: 'User@123' } });
  const amountInput = screen.getByRole('textbox', {
    name: /مبلغ/i,
  });

  await userEvent.type(amountInput, '123456');
  fireEvent.change(
    screen.getByRole('spinbutton', {
      name: /شماره موبایل/i,
    }),
    { target: { value: '123456' } }
  );
  fireEvent.click(
    screen.getByRole('checkbox', {
      name: /فعال/i,
    })
  );
  fireEvent.click(
    screen.getByRole('checkbox', {
      name: /پرداخت/i,
    })
  );
  const selectInput = screen.getByLabelText('شهر محل تولد');

  await userEvent.type(selectInput, 'Gilan');
  expect(selectInput).toHaveValue('Gilan');
  fireEvent.mouseDown(selectInput);

  const optionTwenty = screen.getByText(/gilan/i);
  fireEvent.click(optionTwenty);
  const ratingInput1 = screen.getByText(/رضایت/i);
  await userEvent.type(ratingInput1, '1');

  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  await waitFor(() => {
    expect(mock).toBeCalled();
    expect(mock).toHaveBeenCalledWith({
      firstNameLastName: 'John Doe',
      reservationDate: 'Mon Jul 25 2016 12:17:58 GMT+0430',
      password: 'User@123',
      amount: '123456',
      phoneNumber: '123456',
      active: false,
      payment: false,
      City: 'gilan',
      Satisfaction: 1,
    });
  });
});
