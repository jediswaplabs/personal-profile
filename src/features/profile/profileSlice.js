import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  avatar: '',
  address: '0x00000000000000',
  readOnly: false,
};

export const reducers = {
  setReadOnlyMode(state, action) {
    state.readOnly = !!(action.payload);
  },
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers,
});

export const selectProfileAddress = (state) => state.profile.address;

export default profileSlice.reducer;
