import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  value: boolean;
}

const initialState: ThemeState = {
  value: localStorage.getItem("theme") == "dark" ? true : false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      console.log(state.value);
      localStorage.setItem("theme", state.value ? "light" : "dark");
      state.value = !state.value;
    },
  },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
