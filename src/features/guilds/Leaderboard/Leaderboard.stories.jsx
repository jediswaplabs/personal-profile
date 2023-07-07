import React from 'react';
import { graphql } from 'msw';
import { within, userEvent, findByText, getByText, getAllByRole, findAllByRole } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import LeaderboardTable, { ROWS_PER_PAGE } from './Leaderboard';
import { defaultLeaderboardData } from './Leaderboard.testData';
import { renderWithProviders } from '../../../common/testsHelper';

const ranks = defaultLeaderboardData.ids.map((id) => defaultLeaderboardData.entities[id].rank);
const points = defaultLeaderboardData.ids.map((id) => defaultLeaderboardData.entities[id].points);

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
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step('Sorting ranks ascending', async () => {
    await testRankOrder(canvas, true);
  });
  await step('Sorting ranks descending', async () => {
    await testRankOrder(canvas, false);
  });

  await step('Sorting points ascending', async () => {
    await testPointsOrder(canvas, true);
  });

  await step('Sorting points descending', async () => {
    await testPointsOrder(canvas, false);
  });

  await step('Pagination', async () => {
    await testPagination(canvas);
  });
};

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

function getColumnValues(canvas, column) {
  const headers = canvas.getAllByRole('columnheader').map((th) => th.textContent);
  const colNumber = headers.indexOf(column);
  return canvas.getAllByRole('row').slice(1).map((row) => getAllByRole(row, 'cell')[colNumber].textContent);
}

async function testPointsOrder(canvas, isAsc) {
  const header = await canvas.findByText('Total points');
  await userEvent.click(header);
  const pointTexts = getColumnValues(canvas, 'Total points');
  const pointNumbers = pointTexts.map((rank) => Number(rank));
  const sortedPoints = [...points].sort((a, b) => (isAsc ? a - b : b - a));
  expect(pointNumbers).toEqual(sortedPoints.slice(0, ROWS_PER_PAGE));
}

async function testRankOrder(canvas, isAsc) {
  const header = await canvas.findByText('Overall rank');
  await userEvent.click(header);
  const rankTexts = getColumnValues(canvas, 'Overall rank');
  const rankNumbers = rankTexts.map((rank) => Number(rank.replace('#', '')));
  const sortedRanks = [...ranks].sort((a, b) => (isAsc ? a - b : b - a));
  expect(rankNumbers).toEqual(sortedRanks.slice(0, ROWS_PER_PAGE));
}

function pointsPagination(canvas, pageNumber) {
  const pointTexts = getColumnValues(canvas, 'Total points');
  const pointNumbers = pointTexts.map((rank) => Number(rank));
  const sortedPoints = [...points].sort((a, b) => b - a);
  expect(pointNumbers).toEqual(sortedPoints.slice(ROWS_PER_PAGE * (pageNumber - 1), ROWS_PER_PAGE * pageNumber));
}

async function testPagination(canvas) {
  const prev = (await canvas.findByText('Prev')).closest('button');
  const next = (await canvas.findByText('Next')).closest('button');
  expect(prev).toBeDisabled();
  if (defaultLeaderboardData.ids.length <= ROWS_PER_PAGE) {
    return;
  }
  expect(next).toBeEnabled();
  pointsPagination(canvas, 1);
  await userEvent.click(next);
  expect(prev).toBeEnabled();
  pointsPagination(canvas, 2);
  await userEvent.click(prev);
  pointsPagination(canvas, 1);
}

export {
  Default,
  UnselectedGuild,
  Loading,
  Error,
};

export default stories;
