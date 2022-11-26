/* eslint-disable */
import React, { } from 'react';
import { graphql } from 'msw';

import WalletModal from './WalletModal';
import {WalletConnectOptionsView, WalletAccountOverview} from './WalletModal';
import { renderWithProviders } from '../../../common/testsHelper';
import {supportedWallets} from "./WalletModal.testData";

const noop = () => {};

// const ARTIFICIAL_DELAY_MS = 600;

const defaultAddress = '0x00000000000000';

const TemplateWithComponent = (Component) => (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ maxWidth: '280px' }}>
      <Component {...args} />
    </div>
  </>
);

const WalletsList = TemplateWithComponent.bind({})(WalletConnectOptionsView);
WalletsList.args = {
  storyTitle: 'WalletsList',
  wallets: supportedWallets,
};
WalletsList.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
WalletsList.parameters = {};
WalletsList.play = async ({ canvasElement }) => {};

const AccountOverview = TemplateWithComponent.bind({})(WalletAccountOverview);
AccountOverview.args = {
  storyTitle: 'AccountOverview',
  connectedWallet: supportedWallets['ArgentX'],
  connectedAddress: defaultAddress,
  onWalletDisconnect: () => {},
};
AccountOverview.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
AccountOverview.parameters = {};
AccountOverview.play = async ({ canvasElement }) => {};
//
// const WalletConnection = TemplateWithComponent.bind({})(WalletPending);
// WalletConnection.args = {
//   storyTitle: 'WalletConnection ',
//   connector: null,
//   error: 'Error',
//   setWalletConnectionError: noop,
//   setWalletView: noop,
//   tryActivation: noop,
// };
// WalletConnection.decorators = [
//   (Story) => {
//     const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
//     return <MockStore><Story /></MockStore>;
//   },
// ];
// WalletConnection.parameters = {};
// WalletConnection.play = async ({ canvasElement }) => {};
//


const stories = {
  title: 'Components/WalletModal',
  component: WalletModal,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  WalletsList,
  AccountOverview,
};

export default stories;
