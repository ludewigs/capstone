import { Box, Grid, Heading, Text, Image, Stack } from '@chakra-ui/react';
import Primary from 'assets/mario_adrian_a.jpg';
import Secondary from 'assets/mario_adrian_b.jpg';

function About() {
  return (
    <Box className="container--small">
      <Box as="section">
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          alignItems="center"
          gap={{ base: 8, md: 12 }}
        >
          {/* Text */}
          <Stack spacing={3}>
            <Heading as="h2" size="2xl" letterSpacing="tight">
              Little Lemon
            </Heading>
            <Heading as="h3" size="lg" mt={-4}>
              Chicago
            </Heading>
            <Text color="fg.muted" fontSize="md" maxW="56ch">
              We’re a family-style Mediterranean restaurant serving simple,
              honest food made from fresh, locally-sourced ingredients. Our menu
              blends time-honored recipes with a modern, Chicago twist.
            </Text>
          </Stack>

          <Box
            position="relative"
            h={{ base: '360px', md: '320px' }}
            display={{ base: 'none', md: 'block' }}
          >
            <Image
              src={Primary}
              alt="Kitchen scene"
              position="absolute"
              left={{ base: '0', md: '6%' }}
              bottom={{ base: '20', md: '30px' }}
              w={{ base: '100%', md: '60%' }}
              h="auto"
              objectFit="cover"
              borderRadius="xl"
              shadow="md"
            />

            <Image
              src={Secondary}
              alt="Chef plating"
              position="absolute"
              right={{ base: '0', md: '6%' }}
              top={{ base: '50%', md: '30px' }}
              w={{ base: '45%', md: '60%' }}
              h="auto"
              objectFit="cover"
              borderRadius="xl"
              shadow="lg"
            />
          </Box>

          <Box display={{ base: 'block', md: 'none' }}>
            <Image
              src={Primary}
              alt="Kitchen scene"
              h="auto"
              borderRadius="xl"
              shadow="md"
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default About;
