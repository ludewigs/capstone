import Confirmation from 'pages/Confirmation';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import ReserveTable from 'pages/ReserveTable';
import { Route, Routes } from 'react-router-dom';

function AppRouting() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reserve" element={<ReserveTable />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouting;
