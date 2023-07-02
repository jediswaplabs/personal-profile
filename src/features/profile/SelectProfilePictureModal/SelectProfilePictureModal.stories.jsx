import React from 'react';

import SelectProfilePictureModal, { SelectProfilePictureForm as SelectProfilePictureFormComponent,
  IntroductionStep as IntroductionStepComponent,
  SelectNftStep as SelectNftStepComponent,
  FinalStep as FinalStepComponent } from './SelectProfilePictureModal';
import { renderWithProviders } from '../../../common/testsHelper';
import { zeroAddress } from '../../../common/contansts';
import { defaultNftListItems } from '../../nft/NftCarousel/NftCarousel.testData';

const TemplateWithComponent = (Component) => (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ width: '650px', height: '425px' }}>
      <Component {...args} />
    </div>
  </>
);

const Form = TemplateWithComponent.bind({})(SelectProfilePictureFormComponent);
Form.args = {
  storyTitle: 'SelectProfilePictureForm',
};
Form.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
Form.parameters = {};
Form.play = async ({ canvasElement }) => {};
//
const IntroductionStep = TemplateWithComponent.bind({})(IntroductionStepComponent);
IntroductionStep.args = {
  storyTitle: 'IntroductionStep',
};
IntroductionStep.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
IntroductionStep.parameters = {};
IntroductionStep.play = async ({ canvasElement }) => {};

const SelectNftStep = TemplateWithComponent.bind({})(SelectNftStepComponent);
SelectNftStep.args = {
  storyTitle: 'SelectNftStep',
  nfts: defaultNftListItems,
};
SelectNftStep.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
SelectNftStep.parameters = {};
SelectNftStep.play = async ({ canvasElement }) => {};
//
const FinalStep = TemplateWithComponent.bind({})(FinalStepComponent);
FinalStep.args = {
  storyTitle: 'FinalStep',
};
FinalStep.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
FinalStep.parameters = {};
FinalStep.play = async ({ canvasElement }) => {};

const stories = {
  title: 'Components/SelectProfilePictureModal',
  component: SelectProfilePictureModal,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Form,
  IntroductionStep,
  SelectNftStep,
  FinalStep,
};

export default stories;
