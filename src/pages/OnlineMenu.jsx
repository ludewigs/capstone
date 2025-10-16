import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  HStack,
  Card
} from '@chakra-ui/react';
import { MOCK_SPECIALS } from './home/Specials';

export default function MenuPage() {
  const menuItems = MOCK_SPECIALS; // replace later with fetched data

  return (
    <Box className="container--small">
      <Heading as="h1" mb={4} textAlign="center">
        Our Menu
      </Heading>
      <Text
        color="fg.muted"
        maxW="600px"
        mb={10}
        mx={'auto'}
        textAlign="center"
      >
        Explore our Mediterranean-inspired dishes — freshly made and bursting
        with flavor. Each recipe reflects our love for simple, honest food.
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        gap={{ base: 6, md: 8 }}
        maxW="1000px"
        mx="auto"
      >
        {menuItems.map((item) => (
          <Card.Root
            key={item.id}
            overflow="hidden"
            borderBottomRadius={0}
            border={'none'}
            shadow="md"
            bg="gray"
            transition="transform 0.2s ease"
            _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
          >
            <Image
              src={item.image}
              alt={item.name}
              h="200px"
              w="100%"
              objectFit="cover"
              loading="lazy"
            />

            <Box p={5}>
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
            </Box>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
}
