import React, { useLayoutEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { graphql } from 'msw';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import Wallet from './Wallet';
import { defaultCurrenciesList, emptyCurrenciesList } from './Wallet.testData';
import { zeroAddress } from '../../../common/contansts';
import { renderWithProviders } from '../../../common/testsHelper';

const ARTIFICIAL_DELAY_MS = 600;

const defaultProfileState = { address: zeroAddress };

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ maxWidth: '280px' }}>
      <Wallet {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = { storyTitle: 'Default',
  userId: '0xfoo' };
Default.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Default.parameters = { msw: { handlers: [
  graphql.query('GetWallet', (req, res, ctx) => res(
    ctx.delay(ARTIFICIAL_DELAY_MS),
    ctx.data(defaultCurrenciesList),
  )),
] } };
Default.play = async ({ canvasElement }) => {};

const Loading = Template.bind({});
Loading.args = { storyTitle: 'Loading' };
Loading.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Loading.parameters = { msw: { handlers: [
  graphql.query('GetWallet', (req, res, ctx) => res(
    ctx.delay('infinite'),
  )),
] } };
Loading.play = async ({ canvasElement }) => {};

const Error = Template.bind({});
Error.args = { storyTitle: 'Error' };
Error.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Error.parameters = { msw: { handlers: [
  graphql.query('GetWallet', (req, res, ctx) => res(
    ctx.delay(ARTIFICIAL_DELAY_MS),
    ctx.errors([
      { message: 'Failed to get data' }]),
  )),
] } };
Error.play = async ({ canvasElement }) => {};

const Empty = Template.bind({});
Empty.args = { storyTitle: 'Empty' };
Empty.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Empty.parameters = { msw: { handlers: [
  graphql.query('GetWallet', (req, res, ctx) => res(
    ctx.delay(ARTIFICIAL_DELAY_MS),
    ctx.data(emptyCurrenciesList),
  )),
] } };
Empty.play = async ({ canvasElement }) => {};

const stories = { title: 'Components/Wallet',
  component: Wallet,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {} };

export {
  Default,
  Loading,
  Empty,
  Error,
};

export default stories;
