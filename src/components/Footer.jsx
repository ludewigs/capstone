import { GridItem } from '@chakra-ui/react';
import ContentGrid from './ContentGrid';

function Footer() {
  return (
    <ContentGrid>
      <GridItem colStart={{ base: 1, xl: 3 }} colSpan={{ base: 12, xl: 8 }}>
        <footer
          className="app-footer"
          style={{ textAlign: 'center', padding: '1rem 0' }}
        >
          <p>&copy; 2025 Little Lemon</p>
        </footer>
      </GridItem>
    </ContentGrid>
  );
}

export default Footer;
