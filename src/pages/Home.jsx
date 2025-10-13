import { Box, GridItem } from '@chakra-ui/react';
import ContentGrid from 'components/ContentGrid';

function Home() {
  return (
    <ContentGrid>
      <GridItem
        colStart={{ base: 1 }}
        colSpan={{ base: 12 }}
        backgroundColor={'green'}
        py="8"
      >
        <ContentGrid>
          <GridItem colStart={{ base: 1, xl: 3 }} colSpan={{ base: 12, xl: 8 }}>
            <Box color={'yellow'}>Home</Box>
          </GridItem>
        </ContentGrid>
      </GridItem>
    </ContentGrid>
  );
}

export default Home;
