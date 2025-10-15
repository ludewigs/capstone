import About from 'pages/AboutUs';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import OnlineMenu from 'pages/OnlineMenu';
import Order from 'pages/Order';
import ReserveTable from 'pages/ReserveTable';
import { Route, Routes } from 'react-router-dom';

function AppRouting() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<OnlineMenu />} />
      <Route
        path="/reserve"
        element={<ReserveTable onSubmitSuccess={false} />}
      />
      <Route path="/order" element={<Order />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouting;
