import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  id: number;
  username: string;
  email: string;
}

export interface IUsers {
  user: IUserState[];
}

const initialState: IUsers = {
  user: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUserState>) => {
      state.user.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.user = state.user.filter((user) => user.id !== action.payload);
    },

    editUser: (state, action: PayloadAction<IUserState>) => {
      const findedUserIndex = state.user.findIndex(
        (user) => user.id === action.payload.id
      );
      if (findedUserIndex !== -1) {
        state.user[findedUserIndex] = action.payload;
      }
    },
  },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;

export default userSlice.reducer;
