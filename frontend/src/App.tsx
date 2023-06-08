import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { selectUserSuccess, selectUser, setUserSuccessNull } from './features/users/usersSlice';
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
import { selectCommentsSuccess, setCommentsSuccessNull } from './features/comments/commentsSlice';
import { selectApartmentSuccess, setApartmentsSuccessNull } from './features/apartments/apartmentSlice';
import EditHotel from './features/hotels/components/EditHotel';
import VerifyProtectedRoute from './components/UI/ProtectedRoute/VerifyProtectedRoute';
import VerifyPage from './components/UI/VerifyPage/VerifyPage';
import ConfirmPage from './components/UI/VerifyPage/ConfirmPage';
import PrivacyPolicy from './components/UI/Footer/PrivacyPolicy';
import ContractOffer from './components/UI/Footer/ContractOffer';

function App() {
  const user = useAppSelector(selectUser);
  const orderSuccess = useAppSelector(selectOrderSuccess);
  const userSuccess = useAppSelector(selectUserSuccess);
  const hotelsSuccess = useAppSelector(selectHotelsSuccess);
  const commentsSuccess = useAppSelector(selectCommentsSuccess);
  const apartmentsSuccess = useAppSelector(selectApartmentSuccess);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (apartmentsSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(apartmentsSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(apartmentsSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setApartmentsSuccessNull());
  }, [apartmentsSuccess, i18n.language, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (commentsSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(commentsSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(commentsSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setCommentsSuccessNull());
  }, [commentsSuccess, i18n.language, dispatch, enqueueSnackbar]);

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
    if (userSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(userSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(userSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setUserSuccessNull());
  }, [userSuccess, i18n.language, dispatch, enqueueSnackbar]);

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
        <Route path="/dashboard/:city/:propertyType" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelPage />} />
        <Route path="/:hotelName/:hotelId/apartment/:id" element={<Apartment />} />
        <Route path="/hotels/:id/:roomId" element={<Apartment />} />
        <Route path="/my-cabinet/apartments/:id" element={<Apartment />} />
        <Route path="/hotels/:id/createApartment" element={<ApartmentForm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contract-offer" element={<ContractOffer />} />
        <Route
          path="/my-cabinet/edit-apartment/:id"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <ApartmentForm isEdit={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-cabinet/edit-hotel/:id"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <EditHotel />
            </ProtectedRoute>
          }
        />
        <Route path="/hotels/:id/comments" element={<Comments />} />
        <Route
          path="/book-apartment/:hotelName/:hotelId/apartment/:apartmentId"
          element={
            <VerifyProtectedRoute isVerify={user && user.isVerified}>
              <ReservationForm />
            </VerifyProtectedRoute>
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
            <VerifyProtectedRoute isVerify={user && user.isVerified}>
              <Cabinet />
            </VerifyProtectedRoute>
          }
        />
        <Route
          path="/verifyPage"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <VerifyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify/:token"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <ConfirmPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
