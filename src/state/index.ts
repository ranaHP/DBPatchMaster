import { changedListI } from './../type';
import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  mode: "light" | "dark";
  userId: string;
  brokerage: string;
  version: string;
  changedFilesList: changedListI[]
}

const initialState: GlobalState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
  brokerage: "SFC",
  version: '',
  changedFilesList: []
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setBrokerage: (state, action) => {
      const newBrokerage = action.payload;
      state.brokerage = newBrokerage;
    },
    setVersion: (state, action) => {
      const newVersion = action.payload;
      state.version = newVersion;
    },
    setChangedFilesList: (state, action) => {
      const changedFilesList = action.payload;
      state.changedFilesList = changedFilesList;
    },
  },
});

export const { setMode, setBrokerage, setVersion, setChangedFilesList } = globalSlice.actions;

export default globalSlice.reducer;
