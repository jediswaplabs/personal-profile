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
    height: 3.1em;
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
      transform: translate(-8px, -8px);
    }
  `};
`;

export const guildStyling = {
  default: 'linear-gradient(180deg, #F86BDF 0%, #6B6BF8 100%)',
  design: 'linear-gradient(180deg, #F86BDF 0%, #6B6BF8 100%)',
  development: 'linear-gradient(180deg, #3A937E 0%, #00E3AE 100%)',
  growth: 'linear-gradient(180deg, #FC8E51 0%, #F05C58 100%)',
  problemSolving: 'linear-gradient(180deg, #3086FF 0%, #6EC7CD 100%)',
  communityManagement: 'linear-gradient(180deg, #A157FF 0%, #7088E6 100%)',
  contentWriting: 'linear-gradient(180deg, #EB2FD8 0%, #DC5D5D 100%)',
};

export {
  GuildItemBoxContainer,
};
