import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import heroImg from 'assets/heroImg.jpg';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <Box className="bg-wrapper" mb={'28'}>
      <Box className="container--small">
        <Flex gap={6} direction={['column-reverse', 'column-reverse', 'row']}>
          <Box width={['100%', '100%', '50%']}>
            <Heading as="h1" color="yellow.500">
              Little Lemon
            </Heading>
            <Heading as="h2" color="white" mt={'-15px'}>
              Chicago
            </Heading>
            <Text color="white">
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
            <Button
              colorPalette={'yellow'}
              color={'black'}
              fontWeight={'bold'}
              borderRadius={'md'}
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
              alt="Delicious food on a plate"
              borderRadius="16px"
              maxW={['100%', '100%', '300px']}
              h="auto"
              position={['static', 'static', 'absolute']}
              right={'-20px'}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Hero;
