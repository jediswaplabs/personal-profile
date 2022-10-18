import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import setupStore from './app/store';
import './app/i18next';
import { jediSwapDarkTheme } from './resources/themes';
import ActivitiesList from './features/activities/ActivitiesList/ActivitiesList';
import Wallet from './features/wallet/Wallet/Wallet';

const App = () => (
  <ThemeProvider theme={jediSwapDarkTheme}>
    <Provider store={setupStore()}>
      <div style={{ background: '#000' }}>
        <ActivitiesList userId="0xfoo" />
        <Wallet userId="0xfoo" />
      </div>
    </Provider>
  </ThemeProvider>
);

createRoot(document.getElementById('app')).render(<App />);
