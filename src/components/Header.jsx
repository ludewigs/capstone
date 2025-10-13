// Header.jsx
import { Flex, Image, HStack, Box, Spacer } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';
import Logo from 'assets/logo.svg';
import { GridItem } from '@chakra-ui/react';
import ContentGrid from './ContentGrid';

const NavItem = chakra(NavLink);

export default function Header() {
  return (
    <ContentGrid>
      <GridItem colStart={{ base: 1, xl: 3 }} colSpan={{ base: 12, xl: 8 }}>
        <Flex
          as="header"
          align="center"
          gap="4"
          py="3"
          direction={{ base: 'column', md: 'row' }}
        >
          <Image src={Logo} alt="Little Lemon Logo" h="40px" />

          <Spacer display={{ base: 'none', md: 'block' }} />

          <Box as="nav" aria-label="Primary" w={{ base: 'full', md: 'auto' }}>
            <HStack
              as="ul"
              m="0"
              p="0"
              listStyleType="none"
              justify={{ base: 'center', md: 'flex-end' }}
              gap={{ base: 4, md: 6 }}
              wrap="wrap"
            >
              {[
                { to: '/', label: 'Home', end: true },
                { to: '/reserve', label: 'Reservations' },
                { to: '/confirmation', label: 'Confirmation' }
              ].map(({ to, label, end }) => (
                <Box as="li" key={to}>
                  <NavItem
                    to={to}
                    end={end}
                    textDecoration="none"
                    _hover={{ textDecoration: 'underline' }}
                    css={{
                      fontWeight: 600,
                      color: 'green',
                      '&[aria-current="page"]': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {label}
                  </NavItem>
                </Box>
              ))}
            </HStack>
          </Box>
        </Flex>
      </GridItem>
    </ContentGrid>
  );
}
