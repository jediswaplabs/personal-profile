import styled, { css } from 'styled-components';

const MainLayoutHeaderContainer = styled.div`
  .header {
    height: 75px;
    color: #fff;
    border-bottom: 1.25px solid rgba(149,149,149,0.25);
  }
`;

const MainLayoutBodyContainer = styled.div`
  max-width: 1600px;
  width: 100%;
  padding: 0 32px;
  margin: 0 auto;
  color: #fff;
`;

const MainLayoutFooterContainer = styled.div`
  color: #fff;
`;

const MainLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex-wrap: nowrap;

  ${MainLayoutHeaderContainer} {
    margin-bottom: 40px;
  }

  ${MainLayoutBodyContainer} {
    margin-bottom: 40px;
    flex-grow: 1;
  }
`;

export {
  MainLayoutContainer,
  MainLayoutHeaderContainer,
  MainLayoutBodyContainer,
  MainLayoutFooterContainer,
};
