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
  const year = new Date().getFullYear();

  return (
    <Box
      as="footer"
      className="container"
      bg="gray"
      mt={12}
      pb={10}
      role="contentinfo"
    >
      <Box className="app-footer container--small" mt={12}>
        <Grid
          templateColumns={{
            base: '1fr',
            sm: 'repeat(1, 1fr)',
            md: '240px repeat(3, 1fr)'
          }}
          gap={{ base: 10, md: 8 }}
        >
          {/* Logo / brand */}
          <GridItem>
            <Link as={RouterLink} to="/" aria-label="Little Lemon home">
              <Image src={Logo} alt="Little Lemon" w="160px" h="auto" mb={3} />
            </Link>
            <Text fontSize="sm" color="fg.muted">
              © <time dateTime={`${year}`}>{year}</time> Little Lemon
            </Text>
          </GridItem>

          {/* Doormat Navigation */}
          <GridItem>
            <Text fontWeight={'bold'} id="footer-nav-heading" mb={3}>
              Quick Links
            </Text>
            <Box as="nav" aria-labelledby="footer-nav-heading">
              <VStack as="ul" align="start" m={0} p={0} gap={0}>
                <Box as="li" listStyleType="none">
                  <Link as={RouterLink} to="/">
                    Home
                  </Link>
                </Box>
                <Box as="li" listStyleType="none">
                  <Link as={RouterLink} to="/about">
                    About
                  </Link>
                </Box>
                <Box as="li" listStyleType="none">
                  <Link as={RouterLink} to="/menu">
                    Menu
                  </Link>
                </Box>
                <Box as="li" listStyleType="none">
                  <Link as={RouterLink} to="/reserve">
                    Reservations
                  </Link>
                </Box>
                <Box as="li" listStyleType="none">
                  <Link as={RouterLink} to="/order">
                    Order Online
                  </Link>
                </Box>
                <Box as="li" listStyleType="none">
                  <Link as={RouterLink} to="/login">
                    Login
                  </Link>
                </Box>
              </VStack>
            </Box>
          </GridItem>

          {/* Contact */}
          <GridItem>
            <Text fontWeight={'bold'} id="footer-contact-heading" mb={3}>
              Contact
            </Text>
            <Box as="address" aria-labelledby="footer-contact-heading">
              <Box>
                <Text mb={0}>123 Main Street, Chicago</Text>
                <Link mb={0} href="tel:+13125550199">
                  (312) 555-0199
                </Link>
                <Link
                  mb={0}
                  href="mailto:info@littlelemon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  info@littlelemon.com
                </Link>
              </Box>
            </Box>
          </GridItem>

          {/* Social Media */}
          <GridItem>
            <Text fontWeight={'bold'} id="footer-social-heading" mb={3}>
              Social Media
            </Text>
            <VStack
              as="ul"
              align="start"
              m={0}
              p={0}
              gap={0}
              aria-labelledby="footer-social-heading"
            >
              <Box as="li" listStyleType="none">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
              </Box>
              <Box as="li" listStyleType="none">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default Footer;
