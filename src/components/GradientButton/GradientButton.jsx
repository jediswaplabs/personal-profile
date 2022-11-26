import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { getLinearGradientProperty } from '../../resources/styles/functions';

const GradientTypeButton = styled(Button)(({ theme }) => ({
  background: getLinearGradientProperty({
    angle: 95, baseColor1: '#29AAFD', baseColor1Start: '8%', baseColor2: '#FF00E9', baseColor2Start: '105%',
  }),
  color: theme.palette.common.white,
  transition: 'background-position 0.1s',
  '&:hover': { backgroundPosition: '100%' },
}));

const GradientButton = ({ children, ...props }) => (<GradientTypeButton {...props} variant="contained">{children}</GradientTypeButton>);

export default GradientButton;
