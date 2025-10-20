import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  VisuallyHidden
} from '@chakra-ui/react';

export const bookingSchema = yup.object({
  date: yup.string().required('Please choose a date'),
  time: yup.string().required('Please choose a time'),
  guests: yup
    .number()
    .typeError('Please select the number of guests')
    .min(1, 'At least 1 guest required')
    .max(10, 'Maximum of 10 guests allowed')
    .required('Please select the number of guests'),
  occasion: yup.string().required('Please choose an occasion'),
  firstName: yup
    .string()
    .trim()
    .required('First name is required')
    .min(2, 'Too short'),
  lastName: yup
    .string()
    .trim()
    .required('Last name is required')
    .min(2, 'Too short'),
  email: yup.string().email('Invalid email').required('Email is required')
});

const GUESTS = Array.from({ length: 10 }, (_, i) => i + 1);
const OCCASIONS = ['Birthday', 'Engagement', 'Anniversary', 'Other'];

function BookingForm({ defaultValues, availableTimes, dispatch, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
    resetField,
    trigger
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    delayError: 150
  });

  const date = watch('date');
  const isTimeDisabled = !date;

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14);

  useEffect(() => {
    if (date) {
      dispatch({ type: 'date_changed', payload: new Date(date) });
      resetField('time');
      trigger(['date', 'time']);
    }
  }, [date, dispatch, resetField, trigger]);

  function toLocalYMD(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  const timeVal = watch('time');
  const guestsVal = watch('guests');
  const occasionVal = watch('occasion');

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset(defaultValues);
  };

  const firstErrorMsg = useMemo(() => {
    const keys = Object.keys(errors);
    if (keys.length === 0) return '';
    const key = keys[0];
    const msg = errors[key]?.message;
    return typeof msg === 'string' ? msg : '';
  }, [errors]);

  return (
    <Box
      as="form"
      className="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      maxW="600px"
      mx="auto"
      aria-describedby={firstErrorMsg ? 'form-error-summary' : undefined}
    >
      <VisuallyHidden
        id="form-error-summary"
        aria-live="polite"
        aria-atomic="true"
      >
        {firstErrorMsg}
      </VisuallyHidden>

      <VisuallyHidden aria-live="polite" aria-atomic="true">
        {isSubmitting ? 'Submitting your reservation…' : ''}
      </VisuallyHidden>

      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <VStack align="stretch" spacing="4">
          <Box as="fieldset">
            {/* Date */}
            <Box>
              <label htmlFor="date" className="label">
                <Text as="span" mb="1" fontWeight="500">
                  Date
                </Text>
              </label>
              <Input
                id="date"
                type="date"
                min={toLocalYMD(today)}
                max={toLocalYMD(maxDate)}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? 'date-error' : undefined}
                aria-required="true"
                required
                className={`form-control ${errors.date ? 'error' : ''}`}
                {...register('date')}
              />
              {typeof errors.date?.message === 'string' && (
                <Text
                  id="date-error"
                  role="alert"
                  aria-live="polite"
                  color="red.500"
                  fontSize="sm"
                  mt="-2"
                >
                  {errors.date.message}
                </Text>
              )}
            </Box>

            {/* Time */}
            <Box>
              <label htmlFor="time" className="label">
                <Text as="span" mb="1" fontWeight="500">
                  Time
                </Text>
              </label>
              <select
                id="time"
                className={`form-select ${errors.time ? 'error' : ''}`}
                aria-invalid={!!errors.time}
                aria-describedby={errors.time ? 'time-error' : undefined}
                aria-required="true"
                required
                disabled={isTimeDisabled}
                data-empty={timeVal === '' ? 'true' : 'false'}
                {...register('time')}
              >
                <option value="">
                  {isTimeDisabled ? 'Select a date first' : 'Select time'}
                </option>
                {!isTimeDisabled &&
                  availableTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
              </select>
              {typeof errors.time?.message === 'string' && (
                <Text
                  id="time-error"
                  role="alert"
                  aria-live="polite"
                  color="red.500"
                  fontSize="sm"
                  mt="-2"
                >
                  {errors.time.message}
                </Text>
              )}
            </Box>

            {/* Guests */}
            <Box>
              <label htmlFor="guests" className="label">
                <Text as="span" mb="1" fontWeight="500">
                  Guests
                </Text>
              </label>
              <select
                id="guests"
                className={`form-select ${errors.guests ? 'error' : ''}`}
                aria-invalid={!!errors.guests}
                aria-describedby={errors.guests ? 'guests-error' : undefined}
                aria-required="true"
                required
                data-empty={guestsVal === 0 ? 'true' : 'false'}
                {...register('guests', { valueAsNumber: true })}
              >
                <option value="0">Select number of guests</option>
                {GUESTS.map((g) => (
                  <option key={g} value={g}>
                    {g} guest{g === 1 ? '' : 's'}
                  </option>
                ))}
              </select>
              {typeof errors.guests?.message === 'string' && (
                <Text
                  id="guests-error"
                  role="alert"
                  aria-live="polite"
                  color="red.500"
                  fontSize="sm"
                  mt="-2"
                >
                  {errors.guests.message}
                </Text>
              )}
            </Box>

            {/* Occasion */}
            <Box>
              <label htmlFor="occasion" className="label">
                <Text as="span" mb="1" fontWeight="500">
                  Occasion
                </Text>
              </label>
              <select
                id="occasion"
                className={`form-select ${errors.occasion ? 'error' : ''}`}
                aria-invalid={!!errors.occasion}
                aria-describedby={
                  errors.occasion ? 'occasion-error' : undefined
                }
                aria-required="true"
                required
                data-empty={occasionVal === '' ? 'true' : 'false'}
                {...register('occasion')}
              >
                <option value="">Select occasion</option>
                {OCCASIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {typeof errors.occasion?.message === 'string' && (
                <Text
                  id="occasion-error"
                  role="alert"
                  aria-live="polite"
                  color="red.500"
                  fontSize="sm"
                  mt="-2"
                >
                  {errors.occasion.message}
                </Text>
              )}
            </Box>
          </Box>

          {/* Contact info */}
          <Box as="fieldset">
            {/* First name */}
            <Box>
              <label htmlFor="firstName" className="label">
                <Text as="span" mb="1" fontWeight="500">
                  First name
                </Text>
              </label>
              <Input
                id="firstName"
                autoComplete="given-name"
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? 'firstName-error' : undefined
                }
                aria-required="true"
                required
                className={`form-control ${errors.firstName ? 'error' : ''}`}
                {...register('firstName')}
              />
              {typeof errors.firstName?.message === 'string' && (
                <Text
                  id="firstName-error"
                  role="alert"
                  aria-live="polite"
                  color="red.500"
                  fontSize="sm"
                  mt="-2"
                >
                  {errors.firstName.message}
                </Text>
              )}
            </Box>

            {/* Last name */}
            <Box>
              <label htmlFor="lastName" className="label">
                <Text as="span" mb="1" fontWeight="500">
                  Last name
                </Text>
              </label>
              <Input
                id="lastName"
                autoComplete="family-name"
                aria-invalid={!!errors.lastName}
                aria-describedby={
                  errors.lastName ? 'lastName-error' : undefined
                }
                aria-required="true"
                required
                className={`form-control ${errors.lastName ? 'error' : ''}`}
                {...register('lastName')}
              />
              {typeof errors.lastName?.message === 'string' && (
                <Text
                  id="lastName-error"
                  role="alert"
                  aria-live="polite"
                  color="red.500"
                  fontSize="sm"
                  mt="-2"
                >
                  {errors.lastName.message}
                </Text>
              )}
            </Box>

            {/* Email */}
            <Box>
              <label htmlFor="email" className="label">
                <Text as="span" mb="1" fontWeight="500">
                  Email
                </Text>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@domain.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-required="true"
                required
                className={`form-control ${errors.email ? 'error' : ''}`}
                {...register('email')}
              />
              {typeof errors.email?.message === 'string' && (
                <Text
                  id="email-error"
                  role="alert"
                  aria-live="polite"
                  color="red.500"
                  fontSize="sm"
                  mt="-2"
                >
                  {errors.email.message}
                </Text>
              )}
            </Box>
          </Box>

          {/* Submit */}
          <Button
            type="submit"
            aria-label={'Reserve a table'}
            variant="solid"
            bg="yellow.400"
            _hover={{ bg: 'yellow.500' }}
            color="#333"
            borderRadius="md"
            fontWeight="bold"
            size="lg"
            alignSelf="center"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <span className="ll-spinner" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              'Reserve a table'
            )}
          </Button>
        </VStack>
      </fieldset>
    </Box>
  );
}

export default BookingForm;
