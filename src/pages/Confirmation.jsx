import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  if (!state) {
    return (
      <Box
        as="main"
        className="container--small"
        textAlign="center"
        aria-labelledby="confirm-title"
      >
        <Heading
          id="confirm-title"
          as="h1"
          mb={4}
          textAlign="center"
          tabIndex={-1}
          ref={titleRef}
        >
          No reservation data
        </Heading>

        <Text role="alert" aria-live="assertive" mb={6}>
          Please complete a booking before visiting this page.
        </Text>

        <Button
          colorPalette="yellow"
          borderRadius="md"
          fontWeight="bold"
          onClick={() => navigate('/reserve')}
        >
          Go to Reservations
        </Button>
      </Box>
    );
  }

  const { firstName, lastName, date, time, guests, occasion, email } = state;

  return (
    <Box
      as="main"
      className="container--small"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-intro"
    >
      <Heading
        id="confirm-title"
        as="h1"
        mb={4}
        textAlign="center"
        tabIndex={-1}
        ref={titleRef}
      >
        Reservation Confirmed 🎉
      </Heading>

      {/* Live region so SRs announce success text */}
      <Box role="status" aria-live="polite" mb={4}>
        <Text id="confirm-intro">
          Thank you,{' '}
          <strong>
            {firstName} {lastName}
          </strong>
          !
        </Text>
        <Text>
          We've received your table booking request and will be expecting you at
          Little Lemon.
        </Text>
        <Text>
          A confirmation email has been sent to <strong>{email}</strong>.
        </Text>
      </Box>

      <Heading as="h2" fontSize="xl" mb={2}>
        Reservation details
      </Heading>

      {/* Use a definition list for key/value pairs */}
      <Box as="dl" mb={6}>
        <Text as="dt" fontWeight="bold">
          Date
        </Text>
        <Text as="dd" mb={2}>
          {date}
        </Text>

        <Text as="dt" fontWeight="bold">
          Time
        </Text>
        <Text as="dd" mb={2}>
          {time}
        </Text>

        <Text as="dt" fontWeight="bold">
          Guests
        </Text>
        <Text as="dd" mb={2}>
          {guests}
        </Text>

        <Text as="dt" fontWeight="bold">
          Occasion
        </Text>
        <Text as="dd" mb={2}>
          {occasion || '—'}
        </Text>
      </Box>

      <Text mb={6}>
        If you need to make any changes or cancel your reservation, simply reply
        to your confirmation email or contact us directly.
      </Text>

      <Text mb={6}>
        We look forward to welcoming you and making your visit a memorable one!
        🍋
      </Text>

      <Button
        colorPalette="yellow"
        borderRadius="md"
        fontWeight="bold"
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </Box>
  );
}

export default Confirmation;
