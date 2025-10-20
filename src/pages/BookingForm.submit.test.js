// src/pages/BookingForm.submit.test.js
const originalError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    const [first] = args;
    if (typeof first === 'string' && first.includes('not wrapped in act'))
      return;
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
  act,
  within
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

// ---- date helpers (keep dates inside the +14 days window) ----
const addDays = (d, days) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};
const toYMD = (d) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// submit helper for jsdom
const flushPromises = () => new Promise((res) => setTimeout(res, 0));

// After choosing a date, BookingForm disables & repopulates the time <select>.
// Wait until it’s enabled and has options, then select the desired time.
const pickTimeSafely = async (value) => {
  const timeSel = screen.getByLabelText(/^time$/i);
  await waitFor(() => {
    expect(timeSel).not.toBeDisabled();
    expect(within(timeSel).getAllByRole('option').length).toBeGreaterThan(1);
  });
  await userEvent.selectOptions(timeSel, value);
};

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

  // Some libs scroll to error/inputs
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  render(<BookingForm {...props} />);

  const submitBtn = screen.getByRole('button', { name: /reserve a table/i });
  const form = submitBtn.closest('form');

  // 1) Submit empty form (button is disabled; submit the FORM directly)
  fireEvent.submit(form);
  await act(async () => {
    await flushPromises();
  });

  const alerts = await screen.findAllByRole('alert');
  expect(alerts.length).toBeGreaterThan(0);
  expect(onSubmit).not.toHaveBeenCalled();

  // 2) Fill valid data
  await userEvent.type(screen.getByLabelText(/first name/i), 'Ada');
  await userEvent.type(screen.getByLabelText(/last name/i), 'Lovelace');
  await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');

  // pick a date within +14 days from "now"
  const today = new Date();
  const isoDate = toYMD(addDays(today, 10));

  const dateInput = screen.getByLabelText(/^date$/i);
  // Try native typing first; fallback to change for jsdom
  try {
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, isoDate);
  } catch {
    await act(async () => {
      fireEvent.change(dateInput, { target: { value: isoDate } });
      await flushPromises();
    });
  }

  // Wait for Time to be enabled & populated, then select it
  await pickTimeSafely('17:00');

  await userEvent.selectOptions(screen.getByLabelText(/^guests$/i), '2');
  await userEvent.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');

  // Optional: ensure the submit button reflects a valid form
  await waitFor(() => expect(submitBtn).not.toBeDisabled());

  // 3) Final submit on the FORM + flush
  fireEvent.submit(form);
  await act(async () => {
    await flushPromises();
  });

  await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
});
