import { css } from 'styled-components';

import { boxBackground1, boxBackground2, boxBoxShadow1, boxBoxShadow2, linearGradient1 } from './constants';

const widgetBoxMixin = ({ borderRadius = '8px' }) => css`
  background: ${boxBackground1};
  box-shadow: ${boxBoxShadow1};
  border-radius: ${borderRadius};
  overflow: hidden;
`;

const gradientBorderMixin = ({ ignoreRelative = false, borderWidth = '2px', borderRadius = '8px', gradient = linearGradient1 }) => css`
  ${!ignoreRelative && css`position: relative;`}

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${borderRadius};
    padding: ${borderWidth};
    background: ${gradient};
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const glassEffectMixin = ({ blur = '3rem' }) => css`
  background: ${boxBackground2};
  box-shadow: ${boxBoxShadow2};
  backdrop-filter: blur(${blur});
`;

export {
  widgetBoxMixin,
  gradientBorderMixin,
  glassEffectMixin,
};
