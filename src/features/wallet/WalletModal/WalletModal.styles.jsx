import styled from 'styled-components';
import Box from '@mui/material/Box';

const ModalContainer = styled.div`

`;

const ModalInner = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #fff;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  background-color: #141451;
  padding: 1rem;
`;

const WalletConnectorContainer = styled.div`

`;

export {
  ModalContainer,
  ModalInner,
  WalletConnectorContainer,
};
