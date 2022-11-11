import React from 'react';
import { graphql } from 'msw';

import GuildsList from './GuildsList';
import { zeroAddress } from '../../../common/contansts';
import { defaultGuildsList, emptyGuildsList, guildsListWithScore } from './GuildsList.testData';
import { renderWithProviders } from '../../../common/testsHelper';

const ARTIFICIAL_DELAY_MS = 600;

const defaultProfileState = { address: zeroAddress };

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div>
      <GuildsList {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  userId: '0xfoo',
};
Default.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuilds', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultGuildsList),
      )),
    ],
  },
};
Default.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Default.play = async ({ canvasElement }) => {};

const WithScores = Template.bind({});
WithScores.args = {
  storyTitle: 'WithScores',
  userId: '0xfoo',
};
WithScores.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
WithScores.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuilds', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(guildsListWithScore),
      )),
    ],
  },
};
WithScores.play = async ({ canvasElement }) => {};

const Loading = Template.bind({});
Loading.args = { storyTitle: 'Loading' };
Loading.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Loading.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuilds', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
    ],
  },
};
Loading.play = async ({ canvasElement }) => {};

const Empty = Template.bind({});
Empty.args = { storyTitle: 'Empty' };
Empty.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Empty.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuilds', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(emptyGuildsList),
      )),
    ],
  },
};
Empty.play = async ({ canvasElement }) => {};

const Error = Template.bind({});
Error.args = { storyTitle: 'Error' };
Error.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Error.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuilds', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.errors([
          { message: 'Failed to get data' },
        ]),
      )),
    ],
  },
};
Error.play = async ({ canvasElement }) => {};

const stories = {
  title: 'Components/GuildsList',
  component: GuildsList,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default,
  WithScores,
  Loading,
  Empty,
  Error,
};

export default stories;
