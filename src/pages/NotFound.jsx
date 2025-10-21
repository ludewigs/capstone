import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      as="main"
      id="main-content"
      className="container--small"
      textAlign="center"
      aria-labelledby="notfound-title"
    >
      <Heading id="notfound-title" as="h1" mb={4}>
        Lost in the Lemon Grove
      </Heading>

      <Text mb={4}>
        Looks like this page doesn't exist — or maybe it rolled away somewhere
        behind the kitchen counter.
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

export default NotFound;
