import { Box } from '@chakra-ui/react';

function Order() {
  return (
    <Box className="container--small">
      <Box as="h1" mb={4}>
        Online ordering — almost ready!
      </Box>
      <p>
        We're putting the final touches on our online ordering system. Very
        soon, you'll beable to browse our full menu and place your order
        directly from the comfort of your home.
      </p>
      <p>
        Stay tuned — a fresh, convenient way to enjoy Little Lemon is just
        around the corner!
      </p>
    </Box>
  );
}

export default Order;
