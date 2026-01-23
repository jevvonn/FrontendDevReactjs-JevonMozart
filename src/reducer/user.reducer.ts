import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = null as User | null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
