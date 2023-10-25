/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { render, fireEvent, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormTextField from '../FormTextField';
import { useForm } from 'react-hook-form';

export interface FormTypes {
  userName: string;
}

function FormComponent({ submitFunc }: { submitFunc: (values: FormTypes) => void }) {
  const { handleSubmit, control } = useForm<FormTypes>({
    defaultValues: {
      userName: '',
    },
  });

  const onSubmit = async (data: FormTypes) => {
    await submitFunc(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
      <FormTextField
        name="userName"
        control={control}
        label="UserName"
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
  const group = screen.getByRole('group', {
    hidden: true,
  });

  const userName = within(group).getByText(/username/i);
  expect(userName).toBeInTheDocument();
  expect(
    screen.getByRole('textbox', {
      name: /username/i,
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

  const userNameInput = screen.getByLabelText('UserName');
  await userEvent.type(userNameInput, 'test-user');
  expect(userNameInput).toHaveValue('test-user');

  fireEvent.submit(screen.getByTestId('form'));
  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockSubmit).toHaveBeenCalledWith({ userName: 'test-user' });
  });
});
