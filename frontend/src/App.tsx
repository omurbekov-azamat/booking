import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/Login';
import Register from './features/users/Register';
import Layout from './components/UI/Layout/Layout';
import notFoundImage from './assets/images/notFound.jpg';
import ModalCover from './components/UI/ModalCover/ModalCover';
import { useAppSelector } from './app/hooks';
import { selectModalCoverState } from './features/users/usersSlice';

function App() {
  const state = useAppSelector(selectModalCoverState);
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route
            path={'/'}
            element={
              <>
                <h1>Test Router Main</h1>
                <ModalCover state={state} />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
