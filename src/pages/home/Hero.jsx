import { Box, Flex, Heading, Text, Image, Button } from '@chakra-ui/react';
import heroImg from 'assets/heroImg.jpg';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <Box
      as="section"
      className="bg-wrapper"
      mb="28"
      aria-labelledby="hero-title"
    >
      <Box className="container--small">
        <Flex gap={6} direction={['column-reverse', 'column-reverse', 'row']}>
          <Box width={['100%', '100%', '50%']}>
            <Heading id="hero-title" as="h1" color="yellow.500">
              Little Lemon
            </Heading>
            <Heading as="h2" color="white" mt="-15px">
              Chicago
            </Heading>
            <Text color="white" mb={4}>
              We are a family-owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
            <Button
              className="btn-lemon"
              colorPalette="yellow"
              fontWeight="bold"
              borderRadius="md"
              onClick={() => navigate('/reserve')}
            >
              Reserve a Table
            </Button>
          </Box>

          <Box
            width={['100%', '100%', '50%']}
            position={['static', 'static', 'relative']}
          >
            <Image
              src={heroImg}
              alt="Delicious Mediterranean dish plated for service"
              borderRadius="16px"
              maxW={['100%', '100%', '300px']}
              h="auto"
              position={['static', 'static', 'absolute']}
              right="-20px"
              loading="eager"
              fetchPriority="high"
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Hero;
