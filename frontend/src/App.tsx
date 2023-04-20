import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/Login';
import Register from './features/users/Register';
import Layout from './components/UI/Layout/Layout';
import HotelsPage from './features/hotels/HotelsPage';
import notFoundImage from './assets/images/notFound.jpg';
import HotelPage from './features/hotels/HotelPage';
import HotelRoomPage from './features/hotelRoom/HotelRoomPage';

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path={'/'} element={<HotelsPage />} />
          <Route path={'/hotels/:id'} element={<HotelPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels/:id/:roomId" element={<HotelRoomPage />} />
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
