import React from 'react';

import SelectProfilePictureModal, { IntroductionStep as IntroductionStepComponent, SelectNftStep as SelectNftStepComponent, FinalStep as FinalStepComponent } from './SelectProfilePictureModal';
import { renderWithProviders } from '../../../common/testsHelper';
import { defaultNftListItems } from '../../nft/NftCarousel/NftCarousel.testData';
import { DEFAULT_IMAGE } from '../../nft/NftCard/NftCard';

const TemplateWithComponent = (Component) => (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ width: '650px', height: '425px' }}>
      <Component {...args} />
    </div>
  </>
);

const IntroductionStep = TemplateWithComponent.bind({})(IntroductionStepComponent);
IntroductionStep.args = {
  storyTitle: 'Steps/IntroductionStep',
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
  storyTitle: 'Steps/SelectNftStep',
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
  storyTitle: 'Steps/FinalStep',
  nft: DEFAULT_IMAGE,
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
  title: 'Components/SelectProfilePictureModal/Steps',
  component: SelectProfilePictureModal,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  IntroductionStep,
  SelectNftStep,
  FinalStep,
};

export default stories;
