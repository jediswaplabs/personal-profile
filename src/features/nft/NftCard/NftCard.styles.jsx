import styled, { css } from 'styled-components';

const CardWrapper = styled.div`
  .MuiCard-root {
    border-radius: 10px;
    user-select: none;
    width: 300px;
  }

  .MuiCardContent-root {
    padding: 10px 10px 10px;
    position: relative;

    ${(props) => css`
      background: ${props.theme.palette.grey[100]};
    `}

    .MuiTypography-root {
      color: #000;
      font-weight: 700;
    }
  }
`;

const CardIsLockedOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
;
`;

export {
  CardWrapper,
  CardIsLockedOverlay,
};
