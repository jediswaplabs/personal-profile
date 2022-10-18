import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

import { WalletContainer } from './Wallet.styles';
import { useLazyGetWalletByUserIdQuery } from '../../api/apiSlice';

const Wallet = () => {
  const { t } = useTranslation();
  const profileId = useSelector((state) => state.profile.address);
  const [getWalletByUserId, { data: currencies,
    isLoading,
    isSuccess,
    isError,
    isUninitialized }] = useLazyGetWalletByUserIdQuery();

  useEffect(() => {
    if (!profileId) { return; }
    getWalletByUserId(profileId);
  }, [profileId]);

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const handleWalletButtonClick = useCallback(() => {
    setIsWalletOpen(!isWalletOpen);
  }, [isWalletOpen]);

  const isEmpty = !currencies?.length;

  let content;
  if (isLoading || isUninitialized) {
    content = <MockWallet />;
  } else if (isError) {
    content = <ErrorWallet />;
  } else if (isEmpty) {
    content = <EmptyWallet />;
  } else if (isSuccess) {
    content = (
      <>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          startIcon={<AccountBalanceWalletOutlinedIcon />}
          endIcon={(isWalletOpen) ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
          onClick={handleWalletButtonClick}
        >
          {t('wallet.title')}
        </Button>
        <Collapse in={isWalletOpen} timeout="auto" unmountOnExit>
          <Stack spacing={2.5}>
            {currencies.map((item) => (
              <Stack direction="row" justifyContent="space-between" key={item.name}>
                <Typography variant="h6" component="div">{item.name}</Typography>
                <Typography variant="h6" component="div">{item.amount}</Typography>
              </Stack>
            ))}
          </Stack>
        </Collapse>
      </>
    );
  }

  return (
    <WalletContainer>
      <Stack spacing={2.5}>
        {content}
      </Stack>
    </WalletContainer>
  );
};
Wallet.propTypes = {};

const MockWallet = () => (<Skeleton variant="rounded" width="100%" height="3rem" />);

const ErrorWallet = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" color="text.primary">{t('wallet.errors.fetching')}</Typography>
  );
};

const EmptyWallet = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" color="text.primary">{t('wallet.errors.empty')}</Typography>
  );
};

export default Wallet;
