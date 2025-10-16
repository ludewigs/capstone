const originalError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    const [first] = args;
    if (typeof first === 'string' && first.includes('not wrapped in act')) {
      return;
    }
    originalError(...args);
  });
});
afterAll(() => {
  console.error.mockRestore?.();
});

import {
  render,
  screen,
  waitFor,
  fireEvent,
  act
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

const flushPromises = () => new Promise((res) => setTimeout(res, 0));

test('BookingForm validates input and submits when valid', async () => {
  const onSubmit = jest.fn();

  const props = {
    defaultValues: {
      date: '',
      time: '',
      guests: 0,
      occasion: '',
      firstName: '',
      lastName: '',
      email: ''
    },
    availableTimes: ['17:00', '18:00'],
    dispatch: jest.fn(),
    onSubmit
  };

  // Recommended with modern user-event
  const user = userEvent;

  // Some libs scroll to error/inputs
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  render(<BookingForm {...props} />);

  const submitBtn = screen.getByRole('button', { name: /reserve a table/i });

  // 1) Submit empty form (wrap a flush after the click)
  await user.click(submitBtn);
  await act(async () => {
    await flushPromises();
  });

  const alerts = await screen.findAllByRole('alert');
  expect(alerts.length).toBeGreaterThan(0);
  expect(onSubmit).not.toHaveBeenCalled();

  // 2) Fill valid data
  await user.type(screen.getByLabelText(/first name/i), 'Ada');
  await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
  await user.type(screen.getByLabelText(/email/i), 'ada@example.com');

  const isoDate = '2025-10-30';
  const dateInput = screen.getByLabelText(/^date$/i);

  // Try native typing first
  try {
    await user.clear(dateInput);
    await user.type(dateInput, isoDate);
  } catch {
    // Fallback for <input type="date"> in jsdom — wrap in act
    await act(async () => {
      fireEvent.change(dateInput, { target: { value: isoDate } });
      await flushPromises();
    });
  }

  // Let any effects from date change settle (enabling time, dispatch, etc.)
  await act(async () => {
    await flushPromises();
  });

  // Now continue
  await user.selectOptions(screen.getByLabelText(/^time$/i), '17:00');
  await user.selectOptions(screen.getByLabelText(/^guests$/i), '2');
  await user.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');

  // 3) Final submit + flush
  await user.click(submitBtn);
  await act(async () => {
    await flushPromises();
  });

  await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
});
