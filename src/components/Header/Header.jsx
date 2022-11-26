import React, { useCallback, useState } from 'react';
import { UnsupportedChainIdError, useStarknetReact } from '@web3-starknet-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SvgIcon } from '@mui/material';

import { HeaderContainer,
  HeaderLogo,
  HeaderWallet,
  AccountElement,
  Web3StatusConnected,
  Web3StatusError,
  Web3StatusConnect } from './Header.styles';
import { useActiveStarknetReact } from '../../hooks';
import { NETWORK_LABELS } from '../../common/contansts';
import { argentX, braavosWallet } from '../../common/connectors';
import logo from '../../resources/images/logo.png';
import { getShortenAddress } from '../../common/addressHelper';
import argentXIcon from '../../resources/icons/argentx.svg';
import braavosIcon from '../../resources/icons/braavos.svg';
import GradientButton from '../GradientButton/GradientButton';
import WalletModal from '../../features/wallet/WalletModal/WalletModal';

const noop = () => {};

const Header = () => {
  const { chainId } = useStarknetReact();

  return (
    <HeaderContainer>

      <Grid container columnSpacing={2} alignItems="center">
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <HeaderLogo>
            <img width="195px" height="32px" src={logo} />
          </HeaderLogo>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <HeaderWallet>
            <Stack direction="row" alignItems="center" gap={2}>
              {chainId && NETWORK_LABELS[chainId] && (
                <Typography variant="body1" color="text.primary">Starknet-{NETWORK_LABELS[chainId]}</Typography>
              )}
              <AccountElement>
                <Web3Status />
              </AccountElement>
            </Stack>
          </HeaderWallet>
        </Grid>
      </Grid>

    </HeaderContainer>
  );
};

const StatusIcon = ({ connector }) => {
  if (connector === argentX) { return (<SvgIcon component={argentXIcon} />); }
  if (connector === braavosWallet) { return (<SvgIcon component={braavosIcon} />); }
  return null;
};

const Web3Status = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleWalletModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleCloseWalletModal = useCallback(() => {
    setShowModal(false);
  }, [showModal]);

  return (
    <>
      <Web3StatusInner onWalletModalToggle={handleToggleWalletModal} />
      <WalletModal open={showModal} onClose={handleCloseWalletModal} />
    </>
  );
};

const Web3StatusInner = ({ onWalletModalToggle = noop }) => {
  const { connectedAddress, connector, error } = useActiveStarknetReact();
  if (connectedAddress) {
    return (
      <Web3StatusConnected onClick={onWalletModalToggle}>
        <Stack direction="row" alignItems="center" gap={1}>
          {connector && <StatusIcon connector={connector} />}
          <Typography variant="body1" color="text.primary">{getShortenAddress(connectedAddress)}</Typography>
        </Stack>
      </Web3StatusConnected>
    );
  } if (error) {
    return (
      <Web3StatusError onClick={onWalletModalToggle}>
        <Typography variant="body1" color="text.primary">{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</Typography>
      </Web3StatusError>
    );
  }
  return (
    <Web3StatusConnect onClick={onWalletModalToggle}>
      <GradientButton>Connect wallet</GradientButton>
    </Web3StatusConnect>
  );
};

export default Header;
