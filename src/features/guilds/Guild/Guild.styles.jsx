import styled, { css } from 'styled-components';

import { gradientBorderMixin, widgetBoxMixin } from '../../../resources/styles/mixins';
import { getLinearGradientProperty } from '../../../resources/styles/functions';
import halftone from '../../../resources/images/halftone.png';

const GuildItemBoxContainer = styled.div`
  ${widgetBoxMixin};

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  width: 170px;
  height: 135px;
  padding: 16px;

  .title {
    margin-bottom: 15px;
    font-weight: bold;
  }

  .subtitle {
    margin-bottom: 10px;
  }

  .points {
    font-weight: 700;
    font-size: 32px;
    line-height: 1.31;
    margin-top: 9px;
  }

  .points-label {
    font-weight: 700;
  }

  .contribution-link {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    text-align: left;

    svg {
      font-size: 1.2rem;
      margin-left: 10px;
    }
  }

  ${(props) => props.active && css`
    background: ${guildStyling[props.guildTheme] || guildStyling.default};
    box-shadow: none;
    cursor: pointer;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 53px;
      height: 60px;
      background: url(${halftone}) no-repeat;
      background-size: contain;
      border-bottom-right-radius: 8px;
    }
  `};

  ${(props) => props.selected && css`
    ${gradientBorderMixin({ gradient: guildStyling[props.guildTheme] || guildStyling.default })}
    overflow: visible;

    &:before {
      width: calc(100% + 16px);
      height: calc(100% + 16px);
      transform: translate(-10px, -10px);
    }
  `};
`;

export const guildStyling = { default: getLinearGradientProperty({ angle: 180, baseColor1: '#F86BDF', baseColor2: '#6B6BF8' }),
  design: getLinearGradientProperty({ angle: 180, baseColor1: '#F86BDF', baseColor2: '#6B6BF8' }),
  development: getLinearGradientProperty({ angle: 180, baseColor1: '#FC8E51', baseColor2: '#F05C58' }),
  growth: getLinearGradientProperty({ angle: 180, baseColor1: '#FC8E51', baseColor2: '#F05C58' }) };

export {
  GuildItemBoxContainer,
};
