/* eslint-disable */
import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import { LeaderboardTable } from '../../features/guilds/Leaderboard/Leaderboard';
import { MainpageContainer } from './MainPage.styles';

const MainPage = () => {
  const { t } = useTranslation();
  const bodyContent = (
    <>
      <LeaderboardTable guildId={'development'} guildName={'Development'} title={'Global leaderboard'}/>
    </>
  );

  return (
    <MainLayout bodyContent={bodyContent} disableSidebar/>
  );
};

export default MainPage;
