import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

import Guild from '../Guild/Guild';
import { useLazyGetGuildsScoreByUserIdQuery } from '../../api/apiSlice';
import { selectProfileAddress } from '../../profile/profileSlice';
import { selectActiveGuildId, selectAllGuilds, setActiveGuild } from '../guildsSlice';

const GuildsList = ({ }) => {
  const dispatch = useDispatch();
  const profileId = useSelector(selectProfileAddress);
  const activeGuildId = useSelector(selectActiveGuildId);
  const [getGuildsScoreByUserId, { data: guilds = {},
    isLoading,
    isSuccess,
    isError,
    isUninitialized }] = useLazyGetGuildsScoreByUserIdQuery();

  useEffect(() => {
    if (!profileId) { return; }
    getGuildsScoreByUserId(profileId);
  }, [profileId]);

  const handleOnGuildSelected = useCallback((id) => {
    if (activeGuildId === id) { return; }
    dispatch(setActiveGuild(id));
  }, [activeGuildId]);

  const isEmpty = !guilds?.ids?.length;

  let content;
  if (isLoading || isUninitialized) {
    content = <MockGuildsList />;
  } else if (isError) {
    content = <ErrorGuildsList />;
  } else if (isEmpty) {
    content = <EmptyGuildsList />;
  } else if (isSuccess) {
    content = (
      <>
        {guilds.ids.map((id) => (
          <Grid item key={id}>
            <Guild id={id} name={guilds.entities[id].name} score={guilds.entities[id].score} isSelected={id === activeGuildId} onGuildSelected={() => handleOnGuildSelected(id)} />
          </Grid>
        ))}
      </>
    );
  }
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="left" spacing={2}>
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

const MockGuildsList = () => {
  const data = Array(5).fill();
  return (
    <>
      {data.map((_, key) => (
        <Grid item key={key}>
          <Guild isMock />
        </Grid>
      ))}
    </>
  );
};

const EmptyGuildsList = () => {
  const { t } = useTranslation();
  return (
    <Grid item>
      <Typography variant="body1" color="text.primary">{t('guildsList.errors.empty')}</Typography>
    </Grid>
  );
};

const ErrorGuildsList = () => {
  const { t } = useTranslation();
  return (
    <Grid item>
      <Typography variant="body1" color="text.primary">{t('guildsList.errors.fetching')}</Typography>
    </Grid>
  );
};

GuildsList.propTypes = {};

export default GuildsList;
