import { Heading, Box, Text } from '@chakra-ui/react';

function AboutUs() {
  return (
    <Box
      as="main"
      id="main-content"
      className="container--small"
      aria-labelledby="about-title"
    >
      <Heading id="about-title" as="h1" mb={4} textAlign="center" tabIndex={-1}>
        About Us
      </Heading>

      <Text mb={4}>
        Welcome to <strong>Little Lemon</strong>, a family-style Mediterranean
        restaurant founded by{' '}
        <strong>childhood friends Adrian and Mario</strong> in the heart of{' '}
        <strong>Chicago</strong>. Growing up surrounded by rich culinary
        traditions, they shared a dream of bringing the warmth, flavor, and
        simplicity of Mediterranean cuisine to their community.
      </Text>

      <Text mb={4}>
        At Little Lemon, every dish tells a story — blending the time-honored
        recipes they grew up with and the vibrant energy of Chicago's dining
        scene. We take pride in using{' '}
        <strong>fresh, locally sourced ingredients</strong>, complemented by
        imported herbs, olive oils, and cheeses that reflect the spirit of the
        Mediterranean coast.
      </Text>

      <Text mb={4}>
        Whether it's a cozy dinner for two, a weekend celebration, or a casual
        lunch break, our goal is to make every guest feel like part of our
        extended family.
      </Text>

      <Text>
        Come savor the taste of the Mediterranean — right here in Chicago.
      </Text>
    </Box>
  );
}

export default AboutUs;
