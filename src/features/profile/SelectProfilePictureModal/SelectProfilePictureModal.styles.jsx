import styled, { css } from 'styled-components';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';

import { cardHeaderCover, gradientBorderMixin, widgetBoxMixin } from '../../../resources/styles/mixins';
import GradientButton from '../../../components/GradientButton/GradientButton';

const ModalContainer = styled.div`
  ${widgetBoxMixin({ borderRadius: '16px' })}
  ${gradientBorderMixin({ borderRadius: '16px' })}
`;

const ModalInner = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #fff;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  background-color: #141451;
  padding: 1rem;
`;

const NextStepButton = styled(GradientButton)`
  width: 100%;
  max-width: 390px;
  height: 64px;
`;

const SliderNavigationArrow = styled.div`
  color: ${({ theme }) => theme.palette.common.white};
  display: inline-flex;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
  z-index: 1;
  user-select: none;

  svg {
    fill: ${({ theme }) => theme.palette.common.white};
  }

  &.swiper-button-disabled {
    opacity: 0.5;
  }
`;
const SliderNavigationArrowPrev = styled(SliderNavigationArrow)`
  left: 0;

  svg {
    transform: rotate(180deg);
  }
`;
const SliderNavigationArrowNext = styled(SliderNavigationArrow)`
  right: 0;
`;

const Cover = styled.div`
  ${(props) => css`
    ${cardHeaderCover({ ...(props.height ? { height: props.height } : {}) })}
  `}
`;

const SelectProfilePictureFormContainer = styled.div`
  //display: flex;
  width: 100%;
  height: 100%;
  max-height: 500px;
`;

const IntroductionStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroductionStepAvatarGroups = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -50px;
  margin-bottom: 45px;

  & .avatar {
    position: relative;
    z-index: 1;
  }

  & .avatar:first-child {
    z-index: 0;
    margin-right: -15px;
  }

  & .avatar:last-child {
    z-index: 0;
    margin-left: -15px;
  }
`;

const IntroductionStepTitles = styled.div`
  text-align: center;
  max-width: 280px;
  margin-bottom: 30px;
`;

const SelectNftStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
  //height: 100%;
`;

const SelectNftStepTitle = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
`;

const SelectNftStepSlider = styled.div`
  width: 100%;
  max-width: 350px;
  margin-bottom: 40px;
  position: relative;

  //.swiper-wrapper {
  //  width: 200px;
  //}

  .swiper {
    width: 100%;
  }

  .swiper-wrapper {
    align-items: center;
  }

  .swiper-slide {
    text-align: center;
    user-select: none;

    .image-wrapper {
      display: inline-block;
      padding: 10px;
    }

    img {
      max-width: 220px;
      width: 100%;
      display: block;
      cursor: pointer;
    }
  }

  .swiper-slide-active.is-selected {
    .image-wrapper {
      ${gradientBorderMixin({})}
    }
  }

`;

const SelectNftStepSliderCounter = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export {
  ModalContainer,
  ModalInner,
  Cover,
  NextStepButton,
  SliderNavigationArrowPrev,
  SliderNavigationArrowNext,
  SelectProfilePictureFormContainer,
  IntroductionStepContainer,
  IntroductionStepAvatarGroups,
  IntroductionStepTitles,
  SelectNftStepContainer,
  SelectNftStepTitle,
  SelectNftStepSlider,
  SelectNftStepSliderCounter,

};
