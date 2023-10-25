/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CustomNumericTextField from '../FormNumbericTextField';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';

export interface FormTypes {
  amount: number;
}

function FormComponent({ submitFunc }: { submitFunc: (values: FormTypes) => void }) {
  const { handleSubmit, control } = useForm<FormTypes>({
    defaultValues: {
      amount: undefined,
    },
  });

  const onSubmit = async (data: FormTypes) => {
    await submitFunc(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <CustomNumericTextField
        control={control}
        name="amount"
        label="مبلغ"
        rules={{
          required: true,
        }}
      />
      <button type="submit">submit</button>
    </form>
  );
}

test('render', () => {
  render(<FormComponent submitFunc={() => {}} />);

  expect(
    screen.getByRole('textbox', {
      name: /مبلغ/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /submit/i,
    })
  ).toBeInTheDocument();
});

test('submit functionality', async () => {
  const mockSubmit = jest.fn();

  render(<FormComponent submitFunc={mockSubmit} />);

  const amountInput = screen.getByRole('textbox', {
    name: /مبلغ/i,
  });
  await userEvent.type(amountInput, '123456');
  expect(amountInput).toHaveValue('123,456');

  fireEvent.submit(screen.getByTestId('form'));
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith({ amount: '123456' });
  });
});
