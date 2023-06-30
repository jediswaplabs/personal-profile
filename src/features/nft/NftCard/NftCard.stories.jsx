import React from 'react';

import NftCard from './NftCard';
import { defaultCard } from './NftCard.testData';
import { renderWithProviders } from '../../../common/testsHelper';

const defaultProfileState = { };

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div>
      <NftCard {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  title: defaultCard.title,
  level: defaultCard.level,
  image: defaultCard.image,
  score: defaultCard.score,
  isLocked: defaultCard.isLocked,
  unlockedDate: defaultCard.unlockedDate,
};
Default.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Default.play = async ({ canvasElement }) => {};

const Locked = Template.bind({});
Locked.args = {
  storyTitle: 'Locked',
  title: defaultCard.title,
  level: defaultCard.level,
  image: defaultCard.image,
  score: defaultCard.score,
  unlockedDate: defaultCard.unlockedDate,
  isLocked: true,
};
Locked.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Locked.play = async ({ canvasElement }) => {};

const Loading = Template.bind({});
Loading.args = {
  storyTitle: 'Loading',
  isLoading: true,
};
Loading.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Loading.play = async ({ canvasElement }) => {};

const stories = {
  title: 'Components/NftCard',
  component: NftCard,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default,
  Locked,
  Loading,
};

export default stories;
