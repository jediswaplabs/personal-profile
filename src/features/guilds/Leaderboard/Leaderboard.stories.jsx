import React from 'react';
import { graphql } from 'msw';

import LeaderboardTable from './Leaderboard';
import { defaultLeaderboardData } from './Leaderboard.testData';
import { renderWithProviders } from '../../../common/testsHelper';

const ARTIFICIAL_DELAY_MS = 600;

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div>
      <LeaderboardTable {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  guildId: 'growth',
  guildName: 'Growth',
};
Default.decorators = [
  (Story) => {
    const MockStore = renderWithProviders();
    return <MockStore><Story /></MockStore>;
  },
];
Default.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuildLeaderboard', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultLeaderboardData),
      )),
    ],
  },
};
Default.play = async ({ canvasElement }) => {};

const UnselectedGuild = Template.bind({});
UnselectedGuild.args = {
  storyTitle: 'UnselectedGuild',
};
UnselectedGuild.decorators = [
  (Story) => {
    const MockStore = renderWithProviders();
    return <MockStore><Story /></MockStore>;
  },
];
UnselectedGuild.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuildLeaderboard', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultLeaderboardData),
      )),
    ],
  },
};
UnselectedGuild.play = async ({ canvasElement }) => {};

const Loading = Template.bind({});
Loading.args = {
  storyTitle: 'Loading',
  guildId: 'growth',
  guildName: 'Growth',
};
Loading.decorators = [
  (Story) => {
    const MockStore = renderWithProviders();
    return <MockStore><Story /></MockStore>;
  },
];
Loading.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuildLeaderboard', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
    ],
  },
};
Loading.play = async ({ canvasElement }) => {};

const Error = Template.bind({});
Error.args = {
  storyTitle: 'Error',
  guildId: 'growth',
  guildName: 'Growth',
};
Error.decorators = [
  (Story) => {
    const MockStore = renderWithProviders();
    return <MockStore><Story /></MockStore>;
  },
];
Error.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuildLeaderboard', (req, res, ctx) => res(
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
  title: 'Components/Leaderboard',
  component: LeaderboardTable,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default,
  UnselectedGuild,
  Loading,
  Error,
};

export default stories;
