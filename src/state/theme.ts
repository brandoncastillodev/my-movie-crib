import { createAction, createReducer } from "@reduxjs/toolkit";

export const toggleTheme = createAction("TOGGLE_THEME");
export const setTheme = createAction<boolean>("SET_THEME");

const initialState: ThemeState = {
  darkMode: false,
};

const themeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleTheme, (state) => {
      state.darkMode = !state.darkMode;
    })
    .addCase(setTheme, (state, action) => {
      state.darkMode = action.payload;
    });
});

export default themeReducer;