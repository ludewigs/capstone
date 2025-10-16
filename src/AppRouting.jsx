import About from 'pages/AboutUs';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import OnlineMenu from 'pages/OnlineMenu';
import Order from 'pages/Order';
import Booking from 'pages/Booking';
import { Route, Routes } from 'react-router-dom';
import Confirmation from 'pages/Confirmation';

function AppRouting() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<OnlineMenu />} />
      <Route path="/reserve" element={<Booking />} />
      <Route path="/order" element={<Order />} />
      <Route path="/login" element={<Login />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouting;
