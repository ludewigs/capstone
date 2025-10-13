import { Box } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <Box maxW="1440px" mx="auto" px={{ base: 4, md: 6, xl: '70px' }}>
      <Box maxW="1300px" mx="auto">
        {children}
      </Box>
    </Box>
  );
}
