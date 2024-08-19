import { createSlice } from "@reduxjs/toolkit";

// Define the initial state with a TypeScript interface
export interface GlobalState {
  mode: "light" | "dark";
  userId: string;
}

const initialState: GlobalState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
