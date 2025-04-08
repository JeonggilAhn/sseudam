import { createSlice } from "@reduxjs/toolkit";

interface CardState {
  isModalOpen: boolean;
  isSavingDetailOpen: boolean;
}

const initialCardState: CardState = {
  isModalOpen: false,
  isSavingDetailOpen: false,
};

const cardSlice = createSlice({
  name: "aniModal",
  initialState: initialCardState,
  reducers: {
    toggleIsModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    toggleIsSavingDetailOpen: (state) => {
      state.isSavingDetailOpen = !state.isSavingDetailOpen;
    },
    resetIsModalOpen: (state) => {
      state.isModalOpen = false;
    },
    resetIsSavingDetailOpen: (state) => {
      state.isSavingDetailOpen = false;
    },
  },
});

export const {
  toggleIsModalOpen,
  resetIsModalOpen,
  toggleIsSavingDetailOpen,
  resetIsSavingDetailOpen,
} = cardSlice.actions;
export default cardSlice.reducer;
