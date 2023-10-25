import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormSelectBox from '../FormSelectBox';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';

export interface FormTypes {
  City: string;
}
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
function FormComponent({ submitFunc }: { submitFunc: (values: FormTypes) => void }) {
  const { handleSubmit, control } = useForm<FormTypes>({
    defaultValues: {
      City: undefined,
    },
  });

  const onSubmit = async (data: FormTypes) => {
    await submitFunc(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <FormSelectBox
        name="City"
        control={control}
        label="شهر محل تولد"
        rules={{
          required: true,
        }}
        options={dataFeedOptions}
      />
      <button type="submit">submit</button>
    </form>
  );
}

test('render', () => {
  render(<FormComponent submitFunc={() => {}} />);
  expect(screen.getByLabelText('شهر محل تولد')).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /submit/i,
    })
  ).toBeInTheDocument();
});

test('submit functionality', async () => {
  const mockSubmit = jest.fn();

  render(<FormComponent submitFunc={mockSubmit} />);

  const selectInput = screen.getByLabelText('شهر محل تولد');

  await userEvent.type(selectInput, 'Gilan');
  expect(selectInput).toHaveValue('Gilan');
  fireEvent.mouseDown(selectInput);

  const optionTwenty = screen.getByText(/gilan/i);
  fireEvent.click(optionTwenty);

  fireEvent.submit(screen.getByTestId('form'));

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith({ City: 'gilan' });
  });
});
