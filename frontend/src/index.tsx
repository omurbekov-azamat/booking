import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import { Provider } from 'react-redux';
import { CircularProgress, ThemeProvider } from '@mui/material';
import './18n';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import { addInterceptors } from './axiosApi';

addInterceptors(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<CircularProgress />}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Suspense>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
