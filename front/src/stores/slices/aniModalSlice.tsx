import { createSlice } from "@reduxjs/toolkit";

interface CardState {
  isModalOpen: boolean;
}

const initialCardState: CardState = {
  isModalOpen: false,
};

const cardSlice = createSlice({
  name: "aniModal",
  initialState: initialCardState,
  reducers: {
    toggleIsModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    resetIsModalOpen: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleIsModalOpen, resetIsModalOpen } = cardSlice.actions;
export default cardSlice.reducer;
