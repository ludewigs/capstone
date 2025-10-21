import {
  Box,
  Heading,
  SimpleGrid,
  HStack,
  VStack,
  Text,
  Avatar,
  Card,
  Icon
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const avatarFor = (seed) =>
  `https://i.pravatar.cc/128?u=${encodeURIComponent(seed)}`;

const MOCK_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Sophia R.',
    rating: 5,
    text: 'Best Greek salad in town. Super fresh and flavorful!',
    avatar: avatarFor('Sophia R.')
  },
  {
    id: 't2',
    name: 'Marcus L.',
    rating: 4,
    text: 'Bruschetta was perfect. Friendly staff and cozy vibe.',
    avatar: avatarFor('Marcus L.')
  },
  {
    id: 't3',
    name: 'Priya K.',
    rating: 5,
    text: 'Lemon dessert is a must—bright, silky, not too sweet.',
    avatar: avatarFor('Priya K.')
  },
  {
    id: 't4',
    name: 'Daniel H.',
    rating: 4,
    text: 'Great portions and quick service. Will be back!',
    avatar: avatarFor('Daniel H.')
  }
];

function Stars({ value }) {
  return (
    <HStack spacing="1" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          as={FaStar}
          key={i}
          boxSize="1.1em"
          color={i < value ? 'yellow.400' : 'gray.300'}
          aria-hidden="true"
          focusable="false"
        />
      ))}
    </HStack>
  );
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
}

export default function Testimonials() {
  return (
    <Box
      as="section"
      bg="#d9d9d9"
      py={12}
      my={10}
      aria-labelledby="testimonials-title"
    >
      <Box maxW="1100px" mx="auto" px={{ base: 4, md: 6 }}>
        <Heading
          as="h2"
          id="testimonials-title"
          fontSize="64px"
          textAlign="center"
          mb={{ base: 8, md: 10 }}
        >
          Testimonials
        </Heading>

        <SimpleGrid
          as="ul"
          role="list"
          columns={{ base: 1, sm: 2, md: 4 }}
          gap={{ base: 6, md: 8 }}
        >
          {MOCK_TESTIMONIALS.map((t) => (
            <Card.Root
              as="li"
              role="listitem"
              key={t.id}
              bg="white"
              border={'none'}
              borderRadius="xl"
              shadow="md"
              p={5}
              asChild
            >
              {/* asChild lets us set figure semantics cleanly if your Chakra version supports it.
                 If not, replace with <Box as="figure" ...> */}
              <Box as="figure">
                <VStack align="start" spacing={3}>
                  <Stars value={t.rating} />

                  <HStack align="center" spacing={4} w="full" mt={2}>
                    <Avatar.Root size="md">
                      {t.avatar ? (
                        <Avatar.Image
                          src={t.avatar}
                          alt=""
                          aria-hidden="true"
                        />
                      ) : (
                        <Avatar.Fallback>{getInitials(t.name)}</Avatar.Fallback>
                      )}
                    </Avatar.Root>
                    <Text as="figcaption" fontWeight="semibold">
                      {t.name}
                    </Text>
                  </HStack>

                  <Text as="blockquote" color="fg.muted" fontSize="sm">
                    {t.text}
                  </Text>
                </VStack>
              </Box>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
