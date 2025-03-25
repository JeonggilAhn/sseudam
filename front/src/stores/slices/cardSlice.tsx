import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../app/card/page";

interface CardState {
  isRegistModalOpen: boolean;
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: string;
}

const initialCardState: CardState = {
  isRegistModalOpen: false,
  number: "",
  expiry: "",
  cvc: "",
  name: "",
  focus: "",
};

const cardSlice = createSlice({
  name: "card",
  initialState: initialCardState,
  reducers: {
    toggleIsRegistModalOpen: (state) => {
      state.isRegistModalOpen = !state.isRegistModalOpen;
    },
    setNumber: (state, action: PayloadAction<string>) => {
      state.number = action.payload;
    },
    setExpiry: (state, action: PayloadAction<string>) => {
      state.expiry = action.payload;
    },
    setCvc: (state, action: PayloadAction<string>) => {
      state.cvc = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setFocus: (state, action: PayloadAction<string>) => {
      state.focus = action.payload;
    },
  },
});

export const {
  toggleIsRegistModalOpen,
  setNumber,
  setExpiry,
  setCvc,
  setName,
  setFocus,
} = cardSlice.actions;
export default cardSlice.reducer;
