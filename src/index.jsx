import React from 'react';
import { createRoot } from 'react-dom/client';

import './app/i18next';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
// import { Router } from '@reach/router';
import { StarknetReactProvider, createStarknetReactRoot } from '@web3-starknet-react/core';

import { NetworkContextName } from './common/contansts';
import getLibrary from './utils/getLibrary';
import { jediSwapDarkTheme } from './resources/themes';
import setupStore from './app/store';
import GlobalStyle, { ApplicationContainer } from './index.styles';
import MainPage from './pages/MainPage/MainPage';
import PersonalProfilePage from './pages/PersonalProfilePage/PersonalProfilePage';

const StarknetProviderNetwork = createStarknetReactRoot(NetworkContextName);

if (process.env.NODE_MOCK_BE) {
  // eslint-disable-next-line global-require
  const { worker } = require('../mocks/mockBe');
  worker.start();
}

const App = () => (
  <ThemeProvider theme={jediSwapDarkTheme}>
    <StarknetReactProvider getLibrary={getLibrary}>
      <StarknetProviderNetwork getLibrary={getLibrary}>
        <Provider store={setupStore()}>
          <GlobalStyle />
          <ApplicationContainer>
            {/* <Router basepath="/"> */}
            <PersonalProfilePage path="/" />
            {/* <MainPage path="/" /> */}
            {/* </Router> */}
          </ApplicationContainer>
        </Provider>
      </StarknetProviderNetwork>
    </StarknetReactProvider>
  </ThemeProvider>
);

createRoot(document.getElementById('app')).render(<App />);
