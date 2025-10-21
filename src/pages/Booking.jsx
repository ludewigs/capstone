import { useReducer, useCallback, useMemo } from 'react';
import { Box, Heading, VisuallyHidden } from '@chakra-ui/react';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';

function fetchData(date) {
  const d = date instanceof Date ? date : new Date(date);

  if (typeof fetchAPI === 'function') {
    return fetchAPI(d);
  }
  // Fallback if the script didn't load
  return [
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
}

export function updateTimes(state, action) {
  switch (action.type) {
    case 'date_changed': {
      // action.payload is a Date or a YYYY-MM-DD string
      return fetchData(action.payload);
    }
    default:
      return state;
  }
}

export function initializeTimes() {
  return fetchData(new Date());
}

// --- helpers for safe localStorage JSON ---
function safeGetJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function safeSetJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota/serialization errors
  }
}

function Booking() {
  const navigate = useNavigate();

  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  // Prefill user-identifying fields from localStorage (but keep booking fields empty)
  const storedUser = safeGetJSON('littleLemonUser') || {};

  const defaultValues = {
    date: '',
    time: '',
    guests: 0,
    occasion: '',
    firstName: storedUser.firstName || '',
    lastName: storedUser.lastName || '',
    email: storedUser.email || ''
  };

  // inside Booking component…

  const handleSubmit = useCallback(
    async (data) => {
      try {
        await new Promise((r) => setTimeout(r, 1500));

        const ok =
          typeof submitAPI === 'function' ? await submitAPI(data) : false;

        if (ok) {
          // keep only the latest booking
          safeSetJSON('bookings', [data]);

          // persist user info for prefill
          const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          };
          safeSetJSON('littleLemonUser', userData);

          navigate('/confirmation', { state: data });
          return;
        } else {
          throw new Error('submitAPI unavailable or returned false');
        }
      } catch (err) {
        console.error('Submission failed:', err);
        alert('Submission failed. Please try again.');
      }
    },
    [navigate]
  );

  // For the live region message (announces slot count to screen readers)
  const slotsMessage = useMemo(() => {
    const count = Array.isArray(availableTimes) ? availableTimes.length : 0;
    return `${count} time slot${count === 1 ? '' : 's'} currently available.`;
  }, [availableTimes]);

  return (
    <Box
      as="main"
      id="main-content"
      tabIndex={-1}
      className="container--small"
      aria-labelledby="reserve-title"
    >
      <Heading id="reserve-title" as="h1" mb={4} textAlign="center">
        Reserve a Table
      </Heading>

      <VisuallyHidden aria-live="polite" aria-atomic="true">
        {slotsMessage}
      </VisuallyHidden>

      <Box as="section" aria-labelledby="reserve-title">
        <BookingForm
          defaultValues={defaultValues}
          availableTimes={availableTimes}
          dispatch={dispatch}
          onSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
}

export default Booking;
