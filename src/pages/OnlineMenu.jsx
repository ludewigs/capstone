import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  HStack,
  Card,
  VisuallyHidden
} from '@chakra-ui/react';
import { MOCK_SPECIALS } from './home/Specials';

export default function MenuPage() {
  const menuItems = MOCK_SPECIALS;

  const fmt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <Box
      as="main"
      id="main-content"
      className="container--small"
      aria-labelledby="menu-title"
    >
      <Heading as="h1" id="menu-title" mb={4} textAlign="center">
        Our Menu
      </Heading>

      <Text color="fg.muted" maxW="600px" mb={10} mx="auto" textAlign="center">
        Explore our Mediterranean-inspired dishes — freshly made and bursting
        with flavor. Each recipe reflects our love for simple, honest food.
      </Text>

      <Box as="section" aria-labelledby="menu-section-heading">
        <VisuallyHidden as="h2" id="menu-section-heading">
          Menu items
        </VisuallyHidden>

        <SimpleGrid
          as="ul"
          role="list"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 6, md: 8 }}
          maxW="1000px"
          mx="auto"
        >
          {menuItems.map((item) => (
            <Card.Root
              as="li"
              role="listitem"
              key={item.id}
              overflow="hidden"
              borderBottomRadius={0}
              border="none"
              shadow="md"
              bg="gray"
              transition="transform 0.2s ease"
              _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            >
              {/* If your data has item.imageAlt, prefer that; otherwise, fall back */}
              <Image
                src={item.image}
                alt={item.imageAlt ?? `${item.name} — menu photo`}
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
                    aria-label={`Price ${fmt.format(item.price)}`}
                  >
                    {fmt.format(item.price)}
                  </Text>
                </HStack>

                <Text color="fg.muted">{item.description}</Text>
              </Box>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
