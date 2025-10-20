import { Box, Grid, Heading, Text, Image, Stack } from '@chakra-ui/react';
import Primary from 'assets/mario_adrian_a.jpg';
import Secondary from 'assets/mario_adrian_b.jpg';

function About() {
  return (
    <Box
      as="section"
      className="container--small"
      aria-labelledby="about-section-title"
    >
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        alignItems="center"
        gap={{ base: 8, md: 12 }}
      >
        {/* Text block */}
        <Stack spacing={3}>
          <Heading
            id="about-section-title"
            as="h2"
            size="2xl"
            letterSpacing="tight"
          >
            Little Lemon
          </Heading>
          <Heading as="h3" size="lg" mt={-4}>
            Chicago
          </Heading>
          <Text color="fg.muted" fontSize="md" maxW="56ch">
            We’re a family-style Mediterranean restaurant serving simple, honest
            food made from fresh, locally sourced ingredients. Our menu blends
            time-honored recipes with a modern, Chicago twist.
          </Text>
        </Stack>

        {/* Desktop images */}
        <Box
          position="relative"
          h={{ base: '360px', md: '320px' }}
          display={{ base: 'none', md: 'block' }}
        >
          <Image
            src={Primary}
            alt="Two chefs working together in the Little Lemon kitchen"
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
            alt="Chef plating a Mediterranean dish"
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

        {/* Mobile fallback image */}
        <Box display={{ base: 'block', md: 'none' }}>
          <Image
            src={Primary}
            alt="Two chefs working together in the Little Lemon kitchen"
            h="auto"
            borderRadius="xl"
            shadow="md"
          />
        </Box>
      </Grid>
    </Box>
  );
}

export default About;
