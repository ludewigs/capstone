import { Heading, Box, Text } from '@chakra-ui/react';

function Order() {
  return (
    <Box className="container--small">
      <Heading as="h1" mb={4} textAlign="center">
        Online ordering — almost ready!
      </Heading>
      <Text>
        We're putting the final touches on our online ordering system. Very
        soon, you'll beable to browse our full menu and place your order
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
