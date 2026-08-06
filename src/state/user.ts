import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction<UserState>("SET_USER");

const initialState: UserState = {
  id: null,
  email: null,
  name: null,
  lastname: null,
};

const userReducer = createReducer(initialState, {
  [setUser.type]: (state, action) => action.payload,
});

export default userReducer;