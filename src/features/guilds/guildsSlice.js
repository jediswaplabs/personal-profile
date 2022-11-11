import { createSelector, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { apiSlice } from '../api/apiSlice';
import { selectProfileAddress } from '../profile/profileSlice';

export const initialState = { activeGuildId: null };

export const reducers = {
  setActiveGuild(state, action) {
    const guildId = action.payload;
    state.activeGuildId = guildId;
  },
};

export const guidsSlice = createSlice({
  name: 'guilds',
  initialState,
  reducers,
});

// const currentProfileAddres = useSelector(selectProfileAddress)

const selectGuildsResult = createSelector([(state) => state, selectProfileAddress], (state, profileId) => apiSlice.endpoints.getGuildsScoreByUserId.select(profileId)(state));

export const selectActiveGuildId = (state) => state.guilds.activeGuildId ?? initialState.activeGuildId;
export const selectGuildById = (guildId) => createSelector([selectGuildsResult], (guilds) => guilds?.data?.entities[guildId] ?? null);
export const selectActiveGuildData = createSelector([selectGuildsResult, selectActiveGuildId], (guilds, activeGuildId) => guilds?.data?.entities[activeGuildId] ?? null);

// (state) => state.guilds.activeGuildId;

export const { setActiveGuild } = guidsSlice.actions;

export default guidsSlice.reducer;
