import {
  render,
  screen,
  waitFor,
  fireEvent,
  act
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router-dom';
import Booking from './Booking';

// ---------- freeze "today" so min/max dates are deterministic ----------
const BASE_TODAY = new Date('2025-10-20T12:00:00Z');

const addDays = (d, days) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
};

const toYMD = (d) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// ---------- helpers ----------
const setDate = async (input, value) => {
  // try native typing first; fallback to change event for jsdom
  try {
    await userEvent.clear(input);
    await userEvent.type(input, value);
  } catch {
    fireEvent.change(input, { target: { value } });
  }
};

const getSubmitButton = () =>
  screen.queryByRole('button', { name: /on click/i }) ||
  screen.queryByRole('button', { name: /reserve a table/i }) ||
  screen.getByRole('button');

// Wait until time <select> is enabled and populated, then select the desired time
const pickTimeSafely = async (value) => {
  const timeSelect = screen.getByLabelText(/^time$/i);
  await waitFor(() => {
    expect(timeSelect).not.toBeDisabled();
    expect(timeSelect.querySelectorAll('option').length).toBeGreaterThan(1);
  });
  await userEvent.selectOptions(timeSelect, value);
};

// ---------- lifecycle ----------
let mockNavigate;

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(BASE_TODAY); // lock "today"
  localStorage.clear();
  jest.clearAllMocks();

  mockNavigate = jest.fn();
  jest.spyOn(router, 'useNavigate').mockReturnValue(mockNavigate);

  // Provide available times for initializeTimes/updateTimes
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

  // avoid jsdom crashes
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  delete global.fetchAPI;
  delete global.submitAPI;
  jest.useRealTimers();
});

// ---------- tests ----------
test('writes a new booking to localStorage when submitAPI succeeds', async () => {
  global.submitAPI = jest.fn().mockResolvedValue(true);

  render(<Booking />);

  // Fill the form
  await userEvent.type(screen.getByLabelText(/first name/i), 'Ada');
  await userEvent.type(screen.getByLabelText(/last name/i), 'Lovelace');
  await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');

  const dateStr = toYMD(addDays(BASE_TODAY, 10)); // within +14 days
  const dateInput = screen.getByLabelText(/^date$/i);
  await setDate(dateInput, dateStr);

  await pickTimeSafely('17:00');
  await userEvent.selectOptions(screen.getByLabelText(/^guests$/i), '2');
  await userEvent.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');

  // Ensure the button is enabled (i.e., form valid)
  await waitFor(() => expect(getSubmitButton()).not.toBeDisabled());

  // Submit the form directly (more robust), then flush the 1500ms delay
  const form = getSubmitButton().closest('form');
  await act(async () => {
    fireEvent.submit(form);
  });
  await act(async () => {
    jest.advanceTimersByTime(1600);
  });

  // Verify submit and storage
  await waitFor(() => expect(global.submitAPI).toHaveBeenCalledTimes(1));
  await waitFor(() => {
    const stored = JSON.parse(localStorage.getItem('bookings'));
    expect(Array.isArray(stored)).toBe(true);
    expect(stored).toHaveLength(1);
  });

  const stored = JSON.parse(localStorage.getItem('bookings'));
  expect(stored[0]).toMatchObject({
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    date: dateStr,
    time: '17:00',
    guests: 2,
    occasion: 'Birthday'
  });

  expect(mockNavigate).toHaveBeenCalledWith('/confirmation', {
    state: expect.objectContaining({ firstName: 'Ada' })
  });
});

test('overwrites previous bookings with the latest on success', async () => {
  // Seed an existing booking (will be overwritten)
  localStorage.setItem(
    'bookings',
    JSON.stringify([
      {
        firstName: 'Alan',
        lastName: 'Turing',
        email: 'alan@ex.com',
        date: toYMD(addDays(BASE_TODAY, 1)),
        time: '18:00',
        guests: 2,
        occasion: 'Anniversary'
      }
    ])
  );

  global.submitAPI = jest.fn().mockResolvedValue(true);

  render(<Booking />);

  await userEvent.type(screen.getByLabelText(/first name/i), 'Grace');
  await userEvent.type(screen.getByLabelText(/last name/i), 'Hopper');
  await userEvent.type(screen.getByLabelText(/email/i), 'grace@example.com');

  const dateStr = toYMD(addDays(BASE_TODAY, 12)); // within +14 days
  const dateInput = screen.getByLabelText(/^date$/i);
  await setDate(dateInput, dateStr);

  await pickTimeSafely('19:30');
  await userEvent.selectOptions(screen.getByLabelText(/^guests$/i), '4');
  await userEvent.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');

  await waitFor(() => expect(getSubmitButton()).not.toBeDisabled());

  const form = getSubmitButton().closest('form');
  await act(async () => {
    fireEvent.submit(form);
  });
  await act(async () => {
    jest.advanceTimersByTime(1600);
  });

  await waitFor(() => expect(global.submitAPI).toHaveBeenCalledTimes(1));

  // Overwrite behavior: only 1 booking, and it's the new one
  await waitFor(() => {
    const stored = JSON.parse(localStorage.getItem('bookings'));
    expect(stored).toHaveLength(1);
  });

  const stored = JSON.parse(localStorage.getItem('bookings'));
  expect(stored[0]).toMatchObject({
    firstName: 'Grace',
    lastName: 'Hopper',
    email: 'grace@example.com',
    date: dateStr,
    time: '19:30',
    guests: 4,
    occasion: 'Birthday'
  });

  expect(mockNavigate).toHaveBeenCalledWith('/confirmation', {
    state: expect.objectContaining({ firstName: 'Grace' })
  });
});
