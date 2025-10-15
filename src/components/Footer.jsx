import {
  Box,
  Grid,
  GridItem,
  Image,
  Heading,
  Link,
  VStack,
  Text
} from '@chakra-ui/react';
import Logo from 'assets/logo.svg';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box className="container" bg="gray" mt={12} pb={12}>
      <footer className="app-footer container--small">
        <Box as="footer" mt={12}>
          <Grid
            templateColumns={{
              base: '1fr',
              sm: 'repeat(1, 1fr)',
              md: '240px repeat(3, 1fr)'
            }}
            gap={{ base: 10, md: 8 }}
          >
            {/* Logo column */}
            <GridItem>
              <Image
                src={Logo}
                alt="Little Lemon logo"
                w="160px"
                h="auto"
                mb={3}
              />
              <Text fontSize="sm" color="fg.muted">
                © {new Date().getFullYear()} Little Lemon
              </Text>
            </GridItem>

            {/* Doormat Navigation */}
            <GridItem>
              <Heading as="h3" size="sm" mb={3}>
                Doormat Navigation
              </Heading>
              <VStack align="start" spacing={1}>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/menu">Menu</RouterLink>
                <RouterLink to="/reserve">Reservations</RouterLink>
                <RouterLink to="/order">Order Online</RouterLink>
                <RouterLink to="/login">Login</RouterLink>
              </VStack>
            </GridItem>

            {/* Contact */}
            <GridItem>
              <Heading as="h3" size="sm" mb={3}>
                Contact
              </Heading>
              <VStack align="start" spacing={1}>
                <Text mb={0}>123 Main Street, Chicago</Text>
                <Text mb={0}>(312) 555-0199</Text>
                <Link href="mailto:info@littlelemon.com" target="_blank">
                  info@littlelemon.com
                </Link>
              </VStack>
            </GridItem>

            {/* Social Media */}
            <GridItem>
              <Heading as="h3" size="sm" mb={3}>
                Social Media
              </Heading>
              <VStack align="start" spacing={1}>
                <Link href="https://facebook.com" target="_blank">
                  Facebook
                </Link>
                <Link href="https://instagram.com" target="_blank">
                  Instagram
                </Link>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </footer>
    </Box>
  );
}

export default Footer;
