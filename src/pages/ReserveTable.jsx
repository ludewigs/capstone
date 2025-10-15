import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, VStack, Input, Select, Button, Text } from '@chakra-ui/react';

const schema = yup.object({
  date: yup.string().required('Please choose a date'),
  time: yup.string().required('Please choose a time'),
  guests: yup.number().typeError('Select guests').min(1).max(10).required(),
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

const times = [
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
];
const guests = Array.from({ length: 10 }, (_, i) => i + 1);

function ReserveTable({ onSubmitSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 500));
    alert('Reservation requested!');
    onSubmitSuccess?.(data);
    reset();
  };

  return (
    <>
      <Box className="container--small">
        <Box as="h1" mb={4}>
          Reserve a Table
        </Box>

        <Box
          as="form"
          className="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          maxW="600px"
        >
          <VStack align="stretch" spacing="4">
            {/* Date */}
            <Box>
              <Text mb="1" fontWeight="500">
                Date
              </Text>
              <Input
                type="date"
                className={`form-control ${errors.date ? 'error' : ''}`}
                {...register('date')}
              />
              {errors.date && (
                <Text color="red.500" fontSize="sm" mt="-2">
                  {errors.date.message}
                </Text>
              )}
            </Box>

            {/* Time */}
            <Box>
              <Text mb="1" fontWeight="500">
                Time
              </Text>
              <select
                className={`form-select ${errors.time ? 'error' : ''}`}
                {...register('time')}
              >
                <option value="">Select time</option>
                {times.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.time && (
                <Text color="red.500" fontSize="sm" mt="-2">
                  {errors.time.message}
                </Text>
              )}
            </Box>

            {/* Guests */}
            <Box>
              <Text mb="1" fontWeight="500">
                Guests
              </Text>
              <select
                className={`form-select ${errors.guests ? 'error' : ''}`}
                {...register('guests')}
              >
                <option value="">Guests</option>
                {guests.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.guests && (
                <Text color="red.500" fontSize="sm" mt="-2">
                  {errors.guests.message}
                </Text>
              )}
            </Box>

            {/* First name */}
            <Box>
              <Text mb="1" fontWeight="500">
                First name
              </Text>
              <Input
                className={`form-control ${errors.firstName ? 'error' : ''}`}
                {...register('firstName')}
              />
              {errors.firstName && (
                <Text color="red.500" fontSize="sm" mt="-2">
                  {errors.firstName.message}
                </Text>
              )}
            </Box>

            {/* Last name */}
            <Box>
              <Text mb="1" fontWeight="500">
                Last name
              </Text>
              <Input
                className={`form-control ${errors.lastName ? 'error' : ''}`}
                {...register('lastName')}
              />
              {errors.lastName && (
                <Text color="red.500" fontSize="sm" mt="-2">
                  {errors.lastName.message}
                </Text>
              )}
            </Box>

            {/* Email */}
            <Box>
              <Text mb="1" fontWeight="500">
                Email
              </Text>
              <Input
                type="email"
                placeholder="example@domain.com"
                className={`form-control ${errors.email ? 'error' : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm" mt="-2">
                  {errors.email.message}
                </Text>
              )}
            </Box>

            {/* Submit */}
            <Button
              type="submit"
              variant="solid"
              colorPalette="yellow"
              color="#333"
              rounded="full"
              size="lg"
              loading={isSubmitting}
              alignSelf="center"
            >
              Reserve a table
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
}

export default ReserveTable;
