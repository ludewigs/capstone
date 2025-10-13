import Header from 'components/Header';
import Footer from 'components/Footer';
import AppRouting from 'AppRouting';
import Layout from 'components/Layout';

function App() {
  return (
    <>
      <Layout>
        <Header />
        <main className="app-main">
          <AppRouting />
        </main>
        <Footer />
      </Layout>
    </>
  );
}

export default App;
