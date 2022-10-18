import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Skeleton from '@mui/material/Skeleton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';

import { BoxContainer,
  Cover,
  AccountInfoContainer,
  WalletContainer,
  AccountAvatar,
  AccountAddress,
  AccountControls,
  SwitchAccount } from './ProfileCard.styles';
import GradientButton from '../../../components/GradientButton/GradientButton';
import UserAvatar from '../UserAvatar/UserAvatar';
import Wallet from '../../wallet/Wallet/Wallet';
import { useLazyGetUserByIdQuery } from '../../api/apiSlice';

const preventDefault = (event) => event.preventDefault();

const ProfileCard = () => {
  const { t } = useTranslation();
  const profileId = useSelector((state) => state.profile.address);
  const isReadOnlyModeEnabled = useSelector((state) => state.profile.readOnly);

  const [getUserById, { data: user,
    isLoading,
    isSuccess,
    isError,
    isUninitialized }] = useLazyGetUserByIdQuery();

  useEffect(() => {
    if (!profileId) { return; }
    getUserById(profileId);
  }, [profileId]);

  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const userAvatarUrl = user?.avatar ?? '';
  const userAddress = profileId ?? '';
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
          <UserAvatar src={userAvatarUrl} isMock={isLoading || isUninitialized} />
        </AccountAvatar>
        <AccountAddress>
          <Typography variant="h5" component="div" color="text.primary">{isLoading || isUninitialized ? <Skeleton width="100%" /> : getShortWalletAddress(userAddress)}</Typography>
        </AccountAddress>
        {!isReadOnlyModeEnabled && (
          <AccountControls>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            > {isLoading || isUninitialized
                ? <Skeleton variant="rounded" width="100%" height="2rem" />
                : (
                  <>
                    <div className="account-controls-item">
                      <GradientButton variant="outlined"
                        size="small"
                      >{t('profileCard.controls.editProfile')}
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
        {!isReadOnlyModeEnabled && (
          <SwitchAccount>
            {isLoading || isUninitialized
              ? <Skeleton variant="rounded" width="100%" height="3rem" />
              : (
                <Button variant="contained"
                  color="secondary"
                  size="large"
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
        <Wallet />
      </WalletContainer>
    </BoxContainer>
  );
};

const ErrorProfile = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1"
      color="text.primary"
      sx={{ margin: '16px 0' }}
    >{t('profileCard.errors.fetching')}
    </Typography>
  );
};

ProfileCard.propTypes = {};

export default ProfileCard;
