import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormSwitch from '../FormSwitch';
import { useForm } from 'react-hook-form';

export interface FormTypes {
  active: boolean;
}

function FormComponent({ submitFunc }: { submitFunc: (values: FormTypes) => void }) {
  const { handleSubmit, control } = useForm<FormTypes>({
    defaultValues: {
      active: false,
    },
  });

  const onSubmit = async (data: FormTypes) => {
    await submitFunc(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <FormSwitch name="active" control={control} label="فعال" />

      <button type="submit">submit</button>
    </form>
  );
}

test('render', () => {
  render(<FormComponent submitFunc={() => {}} />);
  expect(
    screen.getByRole('checkbox', {
      name: /فعال/i,
    })
  ).toBeInTheDocument();
});

test('submit functionality', async () => {
  const mockSubmit = jest.fn();

  render(<FormComponent submitFunc={mockSubmit} />);
  fireEvent.submit(screen.getByTestId('form'));
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith({ active: false });
  });
  fireEvent.click(
    screen.getByRole('checkbox', {
      name: /فعال/i,
    })
  );
  fireEvent.submit(screen.getByTestId('form'));
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith({ active: true });
  });
});
