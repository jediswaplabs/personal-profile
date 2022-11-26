import styled, { css } from 'styled-components';

const HeaderContainer = styled.div`
  padding: 1rem 32px;
`;

const HeaderInnerContainer = styled.div`

`;

const HeaderWallet = styled.div`
  display: flex;
`;

const HeaderLogo = styled.a`
  display: inline-block;
  font-size: 0;
`;

const AccountElement = styled.div`
  display: flex;
  flex: 0;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`;

const Web3StatusConnected = styled.div`
  //display: flex;
  //flex: 0;
  //flex-direction: row;
  //align-items: center;
  //border-radius: 12px;
  //white-space: nowrap;
  //width: 100%;
  //cursor: pointer;

  //svg {
  //  margin-bottom: 4px;
  //}
`;

const Web3StatusError = styled.div`
  background-color: red;
`;

const Web3StatusConnect = styled.div`

`;

export {
  HeaderContainer,
  HeaderInnerContainer,
  HeaderLogo,
  HeaderWallet,
  AccountElement,
  Web3StatusConnected,
  Web3StatusError,
  Web3StatusConnect,
};
