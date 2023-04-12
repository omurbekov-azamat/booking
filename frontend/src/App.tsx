import React from 'react';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/Login';
import Register from './features/users/Register';

function App() {
  return (
    <>
      <CssBaseline />
      <AppToolbar />
      <Routes>
        <Route
          path={'/'}
          element={
            <>
              <h1>Test Router Main</h1>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
