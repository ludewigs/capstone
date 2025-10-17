import { bookingSchema } from './BookingForm';

const validBase = () => ({
  date: '2025-10-20',
  time: '17:00',
  guests: 2,
  occasion: 'Birthday',
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com'
});

describe('bookingSchema validation (JS)', () => {
  test('accepts a fully valid payload', async () => {
    const payload = validBase();
    await expect(bookingSchema.validate(payload)).resolves.toEqual(
      expect.objectContaining(payload)
    );
  });

  test('trims firstName/lastName before validating', async () => {
    const payload = {
      ...validBase(),
      firstName: '  Ada  ',
      lastName: '  Lovelace  '
    };
    const result = await bookingSchema.validate(payload);
    expect(result.firstName).toBe('Ada');
    expect(result.lastName).toBe('Lovelace');
  });

  test('date is required', async () => {
    const payload = { ...validBase(), date: '' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'date',
      message: 'Please choose a date'
    });
  });

  test('time is required', async () => {
    const payload = { ...validBase(), time: '' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'time',
      message: 'Please choose a time'
    });
  });

  test('guests is required / typeError when not a number', async () => {
    // Use a non-numeric string to trigger number().typeError(...)
    const payload = { ...validBase(), guests: 'abc' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'guests',
      message: 'Please select the number of guests'
    });
  });

  test('guests must be >= 1', async () => {
    const payload = { ...validBase(), guests: 0 };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'guests',
      message: 'At least 1 guest required'
    });
  });

  test('guests must be <= 10', async () => {
    const payload = { ...validBase(), guests: 11 };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'guests',
      message: 'Maximum of 10 guests allowed'
    });
  });

  test('occasion is required', async () => {
    const payload = { ...validBase(), occasion: '' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'occasion',
      message: 'Please choose an occasion'
    });
  });

  test('firstName is required', async () => {
    const payload = { ...validBase(), firstName: '' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'firstName',
      message: 'First name is required'
    });
  });

  test('firstName has min length 2', async () => {
    const payload = { ...validBase(), firstName: 'A' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'firstName',
      message: 'Too short'
    });
  });

  test('lastName is required', async () => {
    const payload = { ...validBase(), lastName: '' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'lastName',
      message: 'Last name is required'
    });
  });

  test('lastName has min length 2', async () => {
    const payload = { ...validBase(), lastName: 'B' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'lastName',
      message: 'Too short'
    });
  });

  test('email must be valid format', async () => {
    const payload = { ...validBase(), email: 'not-an-email' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'email',
      message: 'Invalid email'
    });
  });

  test('email is required', async () => {
    const payload = { ...validBase(), email: '' };
    await expect(bookingSchema.validate(payload)).rejects.toMatchObject({
      path: 'email',
      message: 'Email is required'
    });
  });

  test('multiple invalid fields are all reported when abortEarly=false', async () => {
    const payload = {
      date: '',
      time: '',
      guests: 0,
      occasion: '',
      firstName: 'A',
      lastName: '', // may trigger both "required" and "min" when abortEarly=false
      email: 'nope'
    };

    try {
      await bookingSchema.validate(payload, { abortEarly: false });
      throw new Error('Expected validation to fail');
    } catch (err) {
      // Collect ALL messages per path
      const messagesByPath = (err.inner || []).reduce((acc, e) => {
        const key = e.path || '_form';
        if (!acc[key]) acc[key] = [];
        acc[key].push(e.message);
        return acc;
      }, {});

      expect(messagesByPath.date).toContain('Please choose a date');
      expect(messagesByPath.time).toContain('Please choose a time');
      expect(messagesByPath.guests).toContain('At least 1 guest required');
      expect(messagesByPath.occasion).toContain('Please choose an occasion');
      expect(messagesByPath.firstName).toContain('Too short');

      // lastName can include one or both messages depending on Yup evaluation order
      expect(messagesByPath.lastName).toEqual(
        expect.arrayContaining(['Last name is required'])
      );

      expect(messagesByPath.email).toContain('Invalid email');
    }
  });
});
