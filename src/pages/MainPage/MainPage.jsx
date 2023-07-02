import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Tab } from '@mui/material';

import { MainpageContainer, MainpageContainerHeader, JediSwapTabs } from './MainPage.styles';
import { eventsLookup, guildNamesLookup, guildTypesLookup } from '../../common/contansts';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import LeaderboardTable from '../../features/guilds/Leaderboard/Leaderboard';
import { useActiveStarknetReact } from '../../hooks';
import { EventEmitter } from '../../common/eventEmitter';

/*
TODO сделать модалку смены аватара
TODO перенести табы в отдельный компонент
TODO проверить размер бандлов
 */

const MainPage = () => {
  const { t } = useTranslation();
  const { connectedAddress } = useActiveStarknetReact();
  const guildIds = Object.keys(guildNamesLookup);
  const [activeGuildId, setActiveGuildId] = useState(guildTypesLookup.all);
  const handleActiveGuildIdChange = useCallback((event, value) => {
    setActiveGuildId(value);
  }, [setActiveGuildId]);

  const handleConnectWallet = useCallback(() => {
    EventEmitter.dispatch(eventsLookup.openWalletModal);
  }, []);

  const bodyContent = (
    <MainpageContainer>
      <Stack spacing={3.5}>
        <MainpageContainerHeader>
          <Typography variant="h5" color="text.primary">Contributors Global Leaderboard</Typography>
          {!connectedAddress && <Link href="#" underline="none" variant="body1" onClick={handleConnectWallet}>Connect Wallet to see Personalised Profile</Link>}
          {connectedAddress && (
            <RouterLink to={`/account/${connectedAddress}`}>
              <Typography variant="body1" color="primary">See your Personalised Profile</Typography>
            </RouterLink>
          )}
        </MainpageContainerHeader>

        <JediSwapTabs
          value={activeGuildId}
          onChange={handleActiveGuildIdChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {guildIds.map((id) => (<Tab value={id} label={guildNamesLookup[id]} key={id} />))}
        </JediSwapTabs>
        <LeaderboardTable guildId={activeGuildId} guildName="" title={`${guildNamesLookup[activeGuildId]} Leaderboard`} />
      </Stack>
    </MainpageContainer>

  );

  return (
    <MainLayout bodyContent={bodyContent} disableSidebar />
  );
};

export default MainPage;
