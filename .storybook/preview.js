import React from 'react';
import {addDecorator} from '@storybook/react';
import {ThemeProvider} from '@mui/material/styles';
import {initialize, mswDecorator} from 'msw-storybook-addon';

import {jediSwapDarkTheme} from '../src/resources/themes';
import i18n from './i18next.js';

initialize();

addDecorator((story) => (
  <ThemeProvider theme={jediSwapDarkTheme}>{story()}</ThemeProvider>
));

// https://github.com/mswjs/msw-storybook-addon
export const decorators = [mswDecorator];

const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  i18n,
  locale: 'en',
  locales: {
    en: {title: "English", left: '🇺🇸'},
    in: {title: "Hindi", left: '🇮🇳'},
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers: {}
  }
};

export {parameters};
