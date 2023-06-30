import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Skeleton from '@mui/material/Skeleton';

import { BoxContainer, Cover, AccountInfoContainer, WalletContainer, AccountAvatar, AccountAddress, AccountControls, SwitchAccount } from './ProfileCard.styles';
import UserAvatar from '../UserAvatar/UserAvatar';
import WalletBalance from '../../wallet/WalletBalance/WalletBalance';
import GradientButton from '../../../components/GradientButton/GradientButton';
import { useLazyGetUserByIdQuery } from '../../api/apiSlice';
import { EventEmitter } from '../../../common/eventEmitter';
import { eventsLookup } from '../../../common/contansts';

const preventDefault = (event) => event.preventDefault();

const ProfileCard = ({ account, readOnly = true }) => {
  const { t } = useTranslation();

  const [getUserById, {
    data: user,
    isFetching,
    isSuccess, // eslint-disable-line no-unused-vars
    isError,
    isUninitialized,
  }] = useLazyGetUserByIdQuery();

  useEffect(() => {
    if (!account) { return; }
    getUserById(account);
  }, [account]);

  const handleSwitchAccount = useCallback(() => {
    EventEmitter.dispatch(eventsLookup.openWalletModal);
  }, []);

  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const userAvatarUrl = user?.avatar ?? '';
  const userAddress = account ?? '';
  const getShortWalletAddress = (address = '') => `${address.slice(0, 6)}...${address.slice(-6)}`;

  useEffect(() => {
    if (!isAddressCopied) {
      return;
    }
    setTimeout(() => {
      setIsAddressCopied(false);
    }, 1000);
  }, [isAddressCopied]);

  let content;
  if (isError) {
    content = <ErrorProfile />;
  } else {
    content = (
      <>
        <AccountAvatar>
          <UserAvatar src={userAvatarUrl} isMock={isFetching || isUninitialized} />
        </AccountAvatar>
        <AccountAddress>
          <Typography variant="h5" component="div" color="text.primary">{isFetching || isUninitialized ? <Skeleton width="100%" /> : getShortWalletAddress(userAddress)}</Typography>
        </AccountAddress>
        {!readOnly && (
          <AccountControls>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            > {isFetching || isUninitialized
                ? <Skeleton variant="rounded" width="100%" height="2rem" />
                : (
                  <>
                    <div className="account-controls-item">
                      <GradientButton variant="outlined" size="small">
                        {t('profileCard.controls.editProfile')}
                      </GradientButton>
                    </div>
                    <div className="account-controls-item">
                      {isAddressCopied ? (
                        <Typography variant="body2" component="span" color="text.primary">Copied!</Typography>
                      ) : (
                        <CopyToClipboard text={userAddress} onCopy={() => setIsAddressCopied(true)}>
                          <Link component="button"
                            underline="none"
                            variant="body2"
                            onClick={preventDefault}
                          >{t('profileCard.controls.copyAddress')}
                          </Link>
                        </CopyToClipboard>
                      )}
                    </div>
                  </>
                )}
            </Stack>
          </AccountControls>
        )}
        {!readOnly && (
          <SwitchAccount>
            {isFetching || isUninitialized
              ? <Skeleton variant="rounded" width="100%" height="3rem" />
              : (
                <Button variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleSwitchAccount}
                  fullWidth
                  startIcon={<SyncAltIcon />}
                >{t('profileCard.controls.switchAccount')}
                </Button>
              )}
          </SwitchAccount>
        )}
      </>
    );
  }

  return (
    <BoxContainer>
      <Cover />
      <AccountInfoContainer>
        {content}
      </AccountInfoContainer>
      <WalletContainer>
        <WalletBalance account={account} />
      </WalletContainer>
    </BoxContainer>
  );
};

const ErrorProfile = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" color="text.primary" sx={{ margin: '16px 0' }}>
      {t('profileCard.errors.fetching')}
    </Typography>
  );
};

ProfileCard.propTypes = {
  account: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default ProfileCard;
