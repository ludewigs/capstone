import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  Image,
  HStack,
  Button,
  Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BikeIcon from 'assets/bike.svg';

export const MOCK_SPECIALS = [
  {
    id: 'greek-salad',
    name: 'Greek Salad',
    price: 12.99,
    description:
      'Crisp lettuce, peppers, olives, and Chicago-style feta, finished with garlic and rosemary croutons.',
    image: '/images/greek_salad.jpg'
  },
  {
    id: 'bruschetta',
    name: 'Bruschetta',
    price: 5.99,
    description:
      'Grilled bread rubbed with garlic and topped with tomatoes, basil, and extra-virgin olive oil.',
    image: '/images/bruschetta.jpg'
  },
  {
    id: 'lemon-dessert',
    name: 'Lemon Dessert',
    price: 5.0,
    description:
      "A bright, layered lemon cake inspired by grandma's recipe—balanced, zesty, and silky.",
    image: '/images/lemon_dessert.jpg'
  }
];

function Specials() {
  const navigate = useNavigate();

  const specials = MOCK_SPECIALS;

  return (
    <Box className="container--small">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h2" fontSize={'64px'}>
          This week's specials!
        </Heading>
        <Box>
          <Button
            colorPalette={'yellow'}
            color={'black'}
            fontWeight={'bold'}
            padding={6}
            borderRadius={'md'}
            onClick={() => navigate('/menu')}
          >
            Online Menu
          </Button>
        </Box>
      </Flex>

      <Box as="section" py={8}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 8 }}>
          {specials.map((item) => (
            <Card.Root
              key={item.id}
              overflow="hidden"
              borderBottomRadius={0}
              border={'none'}
              boxShadow="md"
              bg="gray"
            >
              <Image
                src={item.image}
                alt={item.name}
                h="180px"
                w="100%"
                objectFit="cover"
                loading="lazy"
              />

              <Card.Body>
                <HStack justify="space-between" mb={2}>
                  <Text as="span" fontWeight="bold" fontSize="lg">
                    {item.name}
                  </Text>
                  <Text
                    as="span"
                    fontWeight="bold"
                    fontSize="lg"
                    color="yellow.500"
                  >
                    ${item.price.toFixed(2)}
                  </Text>
                </HStack>
                <Text color="fg.muted">{item.description}</Text>
              </Card.Body>

              <Card.Footer pt={0}>
                <Box
                  fontWeight={'bold'}
                  onClick={() => navigate('/order')}
                  cursor={'pointer'}
                >
                  Order for delivery{' '}
                  <Image display={'inline-block'} src={BikeIcon} />
                </Box>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Specials;
