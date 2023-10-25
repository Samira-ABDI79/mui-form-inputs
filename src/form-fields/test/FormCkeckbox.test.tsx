import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CustomCheckbox from '../FormCkeckbox';
import { useForm } from 'react-hook-form';

export interface FormTypes {
  payment: boolean;
}

function FormComponent({ submitFunc }: { submitFunc: (values: FormTypes) => void }) {
  const { handleSubmit, control } = useForm<FormTypes>({
    defaultValues: {
      payment: false,
    },
  });

  const onSubmit = async (data: FormTypes) => {
    await submitFunc(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <CustomCheckbox name="payment" control={control} label="پرداخت" />

      <button type="submit">submit</button>
    </form>
  );
}

test('render', () => {
  render(<FormComponent submitFunc={() => {}} />);

  expect(
    screen.getByRole('checkbox', {
      name: /پرداخت/i,
    })
  ).toBeInTheDocument();
});

test('submit functionality', async () => {
  const mockSubmit = jest.fn();

  render(<FormComponent submitFunc={mockSubmit} />);
  fireEvent.submit(screen.getByTestId('form'));
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith({ payment: false });
  });
  fireEvent.click(
    screen.getByRole('checkbox', {
      name: /پرداخت/i,
    })
  );
  fireEvent.submit(screen.getByTestId('form'));
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith({ payment: true });
  });
});
