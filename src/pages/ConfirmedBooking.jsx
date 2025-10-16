import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, Table } from '@chakra-ui/react';

function ConfirmedBooking() {
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

  const bookingData = [
    { label: 'Date', value: date },
    { label: 'Time', value: time },
    { label: 'Guests', value: guests },
    { label: 'Occasion', value: occasion || '—' },
    { label: 'Name', value: `${firstName} ${lastName}` },
    { label: 'Email', value: email }
  ];

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

      <Heading as="h2" mb={2}>
        Reservation details
      </Heading>

      <Table.Root
        variant="outline"
        size="md"
        mt={4}
        mb={6}
        maxW="480px"
        borderRadius="md"
      >
        <Table.Body>
          {bookingData.map((row) => (
            <Table.Row key={row.label}>
              <Table.Cell fontWeight="bold">{row.label}</Table.Cell>
              <Table.Cell>{row.value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Text>
        If you need to make any changes or cancel your reservation, simply reply
        to your confirmation email or contact us directly.
      </Text>

      <Text>
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

export default ConfirmedBooking;
