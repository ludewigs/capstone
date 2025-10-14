import { Box, Flex } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import heroImg from 'assets/heroImg.jpg';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Box className="bg-wrapper">
        <Box className="container--small">
          <Flex gap={6} direction={['column-reverse', 'column-reverse', 'row']}>
            <Box width={['100%', '100%', '50%']}>
              <h1 className="yellow">Little Lemon</h1>
              <h2 className="white" style={{ marginTop: '-15px' }}>
                Chicago
              </h2>
              <p className="text white">
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </p>
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
                right={0}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default Home;
