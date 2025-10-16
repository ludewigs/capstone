import Header from 'components/Header';
import Footer from 'components/Footer';
import AppRouting from 'AppRouting';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box
      className="page-wrapper"
      display="flex"
      flexDirection="column"
      minH="100vh"
    >
      <Header />
      <Box as="main" className="main" flex="1">
        <Box className="container">
          <AppRouting />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
