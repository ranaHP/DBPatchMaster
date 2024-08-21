import { createSlice } from "@reduxjs/toolkit";

// Define the initial state with a TypeScript interface
export interface GlobalState {
  mode: "light" | "dark";
  userId: string;
  brokerage: string;
  version: string;
}

const initialState: GlobalState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
  brokerage: "SFC",
  version: ''
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setBrokerage: (state, action) => {
      const newBrokerage = action.payload; // Extract new brokerage value from payload
      state.brokerage = newBrokerage; // Update state with new value
    },
    setVersion: (state, action) => {
      const newVersion = action.payload; // Extract new brokerage value from payload
      state.version = newVersion; // Update state with new value
    },
  },
});

// Export both actions so they can be used in components
export const { setMode, setBrokerage,setVersion } = globalSlice.actions;

export default globalSlice.reducer;
// {
//   "global": {
//       "mode": "dark",
//       "userId": "63701cc1f03239b7f700000e",
//       "brokerage": "HSBC"
//   }
// }