import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
