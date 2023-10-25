/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormPassword from '../FormPassword';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';

export interface FormTypes {
  password: string;
}
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#~&_])[A-Za-z\d@$!%*?#~&_]{8,}$/;

function FormComponent({ submitFunc }: { submitFunc: (values: FormTypes) => void }) {
  const { handleSubmit, control } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: FormTypes) => {
    await submitFunc(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
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
      <button type="submit">submit</button>
    </form>
  );
}

test('render', () => {
  render(<FormComponent submitFunc={() => {}} />);

  expect(screen.getByLabelText(/رمز عبور/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /submit/i,
    })
  ).toBeInTheDocument();
});
test('display password field errors', async () => {
  render(<FormComponent submitFunc={() => {}} />);

  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  await userEvent.type(passwordInput, 'test-user');

  expect(passwordInput).toHaveValue('test-user');
  await waitFor(() => {
    expect(screen.getByText(/لطفا یک گذرواژه معتبر وارد کنید/i)).toBeInTheDocument();
  });

  fireEvent.change(passwordInput, { target: { value: '' } });
  await waitFor(() => {
    expect(screen.getByText(/فیلد رمز عبور اجباری میباشد/i)).toBeInTheDocument();
  });
});

test('submit functionality', async () => {
  const mockSubmit = jest.fn();

  render(<FormComponent submitFunc={mockSubmit} />);

  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  await userEvent.type(passwordInput, 'User@123');
  expect(passwordInput).toHaveValue('User@123');

  fireEvent.submit(screen.getByTestId('form'));
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith({ password: 'User@123' });
  });
});
