import { NavLink, useNavigate, Link as RouterLink } from 'react-router-dom';
import Logo from 'assets/logo.svg';
import BurgerIcon from 'assets/hamburger.svg';
import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  Image,
  Link,
  Portal,
  VStack
} from '@chakra-ui/react';

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box className="site-header-wrapper container" as="header" role="banner">
      <Box className="site-header container--small">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          py={3}
        >
          {/* Logo as real Home link */}
          <Link
            as={RouterLink}
            to="/"
            aria-label="Little Lemon — Home"
            display="inline-flex"
            alignItems="center"
          >
            <Image src={Logo} alt="Little Lemon" className="logo" />
          </Link>

          {/* Desktop nav */}
          <Box
            as="nav"
            aria-label="Primary"
            display={['none', 'none', 'block']}
          >
            <Box as="ul" className="nav" m={0} p={0}>
              <Box as="li" listStyleType="none">
                <NavLink to="/" end>
                  Home
                </NavLink>
              </Box>
              <Box as="li" listStyleType="none">
                <NavLink to="/about">About</NavLink>
              </Box>
              <Box as="li" listStyleType="none">
                <NavLink to="/menu">Menu</NavLink>
              </Box>
              <Box as="li" listStyleType="none">
                <NavLink to="/reserve">Reservations</NavLink>
              </Box>
              <Box as="li" listStyleType="none">
                <NavLink to="/order">Order Online</NavLink>
              </Box>
              <Box as="li" listStyleType="none">
                <NavLink to="/login">Login</NavLink>
              </Box>
            </Box>
          </Box>

          {/* Mobile burger + drawer */}
          <Drawer.Root>
            <Drawer.Trigger asChild>
              {/* Use a real button for the trigger */}
              <Box
                as="button"
                type="button"
                aria-label="Open menu"
                aria-haspopup="menu"
                display={['inline-flex', 'inline-flex', 'none']}
                p="0"
                bg="transparent"
                border="0"
                cursor="pointer"
              >
                <Image src={BurgerIcon} alt="" role="presentation" />
              </Box>
            </Drawer.Trigger>

            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Menu</Drawer.Title>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton aria-label="Close menu" />
                    </Drawer.CloseTrigger>
                  </Drawer.Header>

                  <Drawer.Body>
                    <VStack
                      as="nav"
                      aria-label="Mobile primary"
                      align="stretch"
                      spacing={3}
                    >
                      <Box as="ul" m={0} p={0}>
                        <Box as="li" listStyleType="none">
                          <NavLink to="/" end>
                            Home
                          </NavLink>
                        </Box>
                        <Box as="li" listStyleType="none">
                          <NavLink to="/about">About</NavLink>
                        </Box>
                        <Box as="li" listStyleType="none">
                          <NavLink to="/menu">Menu</NavLink>
                        </Box>
                        <Box as="li" listStyleType="none">
                          <NavLink to="/reserve">Reservations</NavLink>
                        </Box>
                        <Box as="li" listStyleType="none">
                          <NavLink to="/order">Order Online</NavLink>
                        </Box>
                        <Box as="li" listStyleType="none">
                          <NavLink to="/login">Login</NavLink>
                        </Box>
                      </Box>
                    </VStack>
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Flex>
      </Box>
    </Box>
  );
}
