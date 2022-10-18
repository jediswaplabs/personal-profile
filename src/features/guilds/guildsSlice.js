import { createSlice } from '@reduxjs/toolkit';

export const initialState = { activeGuildId: null };

export const reducers = { setActiveGuild(state, action) {
  const guildId = action.payload;
  state.activeGuildId = guildId;
} };

export const guidsSlice = createSlice({ name: 'guilds',
  initialState,
  reducers });

export const selectActiveGuildId = (state) => state.guilds.activeGuildId;

export const { setActiveGuild } = guidsSlice.actions;

export default guidsSlice.reducer;
