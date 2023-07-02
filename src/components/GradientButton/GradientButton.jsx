import * as React from 'react';
import { styled, css } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { getLinearGradientProperty } from '../../resources/styles/functions';
import { widgetBoxMixin } from '../../resources/styles/mixins';

// const GradientTypeButton = styled(Button)(({ theme }) => ({
//   background: getLinearGradientProperty({
//     angle: 95, baseColor1: '#29AAFD', baseColor1Start: '8%', baseColor2: '#FF00E9', baseColor2Start: '105%',
//   }),
//   color: theme.palette.common.white,
//   transition: 'background-position 0.1s',
//   '&:hover': { backgroundPosition: '100%' },
//
//   '&.Mui-disabled': {
//     background: theme.palette.jediNavyBlue,
//     boxShadow: '0px 0.7697721123695374px 30.790884017944336px 0px rgba(227, 222, 255, 0.20) inset, 0px 3.0790884494781494px 13.8558988571167px 0px rgba(154, 146, 210, 0.30) inset, 0px 75.43766784667969px 76.97720336914062px -36.949066162109375px rgba(202, 172, 255, 0.30) inset',
//   },
// }));

const GradientTypeButton = styled(LoadingButton)`
  background: ${getLinearGradientProperty({
    angle: 95, baseColor1: '#29AAFD', baseColor1Start: '8%', baseColor2: '#FF00E9', baseColor2Start: '105%',
  })};
  color: ${({ theme }) => theme.palette.common.white};
  transition: background-position 0.1s;

  &:hover {
    background-position: 100%
  }

  &.Mui-disabled {
    ${widgetBoxMixin}
  }

  svg {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

const GradientButton = ({ children, ...props }) => (<GradientTypeButton {...props} variant="contained">{children}</GradientTypeButton>);

export default GradientButton;
