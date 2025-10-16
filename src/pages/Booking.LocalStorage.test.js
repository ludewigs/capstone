// Booking.localStorage.test.jsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Booking from './Booking';

// helper to deal with <input type="date"> in jsdom
const setDate = async (input, value) => {
  // try native typing first
  try {
    await userEvent.clear(input);
    await userEvent.type(input, value);
  } catch {
    // fallback for jsdom
    fireEvent.change(input, { target: { value } });
  }
};

beforeEach(() => {
  // clean up storage & mocks between tests
  localStorage.clear();
  jest.clearAllMocks();

  // provide available times for initializeTimes/updateTimes
  global.fetchAPI = jest
    .fn()
    .mockReturnValue([
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30'
    ]);

  // avoid jsdom crashes if form calls this
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

afterEach(() => {
  delete global.fetchAPI;
  delete global.submitAPI;
});

test('writes a new booking to localStorage when submitAPI succeeds', async () => {
  // submit resolves true -> success path
  global.submitAPI = jest.fn().mockResolvedValue(true);

  render(<Booking />);

  // Fill in the form
  await userEvent.type(screen.getByLabelText(/first name/i), 'Ada');
  await userEvent.type(screen.getByLabelText(/last name/i), 'Lovelace');
  await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');

  const dateInput = screen.getByLabelText(/^date$/i);
  await setDate(dateInput, '2025-10-30');

  await userEvent.selectOptions(screen.getByLabelText(/^time$/i), '17:00');
  await userEvent.selectOptions(screen.getByLabelText(/^guests$/i), '2');
  await userEvent.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');

  // Submit
  await userEvent.click(
    screen.getByRole('button', { name: /reserve a table/i })
  );

  // Wait until submitAPI has been called and localStorage is written
  await waitFor(() => {
    expect(global.submitAPI).toHaveBeenCalledTimes(1);
    const stored = JSON.parse(localStorage.getItem('bookings'));
    expect(Array.isArray(stored)).toBe(true);
    expect(stored).toHaveLength(1);
  });

  const stored = JSON.parse(localStorage.getItem('bookings'));
  expect(stored[0]).toMatchObject({
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    date: '2025-10-30',
    time: '17:00',
    guests: 2,
    occasion: 'Birthday'
  });
});

test('reads existing bookings and appends the new one on success', async () => {
  // Seed localStorage with an existing booking
  const existing = [
    {
      firstName: 'Alan',
      lastName: 'Turing',
      email: 'alan@ex.com',
      date: '2025-10-01',
      time: '18:00',
      guests: 2,
      occasion: 'Anniversary'
    }
  ];
  localStorage.setItem('bookings', JSON.stringify(existing));

  global.submitAPI = jest.fn().mockResolvedValue(true);

  render(<Booking />);

  // Fill form for a second booking
  await userEvent.type(screen.getByLabelText(/first name/i), 'Grace');
  await userEvent.type(screen.getByLabelText(/last name/i), 'Hopper');
  await userEvent.type(screen.getByLabelText(/email/i), 'grace@example.com');

  const dateInput = screen.getByLabelText(/^date$/i);
  await setDate(dateInput, '2025-11-05');

  await userEvent.selectOptions(screen.getByLabelText(/^time$/i), '19:30');
  await userEvent.selectOptions(screen.getByLabelText(/^guests$/i), '4');
  await userEvent.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');

  // Submit
  await userEvent.click(
    screen.getByRole('button', { name: /reserve a table/i })
  );

  // Expect two items now (existing + new)
  await waitFor(() => {
    const stored = JSON.parse(localStorage.getItem('bookings'));
    expect(stored).toHaveLength(2);
  });

  const stored = JSON.parse(localStorage.getItem('bookings'));
  expect(stored[0]).toMatchObject(existing[0]); // original preserved
  expect(stored[1]).toMatchObject({
    firstName: 'Grace',
    lastName: 'Hopper',
    email: 'grace@example.com',
    date: '2025-11-05',
    time: '19:30',
    guests: 4,
    occasion: 'Birthday'
  });
});
