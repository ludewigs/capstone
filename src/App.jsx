import Header from 'components/Header';
import Footer from 'components/Footer';
import AppRouting from 'AppRouting';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box className="container">
      <Header />
      <main className="main">
        <AppRouting />
      </main>
      <Footer />
    </Box>
  );
}

export default App;
