import { Box } from '@chakra-ui/react';

function About() {
  return (
    <Box className="container--small">
      <Box as="h1" mb={4}>
        About Us
      </Box>
      <p>
        Welcome to <strong>Little Lemon</strong>, a family-style Mediterranean
        restaurant founded by{' '}
        <strong>childhood friends Adrian and Mario</strong> in the heart of{' '}
        <strong>Chicago</strong>. Growing up surrounded by rich culinary
        traditions, they shared a dream of bringing the warmth, flavor, and
        simplicity of Mediterranean cuisine to their community.
      </p>

      <p>
        At Little Lemon, every dish tells a story — blending the time-honored
        recipes they grew up with and the vibrant energy of Chicago's dining
        scene. We take pride in using{' '}
        <strong>fresh, locally-sourced ingredients</strong>, complemented by
        imported herbs, olive oils, and cheeses that reflect the spirit of the
        Mediterranean coast.
      </p>

      <p>
        Whether it's a cozy dinner for two, a weekend celebration, or a casual
        lunch break, our goal is to make every guest feel like part of our
        extended family.
      </p>

      <p>Come savor the taste of the Mediterranean — right here in Chicago.</p>
    </Box>
  );
}

export default About;
