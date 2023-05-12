import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Layout from '../components/UI/Layout/Layout';
import WhatsAppButton from '../components/UI/WhatsAppButton/WhatsAppButton';
import ServicesButton from '../components/UI/BlockAdditionalServices/ServicesButton';

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Layout>
        <WhatsAppButton />
        <ServicesButton />
        <Outlet />
      </Layout>
    </>
  );
};

export default Home;
