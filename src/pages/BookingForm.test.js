import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

test('renders static text in BookingForm', () => {
  const props = {
    defaultValues: {
      date: '',
      time: '',
      guests: 1,
      occasion: '',
      firstName: '',
      lastName: '',
      email: ''
    },
    availableTimes: ['17:00', '18:00'],
    dispatch: jest.fn(),
    onSubmit: jest.fn()
  };

  render(<BookingForm {...props} />);
  expect(screen.getByText(/reserve a table/i)).toBeInTheDocument();
});
