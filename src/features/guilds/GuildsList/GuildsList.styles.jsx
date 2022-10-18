import styled, { css } from 'styled-components';

import { gradientBorderMixin, widgetBoxMixin } from '../../../resources/styles/mixins';
import { getLinearGradientProperty } from '../../../resources/styles/functions';
// background: linear-gradient(180deg, #F86BDF 0%, #6B6BF8 100%);

const guildStyling = { default: getLinearGradientProperty({ angle: 180, baseColor1: '#FC8E51', baseColor1Start: '0%', baseColor2: '#F05C58', baseColor2Start: '100%' }),
  design: getLinearGradientProperty({ angle: 180, baseColor1: '#F86BDF', baseColor2: '#6B6BF8' }),
  development: getLinearGradientProperty({ angle: 180, baseColor1: '#FC8E51', baseColor2: '#F05C58' }),
  growth: getLinearGradientProperty({ angle: 180, baseColor1: '#FC8E51', baseColor2: '#F05C58' }) };

// background: linear-gradient(180deg, #FC8E51 0%, #F05C58 100%);

const GuildItemBoxContainer = styled.div`
  ${widgetBoxMixin};

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

export {
  GuildItemBoxContainer,
};
