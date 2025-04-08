import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SSEState {
  isSSEOpen: boolean;
  myPosition: number;
  estimatedTime: number;
}

const initialSSEState: SSEState = {
  isSSEOpen: false,
  myPosition: 0,
  estimatedTime: 0,
};

const SSESlice = createSlice({
  name: "SSE",
  initialState: initialSSEState,
  reducers: {
    toggleIsSSEOpen: (state) => {
      state.isSSEOpen = !state.isSSEOpen;
    },
    resetIsSSEOpen: (state) => {
      state.isSSEOpen = false;
    },
    setMyPosition: (state, action: PayloadAction<number>) => {
      state.myPosition = action.payload;
    },
    setEstimatedTime: (state, action: PayloadAction<number>) => {
      state.estimatedTime = action.payload;
    },
  },
});

export const {
  toggleIsSSEOpen,
  resetIsSSEOpen,
  setMyPosition,
  setEstimatedTime,
} = SSESlice.actions;
export default SSESlice.reducer;
