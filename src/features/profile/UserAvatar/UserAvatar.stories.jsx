import React from 'react';

import { defaultAvatar } from './UserAvatar.testData';
import UserAvatar from './UserAvatar';

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ maxWidth: '280px' }}>
      <UserAvatar {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  src: defaultAvatar,
};
Default.play = async ({ canvasElement }) => {};

const Mock = Template.bind({});
Mock.args = {
  storyTitle: 'Mock',
  isMock: true,
};
Mock.play = async ({ canvasElement }) => {};

const Empty = Template.bind({});
Empty.args = {
  storyTitle: 'Empty',
  src: '',
};
Empty.play = async ({ canvasElement }) => {};

const stories = {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default, Mock, Empty,
};

export default stories;
