import { NavLink, useNavigate } from 'react-router-dom';
import Logo from 'assets/logo.svg';
import BurgerIcon from 'assets/hamburger.svg';
import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  IconButton,
  Image,
  Portal,
  VStack
} from '@chakra-ui/react';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="site-header container--small">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        py={3}
      >
        <Image
          src={Logo}
          alt="Little Lemon Logo"
          className="logo"
          cursor="pointer"
          onClick={() => navigate('/')}
        />

        {/* Desktop nav */}
        <Box as="nav" aria-label="Primary" display={['none', 'none', 'block']}>
          <ul className="nav">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li>
              <NavLink to="/reserve">Reservations</NavLink>
            </li>
            <li>
              <NavLink to="/order">Order Online</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </Box>

        {/* Mobile burger (uses Drawer.Trigger) */}
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Image
              aria-label="Open menu"
              variant="plain"
              display={['inline-flex', 'inline-flex', 'none']}
              src={BurgerIcon}
              cursor={'pointer'}
            />
          </Drawer.Trigger>

          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Menu</Drawer.Title>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton />
                  </Drawer.CloseTrigger>
                </Drawer.Header>

                <Drawer.Body>
                  <VStack
                    as="nav"
                    aria-label="Mobile primary"
                    align="stretch"
                    spacing={3}
                  >
                    <NavLink to="/" end>
                      Home
                    </NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/menu">Menu</NavLink>
                    <NavLink to="/reserve">Reservations</NavLink>
                    <NavLink to="/order">Order Online</NavLink>
                    <NavLink to="/login">Login</NavLink>
                  </VStack>
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </header>
  );
}
