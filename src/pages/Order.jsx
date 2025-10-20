import { Heading, Box, Text } from '@chakra-ui/react';

function Order() {
  return (
    <Box
      as="main"
      id="main-content"
      className="container--small"
      aria-labelledby="order-title"
    >
      <Heading id="order-title" as="h1" mb={4} textAlign="center" tabIndex={-1}>
        Online ordering — almost ready!
      </Heading>

      <Text>
        We're putting the final touches on our online ordering system. Very
        soon, you'll be able to browse our full menu and place your order
        directly from the comfort of your home.
      </Text>

      <Text>
        Stay tuned — a fresh, convenient way to enjoy Little Lemon is just
        around the corner!
      </Text>
    </Box>
  );
}

export default Order;
