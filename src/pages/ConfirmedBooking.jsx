import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Table,
  VisuallyHidden,
  Dialog,
  Portal,
  CloseButton
} from '@chakra-ui/react';

function ConfirmedBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  if (!state) {
    return (
      <Box
        as="main"
        id="main-content"
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
          className="btn-lemon"
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

  const handleConfirmCancel = () => {
    try {
      localStorage.setItem('bookings', '[]');
    } catch {}
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
      setOpen(false);
      navigate('/reserve', { replace: true, state: { canceled: true } });
    }, 2000);
  };

  return (
    <Box
      as="main"
      id="main-content"
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
        <Table.Caption>
          <VisuallyHidden>Reservation details summary</VisuallyHidden>
        </Table.Caption>

        <Table.Body>
          {bookingData.map((row) => (
            <Table.Row key={row.label}>
              <Table.Cell as="th" scope="row" fontWeight="bold">
                {row.label}
              </Table.Cell>
              <Table.Cell>{row.value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Box mt={6} display="flex" gap="3" flexWrap="wrap" aria-label="Actions">
        <Button
          className="btn-lemon"
          colorPalette="yellow"
          borderRadius="md"
          fontWeight="bold"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>

        <Button
          variant="subtle"
          colorPalette="red"
          borderRadius="md"
          fontWeight={'bold'}
          onClick={() => setOpen(true)}
        >
          Cancel reservation
        </Button>
      </Box>

      <Dialog.Root
        role="alertdialog"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Cancel this reservation?</Dialog.Title>
              </Dialog.Header>

              <Box px="6" pb="4">
                <Text fontSize="lg" mb={2}>
                  Name: <strong>{`${firstName} ${lastName}`}</strong>
                </Text>
                <Text fontSize="lg" mb={2}>
                  Email: <strong>{email}</strong>
                </Text>
                <Text fontSize="lg" mb={2}>
                  Date: <strong>{date}</strong> at <strong>{time}</strong>
                </Text>
                <Text fontSize="lg" mb={2}>
                  Guests: <strong>{guests}</strong>
                </Text>
              </Box>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="outline"
                    borderRadius={'md'}
                    fontWeight={'bold'}
                  >
                    Keep reservation
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette="red"
                  borderRadius={'md'}
                  fontWeight={'bold'}
                  onClick={handleConfirmCancel}
                >
                  Cancel reservation
                </Button>
              </Dialog.Footer>
              {showMsg && (
                <Box
                  textAlign="center"
                  py="2"
                  mb="2"
                  color="green.600"
                  fontWeight="semibold"
                  aria-live="polite"
                >
                  Reservation canceled successfully!
                </Box>
              )}

              <Dialog.CloseTrigger asChild>
                <CloseButton position="absolute" top="2" insetEnd="2" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}

export default ConfirmedBooking;
