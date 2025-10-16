import { useReducer, useCallback } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';

const BASE_TIMES = [
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

function updateTimes(state, action) {
  switch (action.type) {
    case 'date_changed': {
      return BASE_TIMES;
    }
    default:
      return state;
  }
}

function initializeTimes() {
  return BASE_TIMES;
}

function Booking() {
  const navigate = useNavigate();
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  const handleSubmit = useCallback(
    async (data) => {
      await new Promise((r) => setTimeout(r, 500));
      navigate('/confirmation', { state: data });
    },
    [navigate]
  );

  const defaultValues = {
    date: '',
    time: '',
    guests: 0,
    occasion: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  return (
    <Box className="container--small">
      <Heading as="h1" mb={4} textAlign="center">
        Reserve a Table
      </Heading>

      <BookingForm
        defaultValues={defaultValues}
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}

export default Booking;
