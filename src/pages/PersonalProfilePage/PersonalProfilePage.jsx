import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import ProfileCard from '../../features/profile/ProfileCard/ProfileCard';
import ActivitiesList from '../../features/activities/ActivitiesList/ActivitiesList';
import GuildsList from '../../features/guilds/GuildsList/GuildsList';
import Leaderboard from '../../features/guilds/Leaderboard/Leaderboard';
import NftCarousel from '../../features/nft/NftCarousel/NftCarousel';
import { ProfileContainer, ProfileContainerHeader, ProfileContainerContent } from './PersonalProfilePage.styles';

const PersonalProfilePage = () => {
  const { t } = useTranslation();

  const sidebarContent = (
    <span>123</span>
    // <Stack direction="column" gap={4}>
    //   <ProfileCard />
    //   <ActivitiesList />
    // </Stack>
  );
  const bodyContent = (
    <span>123</span>
    // <ProfileContainer>
    //   <ProfileContainerHeader>
    //     <Typography variant="h5" color="text.primary">{t('contributorPage.titles.title')}</Typography>
    //   </ProfileContainerHeader>
    //   <ProfileContainerContent>
    //     <Stack direction="column" gap={4}>
    //       <GuildsList />
    //       <Leaderboard />
    //       <NftCarousel />
    //     </Stack>
    //   </ProfileContainerContent>
    // </ProfileContainer>
  );
  return (
    <MainLayout sidebarContent={sidebarContent} bodyContent={bodyContent} />
  );
};

export default PersonalProfilePage;
