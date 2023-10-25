import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormRating from '../FormRating';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';

export interface FormTypes {
  rating: number;
}

function FormComponent({ submitFunc }: { submitFunc: (values: FormTypes) => void }) {
  const { handleSubmit, control } = useForm<FormTypes>({
    defaultValues: {
      rating: undefined,
    },
  });

  const onSubmit = async (data: FormTypes) => {
    await submitFunc(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <FormRating label="رضایت" control={control} name="rating" />

      <button type="submit">submit</button>
    </form>
  );
}

test('render', () => {
  render(<FormComponent submitFunc={() => {}} />);

  const elements = [
    screen.getByText(/رضایت/i),
    screen.getByDisplayValue(/5/i),
    screen.getByDisplayValue(/2/i),
    screen.getByDisplayValue(/3/i),
    screen.getByDisplayValue(/4/i),
    screen.getByRole('radio', {
      name: /1 star 2 stars 3 stars 4 stars 5 stars empty رضایت/i,
    }),
  ];
  elements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});

test('submit functionality', async () => {
  const mockSubmit = jest.fn();

  render(<FormComponent submitFunc={mockSubmit} />);

  const ratingInput1 = screen.getByText(/رضایت/i);
  await userEvent.type(ratingInput1, '1');

  await userEvent.click(ratingInput1);

  fireEvent.submit(screen.getByTestId('form'));
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith({ rating: 1 });
  });
});
