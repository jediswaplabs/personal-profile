import styled from 'styled-components';

import { glassEffectMixin, gradientBorderMixin } from '../../../resources/styles/mixins';

const BoxContainer = styled.div`
  ${glassEffectMixin({})}
  ${gradientBorderMixin({})}

  display: flex;
  padding: 8px;
  width: 100px;
  height: 100px;
  border-radius: 8px;

  .avatar {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    user-select: none;
    //dragable:
  }
`;

export {
  BoxContainer,
};
