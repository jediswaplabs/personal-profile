import React from 'react';
import { graphql } from 'msw';

import ProfileCard from './ProfileCard';
import { defaultCurrenciesList } from '../../wallet/WalletBalance/WalletBalance.testData';
import { defaultUserData, userDataWithoutAvatar } from './ProfileCard.testData';
import { renderWithProviders } from '../../../common/testsHelper';

const ARTIFICIAL_DELAY_MS = 600;

const defaultProfileState = {
  address: '0x00000000000000',
};

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ maxWidth: 265 }}>
      <ProfileCard {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  readOnly: false,
};
Default.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Default.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultUserData),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultCurrenciesList),
      )),
    ],
  },
};
Default.play = async ({ canvasElement }) => {};

const NoAvatar = Template.bind({});
NoAvatar.args = {
  storyTitle: 'No avatar',
  readOnly: false,
};
NoAvatar.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
NoAvatar.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(userDataWithoutAvatar),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultCurrenciesList),
      )),
    ],
  },
};
NoAvatar.play = async ({ canvasElement }) => {};

const ReadOnly = Template.bind({});
ReadOnly.args = { storyTitle: 'Read only mode' };
ReadOnly.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({
      preloadedState: {
        profile: {
          ...defaultProfileState,
          readOnly: true,
        },
      },
    });
    return <MockStore><Story /></MockStore>;
  },
];
ReadOnly.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultUserData),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultCurrenciesList),
      )),
    ],
  },
};
ReadOnly.play = async ({ canvasElement }) => {};

const Error = Template.bind({});
Error.args = {
  storyTitle: 'Error',
  readOnly: false,
};
Error.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Error.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.errors([
          { message: 'Failed to get data' },
        ]),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.errors([
          { message: 'Failed to get data' },
        ]),
      )),
    ],
  },
};
Error.play = async ({ canvasElement }) => {};

const Loading = Template.bind({});
Loading.args = {
  storyTitle: 'Loading',
  readOnly: false,
};
Loading.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Loading.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
    ],
  },
};
Loading.play = async ({ canvasElement }) => {};

const stories = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default,
  ReadOnly,
  NoAvatar,
  Loading,
  Error,
};

export default stories;
