import Header from 'components/Header';
import Footer from 'components/Footer';
import AppRouting from 'AppRouting';

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <AppRouting />
      </main>
      <Footer />
    </div>
  );
}

export default App;
