import { Heading, Box, Text } from '@chakra-ui/react';

function Login() {
  return (
    <Box
      as="main"
      id="main-content"
      className="container--small"
      aria-labelledby="login-title"
    >
      <Heading id="login-title" as="h1" mb={4} textAlign="center" tabIndex={-1}>
        Login coming soon
      </Heading>

      <Text mb={2}>
        Our login feature is still in the works. Soon, you'll be able to create
        an account, manage your reservations, and save your favorite dishes —
        all in one place.
      </Text>

      <Text>
        Check back soon to enjoy a more personalized Little Lemon experience!
      </Text>
    </Box>
  );
}

export default Login;
