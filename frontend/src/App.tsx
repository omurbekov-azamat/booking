import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { selectFavoriteSuccess, selectUser, setFavoriteSuccessNull } from './features/users/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Home from './containers/Home';
import MainPage from './containers/MainPage';
import Login from './features/users/Login';
import Register from './features/users/Register';
import HotelsPage from './features/hotels/HotelsPage';
import HotelForm from './features/hotels/components/HotelForm';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import HotelPage from './features/hotels/HotelPage';
import Apartment from './features/apartments/components/Apartment';
import ApartmentForm from './features/apartments/components/ApartmentForm';
import Cabinet from './features/cabinets/Cabinet';
import Comments from './features/comments/Comments';
import ReservationForm from './features/orders/components/ReservationForm';
import NoFoundPage from './components/UI/NoFoundPage/NoFoundPage';
import { selectOrderSuccess, setOrderSuccessNull } from './features/orders/ordersSlice';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { selectHotelsSuccess, setHotelsSuccessNull } from './features/hotels/hotelsSlice';

function App() {
  const user = useAppSelector(selectUser);
  const orderSuccess = useAppSelector(selectOrderSuccess);
  const favoriteSuccess = useAppSelector(selectFavoriteSuccess);
  const hotelsSuccess = useAppSelector(selectHotelsSuccess);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (hotelsSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(hotelsSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(hotelsSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setHotelsSuccessNull());
  }, [hotelsSuccess, i18n.language, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (favoriteSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(favoriteSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(favoriteSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setFavoriteSuccessNull());
  }, [favoriteSuccess, i18n.language, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (orderSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(orderSuccess.message.en, {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(orderSuccess.message.ru, {
          variant: 'success',
        });
      }
      dispatch(setOrderSuccessNull());
    }
  }, [orderSuccess, i18n.language, dispatch, enqueueSnackbar]);
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelPage />} />
        <Route path="/:hotelName/:hotelId/apartment/:apartmentId" element={<Apartment />} />
        <Route path="/hotels/:id/:roomId" element={<Apartment />} />
        <Route path="/hotels/:id/createApartment" element={<ApartmentForm />} />
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
        <Route path="*" element={<NoFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
