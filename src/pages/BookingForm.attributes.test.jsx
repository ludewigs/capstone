import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { waitFor } from '@testing-library/react';

function setup(ui) {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);
}

const fixedNow = new Date('2025-10-17T12:00:00Z');
const toYMD = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;

describe('BookingForm attribute tests', () => {
  const defaultValues = {
    date: '',
    time: '',
    guests: '',
    occasion: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  const availableTimes = ['17:00', '18:00', '19:00'];

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(fixedNow);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('Date input: id/type/min/max/aria-required present, aria-invalid false by default', () => {
    const dispatch = jest.fn();
    setup(
      <BookingForm
        defaultValues={defaultValues}
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={jest.fn()}
      />
    );

    const date = screen.getByLabelText(/date/i);
    expect(date).toHaveAttribute('id', 'date');
    expect(date).toHaveAttribute('type', 'date');

    const min = toYMD(new Date(fixedNow));
    const max = toYMD(
      new Date(new Date(fixedNow).setDate(fixedNow.getDate() + 14))
    );
    expect(date).toHaveAttribute('min', min);
    expect(date).toHaveAttribute('max', max);

    expect(date).toHaveAttribute('aria-required', 'true');
    expect(date).not.toHaveAttribute('aria-describedby');
    expect(date).toHaveAttribute('aria-invalid', 'false');
  });

  test('Time select: disabled until date chosen, then enabled and options rendered', async () => {
    const dispatch = jest.fn();
    setup(
      <BookingForm
        defaultValues={defaultValues}
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={jest.fn()}
      />
    );

    const time = screen.getByLabelText(/time/i);
    expect(time).toHaveAttribute('id', 'time');
    expect(time).toHaveAttribute('aria-required', 'true');
    expect(time).toBeDisabled();

    const date = screen.getByLabelText(/date/i);
    await userEvent.clear(date);
    await userEvent.type(date, toYMD(new Date(fixedNow)));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'date_changed',
      payload: new Date(toYMD(new Date(fixedNow)))
    });
    expect(time).toBeEnabled();

    const options = within(time)
      .getAllByRole('option')
      .map((o) => o.textContent);
    expect(options).toEqual(['Select time', ...availableTimes]);
  });

  test('Guests select: id/aria-required; placeholder and 1–10 options; numeric values present', () => {
    const dispatch = jest.fn();
    setup(
      <BookingForm
        defaultValues={defaultValues}
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={jest.fn()}
      />
    );

    const guests = screen.getByLabelText(/guests/i);
    expect(guests).toHaveAttribute('id', 'guests');
    expect(guests).toHaveAttribute('aria-required', 'true');

    const values = Array.from(guests.querySelectorAll('option'))
      .slice(1)
      .map((o) => o.getAttribute('value'));
    expect(values).toEqual(Array.from({ length: 10 }, (_, i) => String(i + 1)));

    expect(values).toEqual(Array.from({ length: 10 }, (_, i) => String(i + 1)));
  });

  test('Occasion select: id/aria-required; placeholder + OCCASIONS', () => {
    const dispatch = jest.fn();
    setup(
      <BookingForm
        defaultValues={defaultValues}
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={jest.fn()}
      />
    );

    const occasion = screen.getByLabelText(/occasion/i);
    expect(occasion).toHaveAttribute('id', 'occasion');
    expect(occasion).toHaveAttribute('aria-required', 'true');

    const optionTexts = within(occasion)
      .getAllByRole('option')
      .map((o) => o.textContent);
    expect(optionTexts).toEqual([
      'Select occasion',
      'Birthday',
      'Engagement',
      'Anniversary',
      'Other'
    ]);
  });

  test('First name input: id + aria-required', () => {
    const dispatch = jest.fn();
    setup(
      <BookingForm
        defaultValues={defaultValues}
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={jest.fn()}
      />
    );

    const first = screen.getByLabelText(/first name/i);
    expect(first).toHaveAttribute('id', 'firstName');
    expect(first).toHaveAttribute('aria-required', 'true');
  });

  test('Last name input: id + aria-required', () => {
    const dispatch = jest.fn();
    setup(
      <BookingForm
        defaultValues={defaultValues}
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={jest.fn()}
      />
    );

    const last = screen.getByLabelText(/last name/i);
    expect(last).toHaveAttribute('id', 'lastName');
    expect(last).toHaveAttribute('aria-required', 'true');
  });

  test('Email input: type email + placeholder + aria-required', () => {
    const dispatch = jest.fn();
    setup(
      <BookingForm
        defaultValues={defaultValues}
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={jest.fn()}
      />
    );

    const email = screen.getByLabelText(/email/i);
    expect(email).toHaveAttribute('id', 'email');
    expect(email).toHaveAttribute('type', 'email');
    expect(email).toHaveAttribute('placeholder', 'example@domain.com');
    expect(email).toHaveAttribute('aria-required', 'true');
  });

  test('Error wiring: empty submit sets aria-invalid + aria-describedby to the error id (email example)', async () => {
    const dispatch = jest.fn();
    const onSubmit = jest.fn();

    setup(
      <BookingForm
        defaultValues={defaultValues}
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    );

    await userEvent.click(
      screen.getByRole('button', { name: /reserve a table/i })
    );

    const email = screen.getByLabelText(/email/i);

    // 1) wait for validation to mark the field invalid
    await waitFor(() => {
      expect(email).toHaveAttribute('aria-invalid', 'true');
    });

    // 2) grab the linked error id
    const describedBy = email.getAttribute('aria-describedby');
    expect(describedBy).toBe('email-error');

    // 3) ensure the element exists and is an alert
    const errorEl = document.getElementById(describedBy);
    expect(errorEl).not.toBeNull();
    expect(errorEl).toHaveAttribute('role', 'alert');
  });
});
