import React from 'react';

import Guild from './Guild';
import { guildStyling } from './Guild.styles';
import { zeroAddress } from '../../../common/contansts';
import { renderWithProviders } from '../../../common/testsHelper';

const defaultProfileState = { address: zeroAddress };

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div>
      <Guild {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = { storyTitle: 'Default',
  name: 'Guild name',
  id: 'design' };
Default.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Default.play = async ({ canvasElement }) => {};

const WithPoints = Template.bind({});
WithPoints.args = { storyTitle: 'With points',
  name: 'Guild name',
  id: 'design',
  score: 200 };
WithPoints.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
WithPoints.play = async ({ canvasElement }) => {};

const SelectedGuild = Template.bind({});
SelectedGuild.args = { storyTitle: 'Selected',
  isSelected: true,
  name: 'Guild name',
  id: 'design',
  score: 200 };
SelectedGuild.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
SelectedGuild.play = async ({ canvasElement }) => {};

const AllTypesTemplate = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div>
      {Object.keys(guildStyling).map((guildId) => (
        <div key={guildId} style={{ margin: '0 20px 20px' }}>
          <div style={{ color: '#fff' }}>{guildId}:</div>
          <br />
          <Guild {...args} id={guildId} name="Guild name" />
        </div>
      ))}
    </div>
  </>
);

const AllTypes = AllTypesTemplate.bind({});
AllTypes.args = { storyTitle: 'All types',
  isSelected: true,
  name: 'Guild name',
  id: 'design',
  score: 200 };
AllTypes.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
AllTypes.play = async ({ canvasElement }) => {};

const Loading = Template.bind({});
Loading.args = { storyTitle: 'Loading',
  isMock: true,
  name: 'Guild name',
  id: 'design' };
Loading.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Loading.play = async ({ canvasElement }) => {};

const stories = { title: 'Components/Guild',
  component: Guild,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {} };

export {
  Default,
  WithPoints,
  AllTypes,
  SelectedGuild,
  Loading,
};

export default stories;
