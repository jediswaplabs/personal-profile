import React from 'react';
import { userEvent, within } from '@storybook/testing-library';

import WalletModal, { WalletConnectOptionsView, WalletAccountOverview } from './WalletModal';
import { supportedWallets } from './WalletModal.testData';
import { renderWithProviders } from '../../../common/testsHelper';
import { zeroAddress } from '../../../common/contansts';

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
  connectedWallet: supportedWallets.ArgentX,
  connectedAddress: zeroAddress,
  onWalletDisconnect: () => {},
};
AccountOverview.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
AccountOverview.parameters = {};
AccountOverview.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const btn = await canvas.findByText('Copy address');
  await userEvent.click(btn);
  await canvas.findByText('Copied!');
};
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
