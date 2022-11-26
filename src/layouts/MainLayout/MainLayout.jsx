/* eslint-disable */

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { ChainId } from '@jediswap/sdk';
import { useStarknetReact } from '@web3-starknet-react/core';

import {useActiveStarknetReact, useEagerConnect, useInactiveListener} from '../../hooks';
import Page from '../../components/Page/Page';
import { MainLayoutContainer, MainLayoutHeaderContainer, MainLayoutBodyContainer, MainLayoutFooterContainer } from './MainLayout.styles';
import {NetworkContextName, SUPPORTED_WALLETS} from '../../common/contansts';
import {argentX, braavosWallet} from "../../common/connectors";
import Header from "../../components/Header/Header";

const MainLayout = ({ sidebarContent = null, bodyContent = null, disableSidebar = false }) => (
  <Page>
    <MainLayoutContainer>
      <MainLayoutHeaderContainer>
        <Header />
      </MainLayoutHeaderContainer>

      <MainLayoutBodyContainer>
        <Web3ReactManager>
          <Grid container rowSpacing={0}>
          {!disableSidebar && (
            <Grid item sx={{ width: 340, paddingRight: '32px' }}>
              {sidebarContent}
            </Grid>
          )}
          <Grid item xs>
            {bodyContent}
          </Grid>
        </Grid>
        </Web3ReactManager>
      </MainLayoutBodyContainer>

      <MainLayoutFooterContainer />
    </MainLayoutContainer>
  </Page>
);




const Web3ReactManager = ({ children }) => {
  const { active } = useStarknetReact()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useStarknetReact(NetworkContextName)

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false)

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) {
    return (
      <div>Unknown error</div>
    )
  }

  return children
}

export default MainLayout;
