import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  Image,
  HStack,
  Button
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
  const fmt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <Box className="container--small">
      <Box as="section" aria-labelledby="specials-title" py={2}>
        <HStack justify="space-between" align="center" mb={6}>
          <Heading id="specials-title" as="h2" fontSize="64px">
            This week’s specials!
          </Heading>
          <Button
            type="button"
            colorPalette="yellow"
            color="black"
            fontWeight="bold"
            px={6}
            borderRadius="md"
            onClick={() => navigate('/menu')}
          >
            Online Menu
          </Button>
        </HStack>

        <SimpleGrid
          as="ul"
          role="list"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 6, md: 8 }}
        >
          {specials.map((item) => (
            <Card.Root
              as="li"
              role="listitem"
              key={item.id}
              overflow="hidden"
              borderBottomRadius={0}
              border="none"
              boxShadow="md"
              bg="gray"
            >
              <Image
                src={item.image}
                alt={`${item.name} — menu photo`}
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
                    aria-label={`Price ${fmt.format(item.price)}`}
                  >
                    {fmt.format(item.price)}
                  </Text>
                </HStack>
                <Text color="fg.muted">{item.description}</Text>
              </Card.Body>

              <Card.Footer pt={0}>
                <Box
                  as="button"
                  fontWeight={'bold'}
                  onClick={() => navigate('/order')}
                  aria-label={`Order ${item.name} for delivery`}
                  cursor={'pointer'}
                >
                  Order for delivery{' '}
                  <Image
                    src={BikeIcon}
                    alt=""
                    aria-hidden="true"
                    display="inline-block"
                  />
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
