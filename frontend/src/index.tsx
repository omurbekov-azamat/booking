import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import { Provider } from 'react-redux';
import { CircularProgress, ThemeProvider } from '@mui/material';
import './18n';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
