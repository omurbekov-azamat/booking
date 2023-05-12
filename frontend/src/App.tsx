import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/Login';
import Register from './features/users/Register';
import Layout from './components/UI/Layout/Layout';
import HotelsPage from './features/hotels/HotelsPage';
import notFoundImage from './assets/images/notFound.jpg';
import HotelForm from './features/hotels/components/HotelForm';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import HotelPage from './features/hotels/HotelPage';
import Apartment from './features/apartments/components/Apartment';
import ApartmentForm from './features/apartments/components/ApartmentForm';
import Cabinet from './features/cabinets/Cabinet';
import Comments from './features/comments/Comments';
import WhatsAppButton from './components/UI/WhatsAppButton/WhatsAppButton';
import ReservationForm from './features/orders/components/ReservationForm';
import ServicesButton from './components/UI/BlockAdditionalServices/ServicesButton';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <CssBaseline />
      <Layout>
        <WhatsAppButton />
        <ServicesButton />
        <Routes>
          <Route path={'/'} element={<HotelsPage />} />
          <Route path={'/hotels/:id'} element={<HotelPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:hotelName/:hotelId/apartment/:apartmentId" element={<Apartment />} />
          <Route path="/hotels/:id/:roomId" element={<Apartment />} />
          <Route path="/hotels/:id/createApartment" element={<ApartmentForm />} />
          <Route path="/hotels/:id/editApartment/:id" element={<ApartmentForm />} />
          <Route path="/hotels/:id/comments" element={<Comments />} />
          <Route
            path="/book-apartment/:hotelName/:hotelId/apartment/:apartmentId"
            element={
              <ProtectedRoute isAllowed={user && Boolean(user)}>
                <ReservationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addHotel"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'hotel')}>
                <HotelForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cabinet"
            element={
              <ProtectedRoute isAllowed={user && Boolean(user)}>
                <Cabinet />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <img src={notFoundImage} alt="not found" style={{ marginTop: '7px', width: '100%', height: 'auto' }} />
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
