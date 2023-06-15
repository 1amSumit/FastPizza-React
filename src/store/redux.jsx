import userSlice from './userSlice';
import cartSlice from './cartSlice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { user: userSlice.reducer, cart: cartSlice.reducer },
});

export default store;
